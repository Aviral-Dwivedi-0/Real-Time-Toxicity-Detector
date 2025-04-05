import React from "react";
import { Box, Grid, Paper, Typography, Card, CardContent } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const detectionStats = {
    totalDetections: 1250,
    toxicContent: 320,
    safeContent: 930,
    accuracy: 94.5,
  };

  const dailyStats = [
    { name: "Mon", toxic: 40, safe: 120 },
    { name: "Tue", toxic: 35, safe: 110 },
    { name: "Wed", toxic: 45, safe: 130 },
    { name: "Thu", toxic: 30, safe: 100 },
    { name: "Fri", toxic: 50, safe: 150 },
    { name: "Sat", toxic: 25, safe: 80 },
    { name: "Sun", toxic: 20, safe: 70 },
  ];

  const categoryStats = [
    { name: "Hate Speech", value: 120 },
    { name: "Profanity", value: 85 },
    { name: "NSFW", value: 65 },
    { name: "Violence", value: 50 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Detections
              </Typography>
              <Typography variant="h4">
                {detectionStats.totalDetections}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Toxic Content
              </Typography>
              <Typography variant="h4" color="error">
                {detectionStats.toxicContent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Safe Content
              </Typography>
              <Typography variant="h4" color="success.main">
                {detectionStats.safeContent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Accuracy
              </Typography>
              <Typography variant="h4">{detectionStats.accuracy}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Stats Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Daily Detection Stats
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="toxic" fill="#f44336" name="Toxic" />
                <Bar dataKey="safe" fill="#4caf50" name="Safe" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Content Categories
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
