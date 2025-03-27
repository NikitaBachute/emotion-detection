import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { FaSpotify, FaArrowRight } from "react-icons/fa";
import './FaceDetection.css'
const FaceDetection = () => {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const webcamRef = useRef(null);

  const captureAndPredict = async () => {
    setLoading(true);
    setError("");

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        const response = await axios.post("http://127.0.0.1:5000/predict_mood", {
          image: imageSrc,
        });

        setMood(response.data.mood);
        setPlaylist(response.data.playlist);
        setQuote(response.data.quote);
      } catch (error) {
        console.error("Error detecting mood:", error);
        setError("Failed to detect mood. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?rain,window')" }}
    >
      <div className="flex items-center justify-between w-full max-w-4xl bg-transparent p-10 rounded-lg shadow-lg backdrop-blur-lg">
        {/* Left Section - Webcam */}
        <div className="relative w-1/2">
          <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <button
            onClick={captureAndPredict}
            disabled={loading}
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-8 py-3 rounded-full text-white ${
              loading ? "bg-gray-400" : "bg-gray-900 hover:bg-gray-700"
            } shadow-lg transition-all duration-300`}
          >
            {loading ? "Detecting..." : "Capture"}
          </button>
        </div>

        {/* Right Section - Mood and Playlist */}
        <div className="w-1/2 pl-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Face-based mood detection
          </h1>

          {error && (
            <div className="text-red-500 bg-white p-3 rounded-lg mb-4">{error}</div>
          )}

          {mood && (
            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Detected Mood:</h2>
              <p className="text-2xl font-bold mt-2">
                {mood} <span className="ml-2">😊</span>
              </p>
            </div>
          )}

          {playlist && (
            <a
              href={playlist}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gray-900 text-white py-3 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
            >
              <FaSpotify className="mr-2" />
              Open playlist <FaArrowRight className="ml-2" />
            </a>
          )}

          {quote && (
            <p className="mt-6 text-white text-center">
              {quote}
            </p>
          )}

          <p className="text-white mt-6 text-sm text-center">
            Stay positive and keep going <span className="ml-1">🏃</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaceDetection;
