import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function App() {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const captureAndPredict = async () => {
    setLoading(true);

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture the image
      try {
        const response = await axios.post("http://127.0.0.1:5000/predict_mood", {
          image: imageSrc, // Send image as Base64
        });

        setMood(response.data.mood);
        setPlaylist(response.data.playlist);  // This now correctly sets the playlist from Flask
        setQuote(response.data.quote);
      } catch (error) {
        console.error("Error detecting mood:", error);
      }
    }

    setLoading(false);
  };


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Face-Based Mood Detection</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={400} />
      <br />
      <button onClick={captureAndPredict} disabled={loading}>
        {loading ? "Detecting Mood..." : "Capture & Predict Mood"}
      </button>
      {mood && (
        <div>
          <h2>Detected Mood: {mood}</h2>
          {playlist && <a href={playlist} target="_blank" rel="noopener noreferrer">🎵 Open Playlist</a>}
          <p>💡 {quote}</p>
        </div>
      )}
    </div>
  );
}

export default App;
