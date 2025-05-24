import { useState } from 'react';

const EMFCalculator = () => {
  const [charge, setCharge] = useState('');
  const [velocity, setVelocity] = useState('');
  const [magneticField, setMagneticField] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // For now, just do the calculation locally
    const q = parseFloat(charge);
    const v = parseFloat(velocity);
    const B = parseFloat(magneticField);

    if (isNaN(q) || isNaN(v) || isNaN(B)) {
      alert('Please enter valid numbers.');
      return;
    }

    const emfForce = q * v * B;
    setResult(emfForce.toFixed(4)); // Rounded to 4 decimal places
  };

  return (
    <div style={{ marginTop: '1rem' }}>
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
      <button onClick={handleCalculate} style={{ marginTop: '1rem' }}>
        Calculate
      </button>
      {result !== null && (
        <p style={{ marginTop: '1rem' }}>
          <strong>EMF Force:</strong> {result} N
        </p>
      )}
    </div>
  );
};

export default EMFCalculator;
