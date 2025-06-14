import React, { useState } from "react";
import EMField3D from "./EMVisualizer";

export default function LandingPage({ onStart }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "#123458" }}>⚡ Lorentz' Force Calculator</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "1.5rem", color: "#030303" }}>
        Understand Lorentz' Force using real physics formulas and AI-powered help.
      </p>

      <EMField3D />

      <button
        style={{
          marginTop: "2rem",
          backgroundColor: hover ? "#123458" : "#4A5C8A",
          color: "#F1EFEC",
          fontSize: "1.25rem",
          padding: "0.75rem 2rem",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={onStart}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Get Started
      </button>
    </div>
  );
}
