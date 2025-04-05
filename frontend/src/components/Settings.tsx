import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  Alert,
} from "@mui/material";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    detectionThreshold: 0.5,
    enableNotifications: true,
    enableEmailAlerts: false,
    emailAddress: "",
    apiKey: "",
    maxBatchSize: 100,
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setSettings({ ...settings, [field]: value });
    };

  const handleSliderChange =
    (field: string) => (event: Event, newValue: number | number[]) => {
      setSettings({ ...settings, [field]: newValue });
    };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save settings
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Detection Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Detection Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom>Detection Threshold</Typography>
                <Slider
                  value={settings.detectionThreshold}
                  onChange={handleSliderChange("detectionThreshold")}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Maximum Batch Size</Typography>
                <TextField
                  type="number"
                  value={settings.maxBatchSize}
                  onChange={handleChange("maxBatchSize")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* Notification Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableNotifications}
                      onChange={handleChange("enableNotifications")}
                    />
                  }
                  label="Enable Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableEmailAlerts}
                      onChange={handleChange("enableEmailAlerts")}
                    />
                  }
                  label="Enable Email Alerts"
                />
              </Grid>
              {settings.enableEmailAlerts && (
                <Grid item xs={12}>
                  <TextField
                    label="Email Address"
                    value={settings.emailAddress}
                    onChange={handleChange("emailAddress")}
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* API Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              API Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="API Key"
                  type="password"
                  value={settings.apiKey}
                  onChange={handleChange("apiKey")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save Settings
            </Button>
          </Grid>

          {/* Status Messages */}
          {saveStatus === "success" && (
            <Grid item xs={12}>
              <Alert severity="success">Settings saved successfully!</Alert>
            </Grid>
          )}
          {saveStatus === "error" && (
            <Grid item xs={12}>
              <Alert severity="error">
                Error saving settings. Please try again.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
