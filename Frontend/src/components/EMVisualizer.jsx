import React, { useState, useRef } from "react";

const WIDTH = 600;
const HEIGHT = 400;
const CHARGE_RADIUS = 10;

function vectorCrossZ(v, b) {
  const q = 1;
  return { fx: q * b * (-v.y), fy: q * b * v.x };
}

function EMForceDemo() {
  const B1 = { x: 200, y: 200, radius: 150, Bz: 0.8 };
  const B2 = { x: 400, y: 200, radius: 150, Bz: -0.6 };

  const [chargePos, setChargePos] = useState({ x: 300, y: 150 });
  const [velocity, setVelocity] = useState({ x: 50, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  const dragging = useRef(false);

  function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }

  function getBzAtPosition(pos) {
    function BzField(field) {
      const dist = distance(pos, { x: field.x, y: field.y });
      if (dist > field.radius) return 0;
      return field.Bz * (1 - dist / field.radius);
    }
    return BzField(B1) + BzField(B2);
  }

  const Bz = getBzAtPosition(chargePos);
  const force = vectorCrossZ(velocity, Bz);
  const forceScale = 5;

  function onMouseDown(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (distance(mousePos, chargePos) < CHARGE_RADIUS + 5) {
      dragging.current = true;
    }
  }
  function onMouseUp() {
    dragging.current = false;
  }
  function onMouseMove(e) {
    if (!dragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setChargePos(mousePos);
  }

  function onVelChangeX(e) {
    setVelocity((v) => ({ x: Number(e.target.value), y: v.y }));
  }
  function onVelChangeY(e) {
    setVelocity((v) => ({ x: v.x, y: Number(e.target.value) }));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#123458",
      }}
    >
      {/* Left side: Demo */}
      <div style={{ width: WIDTH }}>
        <h2>Electromagnetic Force Demo</h2>
        <svg
          width={WIDTH}
          height={HEIGHT}
          style={{
            border: "1px solid #ccc",
            background: "#F1EFEC",
            borderRadius: "8px",
            userSelect: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <circle
            cx={B1.x}
            cy={B1.y}
            r={B1.radius}
            fill="rgba(18,52,88,0.2)"
            stroke="#123458"
            strokeWidth="2"
          />
          <circle
            cx={B2.x}
            cy={B2.y}
            r={B2.radius}
            fill="rgba(200,50,50,0.2)"
            stroke="#881111"
            strokeWidth="2"
          />
          <line
            x1={chargePos.x}
            y1={chargePos.y}
            x2={chargePos.x + velocity.x}
            y2={chargePos.y + velocity.y}
            stroke="#ff9900"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1={chargePos.x}
            y1={chargePos.y}
            x2={chargePos.x + force.fx * forceScale}
            y2={chargePos.y + force.fy * forceScale}
            stroke="#123458"
            strokeWidth="3"
            markerEnd="url(#arrowheadForce)"
          />
          <circle
            cx={chargePos.x}
            cy={chargePos.y}
            r={CHARGE_RADIUS}
            fill="#ff6600"
            stroke="#663300"
            strokeWidth="2"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#ff9900" />
            </marker>
            <marker
              id="arrowheadForce"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#123458" />
            </marker>
          </defs>
        </svg>

        <div style={{ marginTop: "1rem" }}>
          <label>
            Velocity X:{" "}
            <input
              type="range"
              min="-100"
              max="100"
              value={velocity.x}
              onChange={onVelChangeX}
              step="1"
            />
            {velocity.x.toFixed(0)}
          </label>
          <br />
          <label>
            Velocity Y:{" "}
            <input
              type="range"
              min="-100"
              max="100"
              value={velocity.y}
              onChange={onVelChangeY}
              step="1"
            />
            {velocity.y.toFixed(0)}
          </label>
        </div>
        <p style={{ marginTop: "1rem" }}>
          Drag the orange charge dot to move it inside the magnetic field
          regions. Adjust velocity using sliders. The dark blue arrow shows the{" "}
          <b>electromagnetic force</b> direction and magnitude (scaled).
        </p>
      </div>

      {/* Right side: Expandable Info Panel */}
      <div
        style={{
          width: showInfo ? 320 : 40,
          backgroundColor: "#D4C9BE",
          borderRadius: "8px",
          padding: showInfo ? "1rem" : "0.5rem 0.3rem",
          color: "#123458",
          fontSize: "0.9rem",
          transition: "width 0.3s ease",
          overflow: "hidden",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: showInfo ? "flex-start" : "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
        onClick={() => setShowInfo(!showInfo)}
        title={showInfo ? "Click to collapse" : "Click to expand physics info"}
      >
        {showInfo ? (
          <>
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
              Physics Explanation
            </h3>
            <p>The electromagnetic force (Lorentz force) on a charged particle is given by:</p>
            <p style={{ fontStyle: "italic", marginLeft: "1rem" }}>F = q (v × B)</p>
            <p>
              Where <b>q</b> is charge, <b>v</b> is the velocity vector, and <b>B</b> is the magnetic
              field vector. The cross product means the force is perpendicular to both velocity and
              magnetic field.
            </p>
            <p>
              In this 2D demo, the magnetic fields point out of or into the screen (along z-axis).
              The charge moves in the XY plane with velocity controlled by sliders.
            </p>
            <p>
              Blue and red circles show positive and negative magnetic field regions respectively.
              Drag the charge and adjust velocity to see the force vector update.
            </p>
            <small style={{ marginTop: "auto", fontSize: "0.75rem", opacity: 0.7 }}>
              Click here to collapse
            </small>
          </>
        ) : (
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontWeight: "bold",
              marginTop: "1rem",
              userSelect: "none",
            }}
          >
            Physics
          </div>
        )}
      </div>
    </div>
  );
}

export default EMForceDemo;
