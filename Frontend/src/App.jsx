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
    const phiNum = (parseFloat(phi) * Math.PI) / 180;

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
        <label htmlFor="charge">Charge (q):</label>
        <input
          id="charge"
          type="number"
          step="any"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="velocity">Velocity (v):</label>
        <input
          id="velocity"
          type="number"
          step="any"
          value={v}
          onChange={(e) => setV(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="magnetic">Magnetic Field (B):</label>
        <input
          id="magnetic"
          type="number"
          step="any"
          value={B}
          onChange={(e) => setB(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="angle">Angle (ϕ degrees):</label>
        <input
          id="angle"
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
      <pre className="preformatted">{formatScientific(force)} N</pre>
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

export default function App() {
  const [force, setForce] = useState(null);
  const [history, setHistory] = useState([]);

  function handleCalculate(newForce, inputs) {
    setForce(newForce);
    setHistory([{ ...inputs, F: newForce }, ...history]);
  }

  return (
    <div className="app-container">
      <div className="left-container">
        <h1>⚡ EM Force Calculator</h1>
        <p className="subtitle">
          Compute electromagnetic force using scalar inputs (F = |q| vB sin(ϕ))
        </p>
        <ForceInput onCalculate={handleCalculate} />
        {force !== null && <ForceResult force={force} />}
        <HistoryList history={history} />
      </div>

      <div className="right-container">
        <h2>AI Integration</h2>
        <p>Placeholder for Gemini AI interface and word problem solver.</p>
        {/* Your AI components/UI go here */}
      </div>
    </div>
  );
}


