import React from "react";

function formatExponential(num) {
  if (num === 0) return "0";

  const superscriptMap = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "-": "⁻",
  };

  const sci = num.toExponential(3);
  const [mantissa, exp] = sci.split("e");
  const exponent = exp.replace("+", "");

  const superscriptExp = exponent
    .split("")
    .map((char) => superscriptMap[char] || char)
    .join("");

  return `${mantissa} × 10${superscriptExp}`;
}

export default function HistoryList({ history }) {
  return (
    <div className="history-list-container">
      <h3>Previous Calculations</h3>
      {history.length === 0 ? (
        <p>No calculations yet. Your history will appear here.</p>
      ) : (
        <ul>
          {history.map((entry, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              q = {entry.q}, v = {entry.v}, B = {entry.B}, ϕ ={" "}
              {(entry.phi * (180 / Math.PI)).toFixed(2)}° → F ={" "}
              {formatExponential(entry.F)} N
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
