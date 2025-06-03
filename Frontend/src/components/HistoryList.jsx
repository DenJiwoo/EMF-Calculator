function HistoryList({ history }) {
  function formatScientific(num) {
    return num.toExponential(4).replace(/e([+-])/i, 'e $1 ');
  }

  return (
    <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm mt-6 max-h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Calculations</h3>
      {history.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {history.map((entry, idx) => (
            <li key={idx} className="py-2 text-sm text-gray-700 font-mono">
              q = {entry.q}, v = {entry.v}, B = {entry.B}, ϕ = {entry.phi} → F = {formatScientific(entry.F)} N
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No calculations yet. Your history will appear here.</p>
      )}
    </div>
  );
}

export default HistoryList;
