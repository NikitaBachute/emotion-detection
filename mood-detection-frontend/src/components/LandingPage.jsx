import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="bg-cover">
      <div className="text-container">
        <div>When words fail, music speaks</div>
        <div className="mt-4">Let every note heal your soul.</div>

        <Link to="/face" className="dive-btn mt-6">
          Dive in →
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
