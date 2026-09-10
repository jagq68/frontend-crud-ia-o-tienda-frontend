import React, { useState, useEffect } from 'react';

function FormClientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    identificacion: '', nombres: '', apellidos: '',
    telefono: '', direccion: '', email: '', usuario: '', pais: ''
  });
  const [idEditando, setIdEditando] = useState(null);

  const API_URL = 'http://localhost:3000/api/clientes';

  const cargarClientes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.identificacion || !form.nombres || !form.apellidos || !form.email || !form.usuario) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    try {
      if (idEditando) {
        // Editar cliente existente
        await fetch(`${API_URL}/${idEditando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        setIdEditando(null);
      } else {
        // Crear cliente nuevo
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }

      setForm({ identificacion: '', nombres: '', apellidos: '', telefono: '', direccion: '', email: '', usuario: '', pais: '' });
      cargarClientes();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  const handleEditar = (cli) => {
    setIdEditando(cli.id);
    setForm({
      identificacion: cli.identificacion,
      nombres: cli.nombres,
      apellidos: cli.apellidos,
      telefono: cli.telefono || '',
      direccion: cli.direccion || '',
      email: cli.email,
      usuario: cli.usuario,
      pais: cli.pais || ''
    });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      cargarClientes();
    }
  };

  return (
    <div className="section-container">
      <h2>{idEditando ? '✏️ Editar Cliente' : '👤 Registrar Cliente'}</h2>
      <form onSubmit={handleSubmit} className="crud-form grid-form">
        <input placeholder="Identificación *" value={form.identificacion} onChange={e => setForm({...form, identificacion: e.target.value})} required />
        <input placeholder="Nombres *" value={form.nombres} onChange={e => setForm({...form, nombres: e.target.value})} required />
        <input placeholder="Apellidos *" value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} required />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
        <input placeholder="Dirección" value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} />
        <input type="email" placeholder="Email *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Usuario *" value={form.usuario} onChange={e => setForm({...form, usuario: e.target.value})} required />
        <input placeholder="País" value={form.pais} onChange={e => setForm({...form, pais: e.target.value})} />
        <button type="submit" className="btn-submit">
          {idEditando ? 'Guardar Cambios' : 'Agregar Cliente'}
        </button>
        {idEditando && <button type="button" className="btn-cancel" onClick={() => { setIdEditando(null); setForm({ identificacion: '', nombres: '', apellidos: '', telefono: '', direccion: '', email: '', usuario: '', pais: '' }); }}>Cancelar</button>}
      </form>

      <h3>Listado de Clientes</h3>
      <div className="cards-grid">
        {clientes.length === 0 ? <p>No hay clientes registrados.</p> : clientes.map(cli => (
          <div key={cli.id} className="card">
            <div className="card-header">
              <h3>{cli.nombres} {cli.apellidos}</h3>
            </div>
            <p><strong>Identificación:</strong> {cli.identificacion}</p>
            <p><strong>Email:</strong> {cli.email}</p>
            <p><strong>Usuario:</strong> {cli.usuario}</p>
            {cli.telefono && <p><strong>Teléfono:</strong> {cli.telefono}</p>}
            {cli.direccion && <p><strong>Dirección:</strong> {cli.direccion}</p>}
            {cli.pais && <p><strong>País:</strong> {cli.pais}</p>}
            
            <div className="card-actions">
              <button onClick={() => handleEditar(cli)} className="btn-edit">Editar</button>
              <button onClick={() => handleEliminar(cli.id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormClientes;