import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FormProductos from './Components/FormProductos';
import FormClientes from './Components/FormClientes';
import VistaCompras from './Components/VistaCompras';
import './App.css';

function App() {
  const [vistaActual, setVistaActual] = useState('productos');

  return (
    <div className="crud-container">
      <header className="crud-header">
        <h1 className="crud-title">Sistema de Gestión - Tienda</h1>
        <p className="crud-subtitle">Prueba de CRUD y Backend Generado por IA</p>
      </header>

      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main className="main-content">
        {vistaActual === 'productos' && <FormProductos />}
        {vistaActual === 'clientes' && <FormClientes />}
        {vistaActual === 'compras' && <VistaCompras />}
      </main>
    </div>
  );
}

export default App;