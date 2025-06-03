import { useState } from 'react';
import formulaImage from '../assets/EMF_formula.png';  // adjust path as needed

const EMFCalculator = () => {
  const [charge, setCharge] = useState('');
  const [velocity, setVelocity] = useState('');
  const [magneticField, setMagneticField] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const q = parseFloat(charge);
    const v = parseFloat(velocity);
    const B = parseFloat(magneticField);

    if (isNaN(q) || isNaN(v) || isNaN(B)) {
      alert('Please enter valid numbers.');
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/calculate-emf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          charge: q,
          velocity: v,
          magneticField: B,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.emfForce.toFixed(4));
      } else {
        alert(data.error || "An error occurred on the server.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to connect to backend. Is it running?");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <h1>Electromagnetic Force Calculator</h1>

      {/* Formula image */}
      <img
        src={formulaImage}
        alt="EMF formula: F = q × v × B"
        style={{ maxWidth: '300px', width: '100%', marginBottom: '1rem' }}
      />

      <div>
        <label>Charge (C): </label>
        <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} />
      </div>
      <div>
        <label>Velocity (m/s): </label>
        <input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} />
      </div>
      <div>
        <label>Magnetic Field (T): </label>
        <input type="number" value={magneticField} onChange={(e) => setMagneticField(e.target.value)} />
      </div>
      <button onClick={handleCalculate}>
        Calculate
      </button>
      {result !== null && (
        <p>
          <strong>EMF Force:</strong> {result} N
        </p>
      )}
    </div>
  );
};

export default EMFCalculator;
