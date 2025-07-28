import React from 'react';

const AposentoHeader = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center rounded-b-2xl border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0o3yOBhgDjdvqUQH6XhKYIiaSc3LCtrM1fen0" alt="Cruzer Tabaco Logo" className="h-10 w-auto" />
        <h1 className="text-2xl font-semibold text-gray-900">Cruzer Tabaco - Control de Cocida de la Virginia</h1>
      </div>
      <nav className="flex space-x-2">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 'dashboard' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Vista General
        </button>
        <button
          onClick={() => onNavigate('register')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 'register' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Registrar
        </button>
        <button
          onClick={() => onNavigate('manageStructure')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 'manageStructure' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Gestionar Estructura
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default AposentoHeader;