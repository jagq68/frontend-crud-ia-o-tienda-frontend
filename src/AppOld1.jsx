import { useEffect, useState } from "react";
import "./App.css";
import Pessoa3 from "./components/Pessoa3";

function App() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function consultaApi() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          console.log("Erro ao consultar api");
        }

        const data = await res.json();
        setPessoas(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Fim da consulta da API");
      }
    }

    consultaApi();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Turma 58 - Aula 2</h1>
      </header>

      <section className="lista-container">
        <h2>Componente Pessoa3</h2>
        <div className="cards-grid">
          {pessoas.map((pessoa) => (
            <Pessoa3
              key={pessoa.id}
              nome={pessoa.name}
              username={pessoa.username}
              email={pessoa.email}
              phone={pessoa.phone}
              company={pessoa.company.name}
              address={`${pessoa.address.street}, ${pessoa.address.suite} - ${pessoa.address.city}`}
              zipcode={pessoa.address.zipcode}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;