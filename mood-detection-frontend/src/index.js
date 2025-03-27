import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Import Router
import App from "./App"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />  {/* ✅ App is now wrapped inside Router */}
    </Router>
  </React.StrictMode>
);
