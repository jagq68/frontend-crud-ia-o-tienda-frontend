import { useState } from 'react';

export default function Curtida() {
  const [curtidas, setCurtidas] = useState(0);

  const adicionarCurtida = () => {
    setCurtidas(curtidas + 1);
  };

  const removerCurtida = () => {
    setCurtidas(curtidas > 0 ? curtidas - 1 : 0);
  };

  const zerarCurtidas = () => {
    setCurtidas(0);
  };

  return (
    <div>
      <h1>❤️ Curtidas</h1>
      <h2>{curtidas}</h2>
      <button onClick={adicionarCurtida}> + Curtir </button>
      <button onClick={removerCurtida}> - Remover curtida </button>
      <button onClick={zerarCurtidas}> Zerar </button>
    </div>
  );
}