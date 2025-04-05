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
} from "@mui/material";
import axios from "axios";

interface DetectionResult {
  is_toxic: boolean;
  categories: string[];
  confidence: number;
  severity: number;
  explanation: string;
}

const TextDetection: React.FC = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/detect/text", {
        text,
        language: "en",
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
        Text Toxicity Detection
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Enter text to analyze"
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !text.trim()}
              >
                {loading ? <CircularProgress size={24} /> : "Analyze Text"}
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

export default TextDetection;
