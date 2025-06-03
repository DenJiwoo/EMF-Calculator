import React, { useState } from "react";


function ForceInput({ onCalculate }) {
  const [q, setQ] = useState("");
  const [v, setV] = useState("");
  const [B, setB] = useState("");
  const [phi, setPhi] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const qNum = parseFloat(q);
    const vNum = parseFloat(v);
    const BNum = parseFloat(B);
    const phiNum = (parseFloat(phi) * Math.PI) / 180; // degrees to radians

    if ([qNum, vNum, BNum, phiNum].some(isNaN)) {
      alert("Please enter valid numbers in all fields");
      return;
    }

    const force = Math.abs(qNum) * vNum * BNum * Math.sin(phiNum);
    onCalculate(force, { q: qNum, v: vNum, B: BNum, phi: phiNum });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="q">Charge (q):</label>
        <input
          id="q"
          type="number"
          step="any"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="v">Velocity (v):</label>
        <input
          id="v"
          type="number"
          step="any"
          value={v}
          onChange={(e) => setV(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="B">Magnetic Field (B):</label>
        <input
          id="B"
          type="number"
          step="any"
          value={B}
          onChange={(e) => setB(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="phi">Angle (ϕ degrees):</label>
        <input
          id="phi"
          type="number"
          step="any"
          value={phi}
          onChange={(e) => setPhi(e.target.value)}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
}

function ForceResult({ force }) {
  function formatScientific(num) {
    return num.toExponential(4).replace(/e([+-])/i, "e $1 ");
  }

  return (
    <div className="force-result-container">
      <h3>Calculation Result</h3>
      <pre>{formatScientific(force)} N</pre>
    </div>
  );
}

function HistoryList({ history }) {
  function formatScientific(num) {
    return num.toExponential(4).replace(/e([+-])/i, "e $1 ");
  }

  return (
    <div className="history-list-container">
      <h3>Previous Calculations</h3>
      <ul>
        {history.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            q = {entry.q}, v = {entry.v}, B = {entry.B}, ϕ ={" "}
            {(entry.phi * (180 / Math.PI)).toFixed(2)}° → F ={" "}
            {formatScientific(entry.F)} N
          </li>
        ))}
      </ul>
    </div>
  );
}

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/api/ask-ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="ai-chat-container"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <h2>Ask the AI</h2>
      <form onSubmit={handleSubmit} style={{ flexShrink: 0 }}>
        <textarea
          placeholder="Type your physics problem here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1.125rem",
            borderRadius: "0.375rem",
            border: "1px solid #D4C9BE",
            resize: "vertical",
            color: "#123458",
            boxSizing: "border-box",
            fontFamily: "inherit",
            backgroundColor: "#F1EFEC",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1rem",
            backgroundColor: "#123458",
            color: "#F1EFEC",
            fontWeight: "700",
            fontSize: "1.125rem",
            border: "none",
            borderRadius: "0.375rem",
            cursor: loading ? "not-allowed" : "pointer",
            padding: "0.6rem 1.2rem",
          }}
        >
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>
      {response && (
        <pre
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#F1EFEC",
            border: "1px solid #D4C9BE",
            borderRadius: "0.5rem",
            padding: "1rem",
            color: "#123458",
            whiteSpace: "pre-wrap",
            flexGrow: 1,
            overflowY: "auto",
            fontSize: "1.125rem",
            fontFamily: "monospace",
          }}
        >
          {response}
        </pre>
      )}
    </div>
  );
}
export default function App() {
  const [force, setForce] = useState(null);
  const [history, setHistory] = useState([]);

  function handleCalculate(newForce, inputs) {
    setForce(newForce);
    setHistory([{ ...inputs, F: newForce }, ...history]);
  }

  return (
    <div className="app-container" style={{ display: "flex" }}>
      <div className="left-container" style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ color: "#123458" }}>⚡ EM Force Calculator</h1>
        <p className="subtitle">
          Compute electromagnetic force using scalar inputs (F = |q|·v·B·sin(ϕ))
        </p>
        <ForceInput onCalculate={handleCalculate} />
        {force !== null && <ForceResult force={force} />}
        <HistoryList history={history} />
      </div>
      <div className="right-container" style={{ flex: 1, padding: "2rem", borderLeft: "1px solid #D4C9BE" }}>
        <AIChat />
      </div>
    </div>
  );
}
