import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  const API_URL = 'http://localhost:3000/api/productos';

  // 1. OBTENER PRODUCTOS (GET)
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

  // 2. CREAR O ACTUALIZAR PRODUCTO (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    if (idEditando) {
      // Actualizar producto existente (PUT)
      await fetch(`${API_URL}/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
      });
      setIdEditando(null);
    } else {
      // Crear nuevo producto (POST)
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
      });
    }

    setNombre('');
    setPrecio('');
    cargarProductos(); // Recargar lista
  };

  // 3. SELECCIONAR PARA EDITAR
  const handleEditar = (producto) => {
    setIdEditando(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  // 4. ELIMINAR PRODUCTO (DELETE)
  const handleEliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    cargarProductos(); // Recargar lista
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>CRUD de Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {idEditando ? 'Guardar Cambios' : 'Agregar'}
        </button>
      </form>

      {/* Lista de Productos */}
      <ul>
        {productos.map((prod) => (
          <li key={prod.id} style={{ marginBottom: '10px' }}>
            <strong>{prod.nombre}</strong> - ${prod.precio}
            <button
              onClick={() => handleEditar(prod)}
              style={{ marginLeft: '10px', marginRight: '5px' }}
            >
              Editar
            </button>
            <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;