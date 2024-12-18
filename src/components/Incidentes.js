import React, { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';

function Incidentes() {
  const [incidentes, setIncidentes] = useState([
    {
      ID_Incidente: 1,
      Fecha_Inicio: '2024-01-01',
      Fecha_Fin: '2024-01-02',
      Descripcion: 'Acceso no autorizado detectado',
      Estado: 'En Proceso',
      Accion_Tomada: 'Monitoreo del dispositivo afectado',
      ID_Amenaza: 101,
      ID_Dispositivo: 202,
      ID_Usuario: 303,
    },
  ]);

  const [nuevoIncidente, setNuevoIncidente] = useState({
    Fecha_Inicio: '',
    Fecha_Fin: '',
    Descripcion: '',
    Estado: '',
    Accion_Tomada: '',
  });

  const agregarIncidente = () => {
    if (!nuevoIncidente.Fecha_Inicio || !nuevoIncidente.Descripcion || !nuevoIncidente.Estado) {
      alert('Por favor, complete los campos obligatorios: Fecha de Inicio, Descripción y Estado.');
      return;
    }

    const nuevoID = incidentes.length + 1;
    setIncidentes([
      ...incidentes,
      { ID_Incidente: nuevoID, ...nuevoIncidente },
    ]);

    setNuevoIncidente({
      Fecha_Inicio: '',
      Fecha_Fin: '',
      Descripcion: '',
      Estado: '',
      Accion_Tomada: '',
    });
  };

  const eliminarIncidente = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este incidente?")) {
      setIncidentes(incidentes.filter((incidente) => incidente.ID_Incidente !== id));
    }
  };

  const data = useMemo(() => incidentes, [incidentes]);

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'ID_Incidente' },
    { Header: 'Fecha de Inicio', accessor: 'Fecha_Inicio' },
    { Header: 'Fecha de Fin', accessor: 'Fecha_Fin' },
    { Header: 'Descripción', accessor: 'Descripcion' },
    { Header: 'Estado', accessor: 'Estado' },
    { Header: 'Acción Tomada', accessor: 'Accion_Tomada' },
    {
      Header: 'Eliminar',
      accessor: 'Eliminar',
      Cell: ({ row }) => (
        <button onClick={() => eliminarIncidente(row.original.ID_Incidente)} style={styles.deleteButton}>
          X
        </button>
      ),
    },
  ], [incidentes]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Incidentes</h1>

      <div style={styles.formContainer}>
        <input
          type="date"
          placeholder="Fecha de Inicio"
          value={nuevoIncidente.Fecha_Inicio}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Fecha_Inicio: e.target.value })}
          style={styles.input}
        />
        <input
          type="date"
          placeholder="Fecha de Fin"
          value={nuevoIncidente.Fecha_Fin}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Fecha_Fin: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoIncidente.Descripcion}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Descripcion: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Estado"
          value={nuevoIncidente.Estado}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Estado: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Acción Tomada"
          value={nuevoIncidente.Accion_Tomada}
          onChange={(e) => setNuevoIncidente({ ...nuevoIncidente, Accion_Tomada: e.target.value })}
          style={styles.input}
        />
        <button onClick={agregarIncidente} style={styles.addButton}>Agregar Incidente</button>
      </div>

      <table {...getTableProps()} style={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={styles.th}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={styles.td}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 15px',
    backgroundColor: '#f4f4f4',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#ffffff',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Incidentes;
