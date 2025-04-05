from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Real-Time Toxicity Detector",
    description="API for detecting toxic content in text and images",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextContent(BaseModel):
    text: str
    language: str = "en"

class ImageContent(BaseModel):
    image_url: str
    content_type: str = "image/jpeg"

class DetectionResponse(BaseModel):
    is_toxic: bool
    categories: List[str]
    confidence: float
    severity: float
    explanation: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Welcome to Real-Time Toxicity Detector API"}

@app.post("/detect/text", response_model=DetectionResponse)
async def detect_text(content: TextContent):
    try:
        # TODO: Implement text detection logic
        return DetectionResponse(
            is_toxic=False,
            categories=[],
            confidence=0.0,
            severity=0.0
        )
    except Exception as e:
        logger.error(f"Error in text detection: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/detect/image", response_model=DetectionResponse)
async def detect_image(content: ImageContent):
    try:
        # TODO: Implement image detection logic
        return DetectionResponse(
            is_toxic=False,
            categories=[],
            confidence=0.0,
            severity=0.0
        )
    except Exception as e:
        logger.error(f"Error in image detection: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 