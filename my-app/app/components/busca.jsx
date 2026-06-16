
import { useState } from "react";

export default function Buscar({ onResultadoEncontrado, onCarregando }) {
  const [termo, setTermo] = useState("");

  async function buscar(e) {
    e.preventDefault()
    if (!termo.trim()) {
      onResultadoEncontrado([]);
      return;
    }
    onCarregando(true)
    try{
      const res = await fetch(`/api/buscarUsers?busca=${encodeURIComponent(termo)}`);
      const data = await res.json();
      onResultadoEncontrado(data)
    } catch (erro){
      console.error(erro)
      alert("erro ao buscar")
    } finally {
      onCarregando(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-900 bg-clip-text text-transparent p-4">Pesquisar usuários</h1>
      <form onSubmit={buscar}>
        <input
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Insira um nome ou função"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 m-4"
            onClick={buscar}
            style={{ marginLeft: 10 }}
          >
            Pesquisar
          </button>
      </form>
    </div>
  );
}