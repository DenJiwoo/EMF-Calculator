import React, { useState } from "react";

export default function ForceInput({ onCalculate }) {
  const [q, setQ] = useState("");
  const [v, setV] = useState("");
  const [B, setB] = useState("");
  const [phi, setPhi] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const qNum = parseFloat(q);
    const vNum = parseFloat(v);
    const BNum = parseFloat(B);
    const phiNum = parseFloat(phi);

    if ([qNum, vNum, BNum, phiNum].some(isNaN)) {
      alert("Please enter valid numbers in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/calculate-scalar-force", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: qNum,
          v: vNum,
          B: BNum,
          phi: phiNum,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const force = data.F;

      onCalculate(force, { q: qNum, v: vNum, B: BNum, phi: phiNum });
    } catch (error) {
      alert("Error calculating force: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="q">Charge (q):</label>
        <input
          id="q"
          type="text"
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Calculating..." : "Calculate"}
      </button>
    </form>
  );
}
