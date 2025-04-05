import pytest
from src.core.text_detector import TextToxicityDetector
from src.core.image_detector import ImageToxicityDetector

@pytest.fixture
def text_detector():
    return TextToxicityDetector()

@pytest.fixture
def image_detector():
    return ImageToxicityDetector()

def test_text_detection(text_detector):
    # Test with non-toxic text
    result = text_detector.predict("Hello, how are you?")
    assert result.is_toxic == False
    assert len(result.categories) == 0

    # Test with toxic text
    result = text_detector.predict("I hate you!")
    assert result.is_toxic == True
    assert "hate_speech" in result.categories
    assert result.confidence > 0.5

def test_image_detection(image_detector):
    # Test with a safe image URL
    safe_image_url = "https://example.com/safe-image.jpg"
    result = image_detector.predict(safe_image_url)
    assert result.is_toxic == False
    assert len(result.categories) == 0

    # Test with an NSFW image URL
    nsfw_image_url = "https://example.com/nsfw-image.jpg"
    result = image_detector.predict(nsfw_image_url)
    assert result.is_toxic == True
    assert "nsfw" in result.categories
    assert result.confidence > 0.5

def test_threshold_update(text_detector, image_detector):
    # Test text detector threshold update
    text_detector.update_threshold(0.7)
    assert text_detector.threshold == 0.7

    # Test image detector threshold update
    image_detector.update_threshold(0.7)
    assert image_detector.threshold == 0.7

    # Test invalid threshold values
    with pytest.raises(ValueError):
        text_detector.update_threshold(1.5)
    with pytest.raises(ValueError):
        image_detector.update_threshold(-0.1)

def test_model_info(text_detector, image_detector):
    # Test text detector model info
    text_info = text_detector.get_model_info()
    assert "model_name" in text_info
    assert "device" in text_info
    assert "threshold" in text_info
    assert "categories" in text_info

    # Test image detector model info
    image_info = image_detector.get_model_info()
    assert "model_name" in image_info
    assert "device" in image_info
    assert "threshold" in image_info
    assert "categories" in image_info 