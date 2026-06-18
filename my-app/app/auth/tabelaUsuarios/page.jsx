"use client";

import { useState, useEffect, useCallback } from "react";
import useAuth from "@/app/hooks/auth";

export default function ListaUsuarios() {
  useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);

  const carregarUsuarios = useCallback(async (paginaAlvo = 1) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/usuariosPaginados?pagina=${paginaAlvo}${
          busca ? `&busca=${encodeURIComponent(busca)}` : ""
        }`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao carregar usuários");
      }

      const data = await res.json();

      setUsuarios(data.usuarios || []);
      setPagina(data.pagina || 1);
      setTotalPaginas(data.totalPaginas || 1);
      setTotal(data.total || 0);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, [busca]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarUsuarios(1);
  }, [carregarUsuarios]);

  async function pesquisarUsuarios() {
    await carregarUsuarios(1);
  }

  async function limparBusca() {
    setBusca("");

    try {
      setLoading(true);

      const res = await fetch(
        "/api/usuariosPaginados?pagina=1",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setUsuarios(data.usuarios || []);
      setPagina(1);
      setTotalPaginas(data.totalPaginas || 1);
      setTotal(data.total || 0);
    } catch (erro) {
      console.error(erro);
    } finally {
      setLoading(false);
    }
  }

  function mudarPagina(novaPagina) {
    if (
      novaPagina < 1 ||
      novaPagina > totalPaginas ||
      loading
    ) {
      return;
    }

    carregarUsuarios(novaPagina);
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
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pesquisarUsuarios();
            }
          }}
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={pesquisarUsuarios}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
        >
          Buscar
        </button>

        <button
          onClick={limparBusca}
          disabled={loading}
          className="bg-gray-600 text-white px-4 rounded disabled:opacity-50"
        >
          Limpar
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <p className="mb-4">
            Total de usuários: {total}
          </p>

          <table className="w-full border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Perfil</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="border p-2">
                      {usuario.id}
                    </td>
                    <td className="border p-2">
                      {usuario.nome}
                    </td>
                    <td className="border p-2">
                      {usuario.email}
                    </td>
                    <td className="border p-2">
                      {usuario.perfil}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="border p-2 text-center"
                  >
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex gap-2 mt-4 items-center">
            <button
              onClick={() => mudarPagina(pagina - 1)}
              disabled={pagina <= 1 || loading}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Anterior
            </button>

            <span>
              Página {pagina} de {totalPaginas}
            </span>

            <button
              onClick={() => mudarPagina(pagina + 1)}
              disabled={pagina >= totalPaginas || loading}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </main>
  );
}