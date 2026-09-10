import React, { useState, useEffect } from 'react';

function FormProductos() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: '', precio: '', cantidad: '', imagen: '', descripcion: '', cliente_id: ''
  });
  const [idEditando, setIdEditando] = useState(null);

  const API_PROD = 'http://localhost:3000/api/productos';
  const API_CLI = 'http://localhost:3000/api/clientes';

  const cargarDatos = async () => {
    try {
      const [resProd, resCli] = await Promise.all([
        fetch(API_PROD),
        fetch(API_CLI)
      ]);
      const prodData = await resProd.json();
      const cliData = await resCli.json();
      
      setProductos(prodData);
      setClientes(cliData);
    } catch (error) {
      console.error('Error al cargar datos de productos/clientes:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      alert("Por favor completa el nombre y el precio");
      return;
    }

    const payload = {
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      cantidad: parseInt(form.cantidad) || 0,
      imagen: form.imagen || '',
      descripcion: form.descripcion || '',
      cliente_id: form.cliente_id ? parseInt(form.cliente_id) : null
    };

    try {
      if (idEditando) {
        await fetch(`${API_PROD}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        setIdEditando(null);
      } else {
        await fetch(API_PROD, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setForm({ nombre: '', precio: '', cantidad: '', imagen: '', descripcion: '', cliente_id: '' });
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleEditar = (p) => {
    setIdEditando(p.id);
    setForm({
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad || '',
      imagen: p.imagen || '',
      descripcion: p.descripcion || '',
      cliente_id: p.cliente_id || ''
    });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await fetch(`${API_PROD}/${id}`, { method: 'DELETE' });
      cargarDatos();
    }
  };

  return (
    <div className="section-container">
      <h2>{idEditando ? '✏️ Editar Producto' : '📦 Registrar Producto'}</h2>
      <form onSubmit={handleSubmit} className="crud-form grid-form">
        <input placeholder="Nombre *" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input type="number" step="0.01" placeholder="Precio *" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
        <input type="number" placeholder="Cantidad / Stock" value={form.cantidad} onChange={e => setForm({...form, cantidad: e.target.value})} />
        <input placeholder="URL Imagen (opcional)" value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} />
        <input placeholder="Descripción (opcional)" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        
        <select value={form.cliente_id} onChange={e => setForm({...form, cliente_id: e.target.value})}>
          <option value="">-- Asignar Cliente (Compra) --</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombres} {c.apellidos}</option>
          ))}
        </select>
        
        <button type="submit" className="btn-submit">
          {idEditando ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
        {idEditando && <button type="button" className="btn-cancel" onClick={() => { setIdEditando(null); setForm({ nombre: '', precio: '', cantidad: '', imagen: '', descripcion: '', cliente_id: '' }); }}>Cancelar</button>}
      </form>

      <h3>Listado de Productos</h3>
      <div className="cards-grid">
        {productos.length === 0 ? <p>No hay productos registrados.</p> : productos.map(p => (
          <div key={p.id} className="card">
            {p.imagen ? (
              <img src={p.imagen} alt={p.nombre} className="card-img" onError={(e)=>{e.target.onerror = null; e.target.src="https://placehold.co/250x150?text=Sin+Imagen"}} />
            ) : (
              <div className="card-img-placeholder">📦 No Imagen</div>
            )}
            <h3>{p.nombre}</h3>
            <p className="price">${p.precio}</p>
            <p><strong>Stock:</strong> {p.cantidad || 0}</p>
            {p.descripcion && <p className="desc">{p.descripcion}</p>}
            
            <p className="association-badge">
              <strong>Asignado a:</strong> <span className={p.cliente_nombre ? "user-tagged" : "user-notag"}>
                {p.cliente_nombre ? `${p.cliente_nombre} ${p.cliente_apellido}` : 'Sin Cliente (Stock Libre)'}
              </span>
            </p>

            <div className="card-actions">
              <button onClick={() => handleEditar(p)} className="btn-edit">Editar</button>
              <button onClick={() => handleEliminar(p.id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormProductos;