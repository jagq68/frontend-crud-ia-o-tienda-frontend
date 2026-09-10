function Pessoa3({ nome, username, email, phone, company, address, zipcode }) {
  return (
    <div className="card-pessoa">
      <h3>{nome}</h3>
      <p className="username">@{username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {phone}</p>
      <p><strong>Empresa:</strong> {company}</p>
      <p><strong>Dirección:</strong> {address}</p>
      <p><strong>Código Postal:</strong> {zipcode}</p>
    </div>
  );
}

export default Pessoa3;