"use client";
import useAdmin from "../../../../app/hooks/adm";
import { useEffect, useState } from "react";

export default function AuditoriaPage() {
      useAdmin();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarLogs = async () => {
    try {
      const resposta = await fetch("/api/auditoria");
      const dados = await resposta.json();

      setLogs(dados);
    } catch (erro) {
      console.error("Erro ao carregar auditoria:", erro);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const carregar = async () => {
    await carregarLogs();
  };

  carregar();
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Carregando auditoria...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Auditoria
      </h1>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">
                Usuário
              </th>

              <th className="p-3 text-left border-b">
                Alteração
              </th>

              <th className="p-3 text-left border-b">
                Tabela
              </th>

              <th className="p-3 text-left border-b">
                Registro
              </th>

              <th className="p-3 text-left border-b">
                Descrição
              </th>
              <th className="p-3 text-left border-b">
                Data
              </th>
            </tr>
          </thead>
          <tbody>

            {logs.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>

            ) : (

              logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border-b">
                    {log.usuario_nome}
                  </td>

                  <td className="p-3 border-b">
                    {log.tipo_alteracao}
                  </td>

                  <td className="p-3 border-b">
                    {log.tabela_afetada}
                  </td>

                  <td className="p-3 border-b">
                    {log.registro_id}
                  </td>

                  <td className="p-3 border-b">
                    {log.descricao}
                  </td>

                  <td className="p-3 border-b">
                    {new Date(
                      log.data_hora
                    ).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}