import React, { useState, useEffect } from 'react';
import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister'; // Import the new register component
import AposentoHeader from './components/AposentoHeader';
import AposentoDashboard from './components/AposentoDashboard';
import AposentoRegisterForm from './components/AposentoRegisterForm';
import AposentoDataTable from './components/AposentoDataTable';
import AposentoManageStructure from './components/AposentoManageStructure';
import { initialAposentos } from './mock/initialAposentos';
import { saveRecordToCloud, loadRecordsFromCloud, saveAposentosDataToCloud, loadAposentosDataFromCloud, authenticateUserFromCloud, registerUserToCloud } from './utils/cloudStorage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [aposentosData, setAposentosData] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // New state to toggle register form

  useEffect(() => {
    const fetchData = async () => {
      const storedAposentos = await loadAposentosDataFromCloud();
      if (storedAposentos && storedAposentos.length > 0) {
        setAposentosData(storedAposentos);
      } else {
        setAposentosData(initialAposentos);
        await saveAposentosDataToCloud(initialAposentos);
      }

      const storedRecords = await loadRecordsFromCloud();
      if (storedRecords) {
        setRecords(storedRecords);
      }
    };
    fetchData();
  }, []);

  const handleLogin = async (username, password) => {
    const result = await authenticateUserFromCloud(username, password);
    if (result.success) {
      setIsLoggedIn(true);
      setShowRegister(false); // Hide register form if login is successful
    } else {
      alert(result.message); // Show login error
    }
  };

  const handleRegister = async (username, password) => {
    const result = await registerUserToCloud({ username, password });
    if (result.success) {
      alert(result.message); // Show success message
      setShowRegister(false); // Go back to login form after successful registration
    } else {
      alert(result.message); // Show registration error
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleRegisterAposento = async (newRecord) => {
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    await saveRecordToCloud(newRecord);

    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      const galponIndex = updatedData.findIndex(g => g.id === newRecord.galpon);
      
      if (galponIndex !== -1) {
        const sectionIndex = updatedData[galponIndex].sections.findIndex(s => s.id === newRecord.section);
        if (sectionIndex !== -1) {
          const aposentoIndex = updatedData[galponIndex].sections[sectionIndex].aposentos.findIndex(a => a.id === newRecord.aposento);
          if (aposentoIndex !== -1) {
            const zoneToUpdate = updatedData[galponIndex].sections[sectionIndex].aposentos[aposentoIndex].zones.find(
              (zone) => zone.name === newRecord.zone
            );
            if (zoneToUpdate) {
              zoneToUpdate.status = newRecord.status;
            }
          }
        }
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
  };

  const handleAddGalpon = async (galponId) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      const existingGalpon = updatedData.find(g => g.id === galponId);
      if (!existingGalpon) {
        updatedData.push({ id: galponId, sections: [] });
        updatedData.sort((a, b) => a.id - b.id);
        alert(`Galpón ${galponId} agregado exitosamente.`);
      } else {
        alert(`El Galpón ${galponId} ya existe.`);
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
  };

  const handleDeleteGalpon = async (galponId) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = prevAposentosData.filter(g => g.id !== galponId);
      saveAposentosDataToCloud(updatedData);
      alert(`Galpón ${galponId} y su contenido han sido borrados.`);
      return updatedData;
    });
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.filter(r => r.galpon !== galponId);
      return updatedRecords;
    });
  };

  const handleAddSection = async (galponId, sectionId) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      const galpon = updatedData.find(g => g.id === galponId);
      if (galpon) {
        const existingSection = galpon.sections.find(s => s.id === sectionId);
        if (!existingSection) {
          galpon.sections.push({ id: sectionId, aposentos: [] });
          galpon.sections.sort((a, b) => a.id - b.id);
          alert(`Sección ${sectionId} agregada al Galpón ${galponId} exitosamente.`);
        } else {
          alert(`La Sección ${sectionId} ya existe en el Galpón ${galponId}.`);
        }
      } else {
        alert(`El Galpón ${galponId} no existe.`);
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
  };

  const handleDeleteSection = async (galponId, sectionId) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      const galpon = updatedData.find(g => g.id === galponId);
      if (galpon) {
        galpon.sections = galpon.sections.filter(s => s.id !== sectionId);
        alert(`Sección ${sectionId} del Galpón ${galponId} y su contenido han sido borrados.`);
      } else {
        alert(`El Galpón ${galponId} no existe.`);
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.filter(r => !(r.galpon === galponId && r.section === sectionId));
      return updatedRecords;
    });
  };

  const handleAddAposento = async ({ galponId, sectionId, aposentoId }) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      let galpon = updatedData.find(g => g.id === galponId);

      if (galpon) {
        let section = galpon.sections.find(s => s.id === sectionId);
        if (section) {
          const existingAposento = section.aposentos.find(a => a.id === aposentoId);
          if (!existingAposento) {
            section.aposentos.push({
              id: aposentoId,
              zones: [
                { name: 'alero izquierdo', status: 'vacío' },
                { name: 'centro', status: 'vacío' },
                { name: 'alero derecho', status: 'vacío' },
              ],
            });
            section.aposentos.sort((a, b) => a.id - b.id);
            alert(`Aposento G${galponId}-S${sectionId}-A${aposentoId} creado exitosamente.`);
          } else {
            alert(`El aposento G${galponId}-S${sectionId}-A${aposentoId} ya existe.`);
          }
        } else {
          alert(`La Sección ${sectionId} no existe en el Galpón ${galponId}.`);
        }
      } else {
        alert(`El Galpón ${galponId} no existe.`);
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
  };

  const handleDeleteAposento = async (galponId, sectionId, aposentoId) => {
    setAposentosData((prevAposentosData) => {
      const updatedData = JSON.parse(JSON.stringify(prevAposentosData));
      const galpon = updatedData.find(g => g.id === galponId);
      if (galpon) {
        const section = galpon.sections.find(s => s.id === sectionId);
        if (section) {
          section.aposentos = section.aposentos.filter(a => a.id !== aposentoId);
          alert(`Aposento G${galponId}-S${sectionId}-A${aposentoId} ha sido borrado.`);
        } else {
          alert(`La Sección ${sectionId} no existe en el Galpón ${galponId}.`);
        }
      } else {
        alert(`El Galpón ${galponId} no existe.`);
      }
      saveAposentosDataToCloud(updatedData);
      return updatedData;
    });
    setRecords((prevRecords) => {
      const updatedRecords = prevRecords.filter(r => !(r.galpon === galponId && r.section === sectionId && r.aposento === aposentoId));
      return updatedRecords;
    });
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <AuthRegister onRegisterSuccess={handleRegister} onBackToLogin={() => setShowRegister(false)} />
    ) : (
      <AuthLogin onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased relative overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center opacity-5 pointer-events-none z-0"
        style={{ backgroundImage: `url('https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0vmtY5VyKJs9OrpDUz2LHG6YaodyTFNfcmRut')`, backgroundSize: '300px' }}
      ></div>

      <AposentoHeader currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main className="container mx-auto py-8 relative z-10">
        {currentPage === 'dashboard' && <AposentoDashboard aposentos={aposentosData} records={records} />}
        {currentPage === 'register' && (
          <>
            <AposentoRegisterForm onRegister={handleRegisterAposento} />
            <AposentoDataTable records={records} aposentosData={aposentosData} />
          </>
        )}
        {currentPage === 'manageStructure' && (
          <AposentoManageStructure
            aposentos={aposentosData}
            onAddAposento={handleAddAposento}
            onDeleteAposento={handleDeleteAposento}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
            onAddGalpon={handleAddGalpon}
            onDeleteGalpon={handleDeleteGalpon}
          />
        )}
      </main>
    </div>
  );
};

export default App;