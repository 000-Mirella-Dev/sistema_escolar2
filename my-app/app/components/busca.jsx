

import { useState } from "react";

export default function Buscar() {
  const [termo, setTermo] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  async function buscar() {
    if (!termo.trim()) {
      setUsuarios([]);
      return;
    }

    const res = await fetch(`/api/users?busca=${encodeURIComponent(termo)}`);
    const data = await res.json();

    setUsuarios(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-900 bg-clip-text text-transparent p-4">Pesquisar usuários</h1>
     <input
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Insira um nome ou função"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 m-4"
        onClick={buscar}
        style={{ marginLeft: 10 }}
      >
        Pesquisar
      </button>

      <div className="mt-4">
        {usuarios.map((u, index) => (
          <div key={index} className="border rounded-lg p-3 mb-3 shadow-sm max-w-full">
            <strong>{u.nome}</strong>
            <p className="text-gray-500">{u.perfil}</p>
          </div>
        ))}
      </div>
    </div>
  );
}