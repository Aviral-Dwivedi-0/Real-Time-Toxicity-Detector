import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Dashboard from "./components/Dashboard";
import TextDetection from "./components/TextDetection";
import ImageDetection from "./components/ImageDetection";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/text-detection" element={<TextDetection />} />
              <Route path="/image-detection" element={<ImageDetection />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
