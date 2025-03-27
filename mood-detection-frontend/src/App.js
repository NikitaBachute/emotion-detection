import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FaceDetection from "./components/FaceDetection";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/face" element={<FaceDetection />} />
    </Routes>
  );
};

export default App;
