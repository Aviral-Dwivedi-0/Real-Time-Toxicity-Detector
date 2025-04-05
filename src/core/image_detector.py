import torch
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import requests
from io import BytesIO
from typing import List, Dict
import logging
from dataclasses import dataclass
import numpy as np

logger = logging.getLogger(__name__)

@dataclass
class ImageDetectionResult:
    is_toxic: bool
    categories: List[str]
    confidence: float
    severity: float
    explanation: str

class ImageToxicityDetector:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model_name = "google/vit-base-patch16-224"
        self.processor = ViTImageProcessor.from_pretrained(self.model_name)
        self.model = ViTForImageClassification.from_pretrained(self.model_name).to(self.device)
        self.categories = ["nsfw", "violence", "graphic", "prohibited_symbols"]
        self.threshold = 0.5

    def load_image(self, image_url: str) -> Image.Image:
        """Load image from URL."""
        try:
            response = requests.get(image_url)
            response.raise_for_status()
            return Image.open(BytesIO(response.content))
        except Exception as e:
            logger.error(f"Error loading image: {str(e)}")
            raise

    def preprocess_image(self, image: Image.Image) -> torch.Tensor:
        """Preprocess the image for the model."""
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        return inputs

    def predict(self, image_url: str) -> ImageDetectionResult:
        """Predict toxicity in the given image."""
        try:
            # Load and preprocess image
            image = self.load_image(image_url)
            inputs = self.preprocess_image(image)

            # Get model predictions
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
                probabilities = torch.softmax(logits, dim=1).cpu().numpy()[0]

            # Get predictions for each category
            predictions = {}
            for i, category in enumerate(self.categories):
                predictions[category] = float(probabilities[i])

            # Calculate overall toxicity
            max_prob = max(predictions.values())
            is_toxic = max_prob > self.threshold

            # Get detected categories
            detected_categories = [
                cat for cat, prob in predictions.items()
                if prob > self.threshold
            ]

            # Calculate severity (weighted average of detected categories)
            severity = sum(
                prob for cat, prob in predictions.items()
                if cat in detected_categories
            ) / max(1, len(detected_categories))

            # Generate explanation
            explanation = self._generate_explanation(detected_categories, predictions)

            return ImageDetectionResult(
                is_toxic=is_toxic,
                categories=detected_categories,
                confidence=max_prob,
                severity=severity,
                explanation=explanation
            )

        except Exception as e:
            logger.error(f"Error in image prediction: {str(e)}")
            raise

    def _generate_explanation(self, categories: List[str], predictions: Dict[str, float]) -> str:
        """Generate a human-readable explanation of the detection results."""
        if not categories:
            return "No toxic content detected in the image."

        explanations = []
        for category in categories:
            confidence = predictions[category]
            explanations.append(
                f"{category.replace('_', ' ').title()} detected with {confidence:.2%} confidence"
            )

        return " | ".join(explanations)

    def update_threshold(self, new_threshold: float):
        """Update the detection threshold."""
        if 0 <= new_threshold <= 1:
            self.threshold = new_threshold
        else:
            raise ValueError("Threshold must be between 0 and 1")

    def get_model_info(self) -> Dict:
        """Get information about the current model."""
        return {
            "model_name": self.model_name,
            "device": str(self.device),
            "threshold": self.threshold,
            "categories": self.categories
        } 