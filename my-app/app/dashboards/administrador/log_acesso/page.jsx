"use client";
import useAdmin from "../../../../app/hooks/adm";
import { useEffect, useState } from "react";

export default function LogAcessoPage() {
  useAdmin();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function carregarLogs() {

      try {

        const resposta =
          await fetch("/api/log_acesso");

        const dados =
          await resposta.json();

        setLogs(dados);

      } catch (erro) {

        console.error(
          "Erro ao carregar logs:",
          erro
        );

      } finally {

        setLoading(false);

      }
    }

    carregarLogs();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando logs...
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Log de Acesso
        </h1>

        <p className="text-gray-500 mt-1">
          Histórico de logins, logouts e tentativas inválidas.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Usuário
                </th>

                <th className="text-left p-4">
                  Perfil
                </th>

                <th className="text-left p-4">
                  Ação
                </th>

                <th className="text-left p-4">
                  IP
                </th>

                <th className="text-left p-4">
                  Descrição
                </th>

                <th className="text-left p-4">
                  Data/Hora
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500"
                  >
                    Nenhum log encontrado.
                  </td>
                </tr>

              ) : (

                logs.map((log) => (

                  <tr
                    key={log.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      <div>
                        <p className="font-medium">
                          {log.nome}
                        </p>

                        <p className="text-sm text-gray-500">
                          {log.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">
                      {log.perfil}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          log.acao === "LOGIN"
                            ? "bg-green-100 text-green-700"
                            : log.acao === "LOGOUT"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.acao}
                      </span>

                    </td>

                    <td className="p-4">
                      {log.ip}
                    </td>

                    <td className="p-4">
                      {log.descricao}
                    </td>

                    <td className="p-4">
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
    </div>
  );
}