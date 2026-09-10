import React, { useState, useEffect } from 'react';

function VistaCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => {
        // Filtramos solo aquellos productos que sí tienen un cliente asociado (cliente_id no nulo)
        const productosAsignados = data.filter(p => p.cliente_id !== null);
        setCompras(productosAsignados);
      })
      .catch(error => console.error("Error al cargar compras:", error));
  }, []);

  return (
    <div className="section-container">
      <h2>🛒 Compras y Relaciones Asignadas</h2>
      <p className="info-text">Aquí se visualizan únicamente los productos que han sido asociados (comprados) por un cliente.</p>
      
      <div className="cards-grid">
        {compras.length === 0 ? (
          <p className="empty-message">No se han registrado compras o asignaciones en el sistema todavía.</p>
        ) : (
          compras.map(p => {
            const cantidad = p.cantidad || 1;
            const total = p.precio * cantidad;
            return (
              <div key={p.id} className="card purchase-card">
                <div className="purchase-badge">✔ Asignado / Comprado</div>
                <h3>{p.nombre}</h3>
                
                <div className="purchase-details">
                  <p><strong>Cliente Comprador:</strong></p>
                  <div className="buyer-info">
                    👤 {p.cliente_nombre} {p.cliente_apellido}
                  </div>
                  <hr />
                  <p><strong>Detalle de Compra:</strong></p>
                  <p>Precio Unitario: <span>${p.precio}</span></p>
                  <p>Cantidad Adquirida: <span>{cantidad}</span></p>
                  <p className="total-label">Importe Total: <strong>${total.toFixed(2)}</strong></p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default VistaCompras;