from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from typing import List, Dict, Tuple
import logging
from dataclasses import dataclass
import numpy as np

logger = logging.getLogger(__name__)

@dataclass
class DetectionResult:
    is_toxic: bool
    categories: List[str]
    confidence: float
    severity: float
    explanation: str

class TextToxicityDetector:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model_name = "facebook/roberta-hate-speech-dynabench-r4-target"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name).to(self.device)
        self.categories = ["hate_speech", "profanity", "threat", "harassment", "spam"]
        self.threshold = 0.5

    def preprocess_text(self, text: str) -> torch.Tensor:
        """Preprocess the input text for the model."""
        inputs = self.tokenizer(
            text,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors="pt"
        ).to(self.device)
        return inputs

    def predict(self, text: str) -> DetectionResult:
        """Predict toxicity in the given text."""
        try:
            inputs = self.preprocess_text(text)
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
                probabilities = torch.sigmoid(logits).cpu().numpy()[0]

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

            return DetectionResult(
                is_toxic=is_toxic,
                categories=detected_categories,
                confidence=max_prob,
                severity=severity,
                explanation=explanation
            )

        except Exception as e:
            logger.error(f"Error in text prediction: {str(e)}")
            raise

    def _generate_explanation(self, categories: List[str], predictions: Dict[str, float]) -> str:
        """Generate a human-readable explanation of the detection results."""
        if not categories:
            return "No toxic content detected."

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