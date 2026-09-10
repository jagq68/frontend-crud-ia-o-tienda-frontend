import React, { useState, useEffect } from 'react';
import './App.css'; // Importación de estilos externos

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  const API_URL = 'http://localhost:3000/api/productos';

  const cargarProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    if (idEditando) {
      await fetch(`${API_URL}/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
      });
      setIdEditando(null);
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
      });
    }

    setNombre('');
    setPrecio('');
    cargarProductos();
  };

  const handleEditar = (producto) => {
    setIdEditando(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const handleEliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    cargarProductos();
  };

  return (
    <div className="crud-container">
      <h1 className="crud-title">Gestión de Productos Prueba de CRUD y Backend Generado por IA</h1>

      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="text"
          className="crud-input"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          className="crud-input"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          {idEditando ? 'Guardar Cambios' : 'Agregar'}
        </button>
      </form>

      <ul className="crud-list">
        {productos.map((prod) => (
          <li key={prod.id} className="crud-item">
            <span className="item-info">
              {prod.nombre} <span className="item-price">${prod.precio}</span>
            </span>
            <div className="item-actions">
              <button onClick={() => handleEditar(prod)} className="btn-edit">
                Editar
              </button>
              <button onClick={() => handleEliminar(prod.id)} className="btn-delete">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;