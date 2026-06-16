"use client";

import { useEffect, useState } from "react";
import Buscar from "../../../components/busca";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarUsuarios() {
    setLoading(true)
    try{
      const res = await fetch("/api/buscarUsers")
      const data = await res.json()
      setUsuarios(data)
    } catch (erro){
      console.error(erro)
      alert("erro ao carregar usuários")
    } finally{
      setLoading(false)
    }
    
  }
  function lidarComResultado(dadosFiltrados){
    if (dadosFiltrados.length === 0){
      carregarUsuarios()
    } else {
      setUsuarios(dadosFiltrados)
    }
  }

  return (
    <div className="p-6">
      <Buscar onResultadoEncontrado={lidarComResultado} onCarregando={setLoading}></Buscar>
      <h1 className="text-2xl font-bold mb-6">
        Usuários Cadastrados
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border bg-white shadow">

          <thead>
            <tr className="border-b bg-gray-100">
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
                    {usuario.criado_por || "Sistema"}
                  </td>
                 <td className="p-3">
                {usuario.criado_ip || "N/A"}
                   </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center"
                >
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>

        </table>
      )}
    </div>
  );
}