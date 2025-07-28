import React, { useState } from 'react';

const AposentoRegisterForm = ({ onRegister }) => {
  const [galpon, setGalpon] = useState('');
  const [section, setSection] = useState('');
  const [aposento, setAposento] = useState('');
  const [zone, setZone] = useState('');
  const [date, setDate] = useState('');
  const [lote, setLote] = useState('');
  const [corte, setCorte] = useState('');
  const [variedad, setVariedad] = useState('');
  const [cujes, setCujes] = useState('');
  const [status, setStatus] = useState('vacío');
  const [observations, setObservations] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      galpon: parseInt(galpon),
      section: parseInt(section),
      aposento: parseInt(aposento),
      zone,
      date,
      lote,
      corte,
      variedad,
      cujes: parseInt(cujes),
      status,
      observations,
    };
    onRegister(newRecord);
    // Reset form
    setGalpon('');
    setSection('');
    setAposento('');
    setZone('');
    setDate('');
    setLote('');
    setCorte('');
    setVariedad('');
    setCujes('');
    setStatus('vacío');
    setObservations('');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Registrar Datos de Aposento</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="galpon" className="block text-sm font-medium text-gray-700 mb-1">Galpón</label>
          <input
            type="number"
            id="galpon"
            value={galpon}
            onChange={(e) => setGalpon(e.target.value)}
            min="1"
            max="3"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">Sección</label>
          <input
            type="number"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            min="1"
            max="4"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="aposento" className="block text-sm font-medium text-gray-700 mb-1">Aposento</label>
          <input
            type="number"
            id="aposento"
            value={aposento}
            onChange={(e) => setAposento(e.target.value)}
            min="1"
            max="7"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">Zona</label>
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          >
            <option value="">Selecciona una zona</option>
            <option value="alero izquierdo">Alero Izquierdo</option>
            <option value="centro">Centro</option>
            <option value="alero derecho">Alero Derecho</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="lote" className="block text-sm font-medium text-gray-700 mb-1">Lote</label>
          <input
            type="text"
            id="lote"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="corte" className="block text-sm font-medium text-gray-700 mb-1">Corte</label>
          <input
            type="text"
            id="corte"
            value={corte}
            onChange={(e) => setCorte(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="variedad" className="block text-sm font-medium text-gray-700 mb-1">Variedad</label>
          <input
            type="text"
            id="variedad"
            value={variedad}
            onChange={(e) => setVariedad(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div>
          <label htmlFor="cujes" className="block text-sm font-medium text-gray-700 mb-1">Cujes</label>
          <input
            type="number"
            id="cujes"
            value={cujes}
            onChange={(e) => setCujes(e.target.value)}
            min="0"
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
          >
            <option value="vacío">Vacío</option>
            <option value="en proceso">En Proceso</option>
            <option value="lleno">Lleno</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
          <textarea
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition resize-none"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full mt-3 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold shadow-sm"
          >
            Registrar Aposento
          </button>
        </div>
      </form>
    </div>
  );
};

export default AposentoRegisterForm;