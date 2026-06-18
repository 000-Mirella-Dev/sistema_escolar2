"use client";
import useAuth from "@/app/hooks/auth"
import { useState, useEffect } from "react";

export default function ListaUsuarios() {
useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {

    setLoading(true);

    try {

      const res = await fetch(
        "/api/todosusuariosCadastrados"
      );

      const data = await res.json();

      setUsuarios(data);

    } catch (erro) {

      console.error(erro);
      alert("Erro ao carregar usuários");

    }

    setLoading(false);
  }

  async function pesquisarUsuarios() {

    setLoading(true);

    try {

      const res = await fetch(
        `/api/buscarUsers?busca=${encodeURIComponent(busca)}`
      );

      const data = await res.json();

      setUsuarios(data);

    } catch (erro) {

      console.error(erro);
      alert("Erro ao pesquisar usuários");

    }

    setLoading(false);
  }

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Usuários Cadastrados
      </h1>

      <div className="flex gap-2 mb-6">

        <input
          type="text"
          placeholder="Buscar por nome, email ou perfil"
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={pesquisarUsuarios}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Buscar
        </button>

        <button
          onClick={carregarUsuarios}
          className="bg-gray-600 text-white px-4 rounded"
        >
          Limpar
        </button>

      </div>

      {loading ? (

        <p>Carregando...</p>

      ) : (

        <table className="w-full border bg-white shadow">

          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Perfil</th>
              <th className="p-3 text-left">Criado em</th>
              <th className="p-3 text-left">Criado por</th>
              <th className="p-3 text-left">IP</th>
            </tr>
          </thead>

          <tbody>

            {usuarios.length > 0 ? (

              usuarios.map((usuario) => (

                <tr
                  key={usuario.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {usuario.id}
                  </td>

                  <td className="p-3">
                    {usuario.nome}
                  </td>

                  <td className="p-3">
                    {usuario.email}
                  </td>

                  <td className="p-3">
                    {usuario.perfil}
                  </td>

                  <td className="p-3">
                    {usuario.criado_em
                      ? new Date(
                          usuario.criado_em
                        ).toLocaleString("pt-BR")
                      : "-"}
                  </td>

                  <td className="p-3">
                    {usuario.criado_por || "-"}
                  </td>

                  <td className="p-3">
                    {usuario.criado_ip || "-"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center"
                >
                  Nenhum usuário encontrado
                </td>
              </tr>

            )}

          </tbody>

        </table>

      )}

    </main>
  );
}