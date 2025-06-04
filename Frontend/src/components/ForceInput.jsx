import React, { useState } from "react";

export default function ForceInput({ onCalculate }) {
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
      {/* form inputs same as before */}
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
