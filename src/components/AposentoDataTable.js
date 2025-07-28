import React, { useState } from 'react';

const AposentoDataTable = ({ records, aposentosData }) => {
  const [filterLote, setFilterLote] = useState('');

  const filteredRecords = records.filter(record =>
    record.lote.toLowerCase().includes(filterLote.toLowerCase())
  );

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

  const handleExport = () => {
    // Function to convert array of arrays to CSV string
    const arrayToCsv = (data) => {
      return data.map(row =>
        row.map(cell => {
          // Ensure cell content is treated as string and escape double quotes
          const escapedCell = String(cell).replace(/"/g, '""');
          return `"${escapedCell}"`;
        }).join(',')
      ).join('\n');
    };

    // Prepare data for records sheet
    const recordsHeaders = [
      "Galpón", "Sección", "Aposento", "Zona", "Estado", "Fecha", "Lote", "Corte", "Variedad", "Cujes", "Observaciones"
    ];
    const recordsData = filteredRecords.map(record => [
      record.galpon,
      record.section,
      record.aposento,
      record.zone,
      record.status,
      record.date,
      record.lote,
      record.corte,
      record.variedad,
      record.cujes,
      record.observations
    ]);
    const recordsCsv = arrayToCsv([recordsHeaders, ...recordsData]);

    // Prepare data for summary sheet
    const summaryHeaders = ["Galpón", "Porcentaje Lleno"];
    const summaryData = aposentosData.map(galpon => [
      `Galpón ${galpon.id}`,
      `${calculateGalponPercentage(galpon)}%`
    ]);
    const summaryCsv = arrayToCsv([summaryHeaders, ...summaryData]);

    // Combine into a single CSV with a clear header for each section
    const combinedCsv = `Informe Detallado de Aposentos de Cocida\n\n` +
                        `Registros de Aposentos:\n${recordsCsv}\n\n` +
                        `Resumen de Porcentaje de Llenado por Galpón:\n${summaryCsv}`;

    const blob = new Blob([combinedCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "informe_aposentos_cocida.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Historial de Registros</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filtrar por Lote..."
          value={filterLote}
          onChange={(e) => setFilterLote(e.target.value)}
          className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition w-1/2"
        />
        <button
          onClick={handleExport}
          className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors shadow-sm"
        >
          Exportar Informe CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Galpón</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aposento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Corte</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variedad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cujes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="11" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No hay registros para mostrar.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.galpon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.aposento}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.zone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.lote}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.corte}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.variedad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.cujes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.observations}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AposentoDataTable;