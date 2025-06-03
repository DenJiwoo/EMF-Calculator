function ForceInput({ form, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label className="block font-medium text-gray-700 mb-1">Charge (q):</label>
        <input
          type="number"
          value={form.q}
          onChange={(e) => onChange('q', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Velocity (v):</label>
        <input
          type="number"
          value={form.v}
          onChange={(e) => onChange('v', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Magnetic Field (B):</label>
        <input
          type="number"
          value={form.B}
          onChange={(e) => onChange('B', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Angle (ϕ in degrees):</label>
        <input
          type="number"
          value={form.phi}
          onChange={(e) => onChange('phi', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Calculate
      </button>
    </form>
  );
}

export default ForceInput;
