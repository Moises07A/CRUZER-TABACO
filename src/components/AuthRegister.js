import React, { useState } from 'react';

const AuthRegister = ({ onRegisterSuccess, onBackToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // In a real app, you'd send this to a backend for secure storage
    const storedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    if (storedUsers.some(u => u.username === username)) {
      setError('El nombre de usuario ya existe.');
      return;
    }

    const newUser = { username, password };
    localStorage.setItem('app_users', JSON.stringify([...storedUsers, newUser]));
    setSuccess('Usuario registrado exitosamente. ¡Ahora puedes iniciar sesión!');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0o3yOBhgDjdvqUQH6XhKYIiaSc3LCtrM1fen0" alt="Cruzer Tabaco Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Registrar Nuevo Usuario</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="regUsername" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              id="regUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <div>
            <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              id="regPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold shadow-sm"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors text-lg font-semibold shadow-sm"
          >
            Volver al Inicio de Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthRegister;