import React, { useState } from 'react';

const AposentoManageStructure = ({ onAddAposento, onDeleteAposento, onAddSection, onDeleteSection, onAddGalpon, onDeleteGalpon }) => {
  const [newGalponId, setNewGalponId] = useState('');
  const [newSectionGalponId, setNewSectionGalponId] = useState('');
  const [newSectionId, setNewSectionId] = useState('');
  const [newAposentoGalponId, setNewAposentoGalponId] = useState('');
  const [newAposentoSectionId, setNewAposentoSectionId] = useState('');
  const [newAposentoId, setNewAposentoId] = useState('');

  const [deleteGalponId, setDeleteGalponId] = useState('');
  const [deleteSectionGalponId, setDeleteSectionGalponId] = useState('');
  const [deleteSectionId, setDeleteSectionId] = useState('');
  const [deleteAposentoGalponId, setDeleteAposentoGalponId] = useState('');
  const [deleteAposentoSectionId, setDeleteAposentoSectionId] = useState('');
  const [deleteAposentoId, setDeleteAposentoId] = useState('');

  const handleAddGalponSubmit = (e) => {
    e.preventDefault();
    onAddGalpon(parseInt(newGalponId));
    setNewGalponId('');
  };

  const handleAddSectionSubmit = (e) => {
    e.preventDefault();
    onAddSection(parseInt(newSectionGalponId), parseInt(newSectionId));
    setNewSectionGalponId('');
    setNewSectionId('');
  };

  const handleAddAposentoSubmit = (e) => {
    e.preventDefault();
    onAddAposento({
      galponId: parseInt(newAposentoGalponId),
      sectionId: parseInt(newAposentoSectionId),
      aposentoId: parseInt(newAposentoId),
    });
    setNewAposentoGalponId('');
    setNewAposentoSectionId('');
    setNewAposentoId('');
  };

  const handleDeleteGalponSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`¿Estás seguro de que quieres borrar el Galpón ${deleteGalponId} y todo su contenido? Esta acción es irreversible.`)) {
      onDeleteGalpon(parseInt(deleteGalponId));
      setDeleteGalponId('');
    }
  };

  const handleDeleteSectionSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`¿Estás seguro de que quieres borrar la Sección ${deleteSectionId} del Galpón ${deleteSectionGalponId} y todo su contenido? Esta acción es irreversible.`)) {
      onDeleteSection(parseInt(deleteSectionGalponId), parseInt(deleteSectionId));
      setDeleteSectionGalponId('');
      setDeleteSectionId('');
    }
  };

  const handleDeleteAposentoSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`¿Estás seguro de que quieres borrar el Aposento ${deleteAposentoId} de la Sección ${deleteAposentoSectionId} del Galpón ${deleteAposentoGalponId}? Esta acción es irreversible.`)) {
      onDeleteAposento(parseInt(deleteAposentoGalponId), parseInt(deleteAposentoSectionId), parseInt(deleteAposentoId));
      setDeleteAposentoGalponId('');
      setDeleteAposentoSectionId('');
      setDeleteAposentoId('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Gestionar Estructura de Aposentos</h2>

      {/* Add Galpon */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nuevo Galpón</h3>
        <form onSubmit={handleAddGalponSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="newGalponId" className="block text-sm font-medium text-gray-700 mb-1">Número de Galpón</label>
            <input
              type="number"
              id="newGalponId"
              value={newGalponId}
              onChange={(e) => setNewGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors shadow-sm"
          >
            Agregar Galpón
          </button>
        </form>
      </div>

      {/* Add Section */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nueva Sección</h3>
        <form onSubmit={handleAddSectionSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="newSectionGalponId" className="block text-sm font-medium text-gray-700 mb-1">Galpón</label>
            <input
              type="number"
              id="newSectionGalponId"
              value={newSectionGalponId}
              onChange={(e) => setNewSectionGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="newSectionId" className="block text-sm font-medium text-gray-700 mb-1">Número de Sección</label>
            <input
              type="number"
              id="newSectionId"
              value={newSectionId}
              onChange={(e) => setNewSectionId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors shadow-sm"
          >
            Agregar Sección
          </button>
        </form>
      </div>

      {/* Add Aposento */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nuevo Aposento</h3>
        <form onSubmit={handleAddAposentoSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="newAposentoGalponId" className="block text-sm font-medium text-gray-700 mb-1">Galpón</label>
            <input
              type="number"
              id="newAposentoGalponId"
              value={newAposentoGalponId}
              onChange={(e) => setNewAposentoGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="newAposentoSectionId" className="block text-sm font-medium text-gray-700 mb-1">Sección</label>
            <input
              type="number"
              id="newAposentoSectionId"
              value={newAposentoSectionId}
              onChange={(e) => setNewAposentoSectionId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="newAposentoId" className="block text-sm font-medium text-gray-700 mb-1">Número de Aposento</label>
            <input
              type="number"
              id="newAposentoId"
              value={newAposentoId}
              onChange={(e) => setNewAposentoId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors shadow-sm"
          >
            Agregar Aposento
          </button>
        </form>
      </div>

      {/* Delete Galpon */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Borrar Galpón</h3>
        <form onSubmit={handleDeleteGalponSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="deleteGalponId" className="block text-sm font-medium text-gray-700 mb-1">Número de Galpón a Borrar</label>
            <input
              type="number"
              id="deleteGalponId"
              value={deleteGalponId}
              onChange={(e) => setDeleteGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Borrar Galpón
          </button>
        </form>
      </div>

      {/* Delete Section */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Borrar Sección</h3>
        <form onSubmit={handleDeleteSectionSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="deleteSectionGalponId" className="block text-sm font-medium text-gray-700 mb-1">Galpón</label>
            <input
              type="number"
              id="deleteSectionGalponId"
              value={deleteSectionGalponId}
              onChange={(e) => setDeleteSectionGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="deleteSectionId" className="block text-sm font-medium text-gray-700 mb-1">Número de Sección a Borrar</label>
            <input
              type="number"
              id="deleteSectionId"
              value={deleteSectionId}
              onChange={(e) => setDeleteSectionId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Borrar Sección
          </button>
        </form>
      </div>

      {/* Delete Aposento */}
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Borrar Aposento</h3>
        <form onSubmit={handleDeleteAposentoSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="deleteAposentoGalponId" className="block text-sm font-medium text-gray-700 mb-1">Galpón</label>
            <input
              type="number"
              id="deleteAposentoGalponId"
              value={deleteAposentoGalponId}
              onChange={(e) => setDeleteAposentoGalponId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="deleteAposentoSectionId" className="block text-sm font-medium text-gray-700 mb-1">Sección</label>
            <input
              type="number"
              id="deleteAposentoSectionId"
              value={deleteAposentoSectionId}
              onChange={(e) => setDeleteAposentoSectionId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="deleteAposentoId" className="block text-sm font-medium text-gray-700 mb-1">Número de Aposento a Borrar</label>
            <input
              type="number"
              id="deleteAposentoId"
              value={deleteAposentoId}
              onChange={(e) => setDeleteAposentoId(e.target.value)}
              min="1"
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Borrar Aposento
          </button>
        </form>
      </div>
    </div>
  );
};

export default AposentoManageStructure;