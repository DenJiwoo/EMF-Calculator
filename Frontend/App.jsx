import { useState } from "react";

function App() {
  const [charge, setCharge] = useState("");
  const [velocity, setVelocity] = useState("");
  const [magneticField, setMagneticField] = useState("");
  const [result, setResult] = useState(null);

  const calculateEMF = async () => {
    const response = await fetch("http://localhost:3001/calculate-emf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        charge: parseFloat(charge),
        velocity: parseFloat(velocity),
        magneticField: parseFloat(magneticField),
      }),
    });

    const data = await response.json();
    setResult(data.emfForce);
  };

  return (
    <div>
      <h1>EMF Calculator</h1>
      <input type="number" placeholder="Charge (C)" value={charge} onChange={e => setCharge(e.target.value)} />
      <input type="number" placeholder="Velocity (m/s)" value={velocity} onChange={e => setVelocity(e.target.value)} />
      <input type="number" placeholder="Magnetic Field (T)" value={magneticField} onChange={e => setMagneticField(e.target.value)} />
      <button onClick={calculateEMF}>Calculate</button>
      {result !== null && <p>EMF Force: {result} N</p>}
    </div>
  );
}

export default App;
