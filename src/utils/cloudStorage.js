// Este archivo simula el almacenamiento en la nube.
// En una aplicación real, aquí integrarías una API de backend
// para interactuar con servicios como Firebase, AWS S3, o tu propio servidor.

// Para esta demostración, usaremos localStorage para simular persistencia.

const STORAGE_KEY_RECORDS = 'aposento_records';
const STORAGE_KEY_APOSENTOS_DATA = 'aposento_structure';
const STORAGE_KEY_USERS = 'app_users'; // New storage key for users

export const saveRecordToCloud = async (record) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingRecords = JSON.parse(localStorage.getItem(STORAGE_KEY_RECORDS) || '[]');
      existingRecords.push(record);
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(existingRecords));
      console.log('Record saved to "cloud" (localStorage):', record);
      resolve({ success: true, message: 'Record saved successfully' });
    }, 500); // Simulate network delay
  });
};

export const loadRecordsFromCloud = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const records = JSON.parse(localStorage.getItem(STORAGE_KEY_RECORDS) || '[]');
      console.log('Records loaded from "cloud" (localStorage):', records);
      resolve(records);
    }, 500); // Simulate network delay
  });
};

export const saveAposentosDataToCloud = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY_APOSENTOS_DATA, JSON.stringify(data));
      console.log('Aposentos data saved to "cloud" (localStorage):', data);
      resolve({ success: true, message: 'Aposentos data saved successfully' });
    }, 500); // Simulate network delay
  });
};

export const loadAposentosDataFromCloud = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_APOSENTOS_DATA) || 'null');
      console.log('Aposentos data loaded from "cloud" (localStorage):', data);
      resolve(data);
    }, 500); // Simulate network delay
  });
};

// New functions for user management
export const registerUserToCloud = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
      if (existingUsers.some(u => u.username === user.username)) {
        resolve({ success: false, message: 'El nombre de usuario ya existe.' });
      } else {
        existingUsers.push(user);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(existingUsers));
        console.log('User registered to "cloud" (localStorage):', user);
        resolve({ success: true, message: 'Usuario registrado exitosamente.' });
      }
    }, 500);
  });
};

export const authenticateUserFromCloud = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
      const user = existingUsers.find(u => u.username === username && u.password === password);
      if (user) {
        resolve({ success: true, message: 'Autenticación exitosa.' });
      } else {
        resolve({ success: false, message: 'Usuario o contraseña incorrectos.' });
      }
    }, 500);
  });
};