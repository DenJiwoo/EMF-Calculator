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

export default function ForceResult({ force }) {
  return (
    <div className="force-result-container">
      <h3>Calculation Result</h3>
      <pre>{formatExponential(force)} N</pre>
    </div>
  );
}
