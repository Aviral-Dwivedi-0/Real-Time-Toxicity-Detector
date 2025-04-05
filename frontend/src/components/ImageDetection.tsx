import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import axios from "axios";

interface DetectionResult {
  is_toxic: boolean;
  categories: string[];
  confidence: number;
  severity: number;
  explanation: string;
}

const ImageDetection: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/detect/image", {
        image_url: imageUrl,
        content_type: "image/jpeg",
      });
      setResult(response.data);
    } catch (err) {
      setError("Error detecting toxicity. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Image Toxicity Detection
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                variant="outlined"
                placeholder="https://example.com/image.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !imageUrl.trim()}
              >
                {loading ? <CircularProgress size={24} /> : "Analyze Image"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {imageUrl && (
        <Card sx={{ maxWidth: 400, mb: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt="Image to analyze"
            onError={() =>
              setError("Error loading image. Please check the URL.")
            }
          />
        </Card>
      )}

      {result && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detection Results
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <strong>Is Toxic:</strong> {result.is_toxic ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Categories:</strong>{" "}
                {result.categories.length > 0
                  ? result.categories.join(", ")
                  : "None detected"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Confidence:</strong>{" "}
                {(result.confidence * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Severity:</strong> {(result.severity * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Explanation:</strong> {result.explanation}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default ImageDetection;
