import React, { useState } from 'react';

const AposentoNewForm = ({ onAddAposento }) => {
  const [galponId, setGalponId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [aposentoId, setAposentoId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAposento({
      galponId: parseInt(galponId),
      sectionId: parseInt(sectionId),
      aposentoId: parseInt(aposentoId),
    });
    setGalponId('');
    setSectionId('');
    setAposentoId('');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Registrar Nuevo Aposento</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="newGalponId" className="block text-sm font-medium text-gray-700 mb-1">Número de Galpón</label>
          <input
            type="number"
            id="newGalponId"
            value={galponId}
            onChange={(e) => setGalponId(e.target.value)}
            min="1"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="newSectionId" className="block text-sm font-medium text-gray-700 mb-1">Número de Sección</label>
          <input
            type="number"
            id="newSectionId"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            min="1"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="newAposentoId" className="block text-sm font-medium text-gray-700 mb-1">Número de Aposento</label>
          <input
            type="number"
            id="newAposentoId"
            value={aposentoId}
            onChange={(e) => setAposentoId(e.target.value)}
            min="1"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-3 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold shadow-sm"
        >
          Crear Nuevo Aposento
        </button>
      </form>
    </div>
  );
};

export default AposentoNewForm;