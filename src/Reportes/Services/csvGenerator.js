// csvGenerator.js
export function generateCSV(data) {
    if (!data || data.length === 0) return '';
  
    // Obtener las columnas dinámicamente de la primera fila
    const columns = Object.keys(data[0]);
    
    // Generar encabezados
    const header = columns.join(',');
    
    // Generar filas
    const rows = data.map(item => 
      columns.map(column => 
        `"${item[column] !== null ? item[column].toString().replace(/"/g, '""') : ''}"`
      ).join(',')
    );
  
    return [header, ...rows].join('\n');
  }