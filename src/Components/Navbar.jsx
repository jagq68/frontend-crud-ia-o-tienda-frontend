import React from 'react';

function Navbar({ vistaActual, setVistaActual }) {
  return (
    <nav className="navbar">
      <button 
        className={vistaActual === 'productos' ? 'active' : ''} 
        onClick={() => setVistaActual('productos')}
      >
        📦 Productos
      </button>
      <button 
        className={vistaActual === 'clientes' ? 'active' : ''} 
        onClick={() => setVistaActual('clientes')}
      >
        👤 Clientes
      </button>
      <button 
        className={vistaActual === 'compras' ? 'active' : ''} 
        onClick={() => setVistaActual('compras')}
      >
        🛒 Compras Asignadas
      </button>
    </nav>
  );
}

export default Navbar;