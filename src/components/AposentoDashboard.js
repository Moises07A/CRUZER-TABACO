import React, { useState } from 'react';

const AposentoDashboard = ({ aposentos, records }) => {
  const [selectedAposentoInfo, setSelectedAposentoInfo] = useState(null);

  const getColor = (status) => {
    switch (status) {
      case 'vacío':
        return 'bg-gray-200 text-gray-700';
      case 'en proceso':
        return 'bg-yellow-200 text-yellow-800';
      case 'lleno':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const calculateGalponPercentage = (galpon) => {
    let totalZones = 0;
    let filledZones = 0;

    galpon.sections.forEach(section => {
      section.aposentos.forEach(aposento => {
        aposento.zones.forEach(zone => {
          totalZones++;
          if (zone.status === 'lleno' || zone.status === 'en proceso') {
            filledZones++;
          }
        });
      });
    });

    return totalZones > 0 ? Math.round((filledZones / totalZones) * 100) : 0;
  };

  const calculateTotalCujesForAposento = (galponId, sectionId, aposentoId) => {
    const relevantRecords = records.filter(record =>
      record.galpon === galponId &&
      record.section === sectionId &&
      record.aposento === aposentoId
    );
    return relevantRecords.reduce((sum, record) => sum + record.cujes, 0);
  };

  const calculateTotalCujesForSection = (galponId, sectionId) => {
    const relevantRecords = records.filter(record =>
      record.galpon === galponId &&
      record.section === sectionId
    );
    return relevantRecords.reduce((sum, record) => sum + record.cujes, 0);
  };

  const calculateTotalCujesForGalpon = (galponId) => {
    const relevantRecords = records.filter(record =>
      record.galpon === galponId
    );
    return relevantRecords.reduce((sum, record) => sum + record.cujes, 0);
  };

  const handleAposentoClick = (galponId, sectionId, aposentoId) => {
    const aposentoRecords = records.filter(record =>
      record.galpon === galponId &&
      record.section === sectionId &&
      record.aposento === aposentoId
    );
    setSelectedAposentoInfo({ galponId, sectionId, aposentoId, records: aposentoRecords });
  };

  const closeAposentoInfo = () => {
    setSelectedAposentoInfo(null);
  };

  const PercentageCircle = ({ percentage }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-green-500 transition-all duration-500 ease-in-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Vista General de Aposentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aposentos.map((galpon, galponIndex) => (
          <div key={galponIndex} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Galpón {galpon.id}</h3>
              <PercentageCircle percentage={calculateGalponPercentage(galpon)} />
            </div>
            {galpon.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4 last:mb-0">
                <h4 className="text-lg font-medium text-gray-700 mb-2">Sección {section.id}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {section.aposentos.map((aposento, aposentoIndex) => (
                    <div
                      key={aposentoIndex}
                      className="p-2 bg-gray-50 rounded-md border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleAposentoClick(galpon.id, section.id, aposento.id)}
                    >
                      <p className="text-xs font-medium text-gray-500 mb-1">Aposento {aposento.id}</p>
                      <div className="flex space-x-1">
                        {aposento.zones.map((zone, zoneIndex) => (
                          <div
                            key={zoneIndex}
                            className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-semibold ${getColor(zone.status)}`}
                            title={`Zona: ${zone.name}, Estado: ${zone.status}`}
                          >
                            {zone.name.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-gray-800 mt-2">Cujes: {calculateTotalCujesForAposento(galpon.id, section.id, aposento.id)}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-900 mt-4 border-t pt-2 border-gray-200">Total Cujes Sección {section.id}: {calculateTotalCujesForSection(galpon.id, section.id)}</p>
              </div>
            ))}
            <p className="text-lg font-bold text-gray-900 mt-4 border-t pt-4 border-gray-300">Total Cujes Galpón {galpon.id}: {calculateTotalCujesForGalpon(galpon.id)}</p>
          </div>
        ))}
      </div>

      {selectedAposentoInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full relative">
            <button
              onClick={closeAposentoInfo}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Información del Aposento G{selectedAposentoInfo.galponId}-S{selectedAposentoInfo.sectionId}-A{selectedAposentoInfo.aposentoId}</h3>
            {selectedAposentoInfo.records.length > 0 ? (
              <div className="max-h-80 overflow-y-auto pr-2">
                {selectedAposentoInfo.records.map((record, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200">
                    <p className="text-sm text-gray-700"><span className="font-semibold">Fecha:</span> {record.date}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Lote:</span> {record.lote}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Corte:</span> {record.corte}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Variedad:</span> {record.variedad}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Cujes:</span> {record.cujes}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Estado:</span> {record.status}</p>
                    <p className="text-sm text-gray-700"><span className="font-semibold">Zona:</span> {record.zone}</p>
                    {record.observations && <p className="text-sm text-gray-700"><span className="font-semibold">Obs:</span> {record.observations}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No hay registros para este aposento.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AposentoDashboard;