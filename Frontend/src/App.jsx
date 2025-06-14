import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ForceInput from "./components/ForceInput";
import ForceResult from "./components/ForceResult";
import HistoryList from "./components/HistoryList";
import AIChat from "./components/AIChat";

export default function App() {
  const [started, setStarted] = useState(false);
  const [force, setForce] = useState(null);
  const [history, setHistory] = useState([]);

  function handleCalculate(newForce, inputs) {
    setForce(newForce);
    setHistory([{ ...inputs, F: newForce }, ...history]);
  }

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Back button - only shown when started */}
      <button
        onClick={() => setStarted(false)}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          backgroundColor: "#4A5C8A",
          color: "#F1EFEC",
          border: "none",
          borderRadius: "0.3rem",
          padding: "0.4rem 0.8rem",
          cursor: "pointer",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          userSelect: "none",
          transition: "background-color 0.3s ease",
          zIndex: 1000,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a4a70")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4A5C8A")}
        title="Back to Landing Page"
      >
        ←
      </button>

      <div className="app-container" style={{ display: "flex" }}>
        <div className="left-container" style={{ flex: 1, padding: "2rem" }}>
          <h1 style={{ color: "#123458" }}>⚡ Lorentz' Force Calculator</h1>
          <p className="subtitle">
            Compute Lorentz' electromagnetic force using scalar inputs (F = |q|·v·B·sin(ϕ))
          </p>
          <p>Note: you must input scientific notations for Charge(q) and Velocity(v).</p>
          <ForceInput onCalculate={handleCalculate} />
          {force !== null && <ForceResult force={force} />}
          <HistoryList history={history} />
        </div>
        <div
          className="right-container"
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "#D4C9BE",
            borderRadius: "0.5rem",
            marginLeft: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AIChat />
        </div>
      </div>
    </div>
  );
}
