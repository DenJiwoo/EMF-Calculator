function ForceResult({ force }) {
  function formatScientific(num) {
    return num.toExponential(4).replace(/e([+-])/i, 'e $1 ');
  }

  return (
    <div className="bg-white border border-green-300 rounded-md p-6 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-green-900 mb-2">Calculation Result</h3>
      {force !== null ? (
        <pre className="bg-gray-100 text-gray-900 p-4 rounded-md font-mono text-xl">
          {formatScientific(force)} N
        </pre>
      ) : (
        <p className="text-gray-500">No result yet. Enter values and click "Calculate".</p>
      )}
    </div>
  );
}

export default ForceResult;