"use client";
import useProf from "../../../../app/hooks/prof";
import LogoutButton from "@/app/components/logout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardProfessor() {
  useProf();
  const [dados, setDados] = useState({
    Usuarios: 0,
    Admins: 0,
    Professores: 0,
    Alunos: 0,
    Cadastros: [],
  }); 

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch("/api/totalUsuarios");
        const data = await resposta.json();
        setDados(data);
      } catch (err) {
        console.log("Erro ao carregar dados:", err);
      }
    }

    carregarDados();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">

      <header className="bg-blue-800 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">
          Plataforma Escolar
        </h1>

        <p className="text-blue-100 mt-1">
          Área do Professor
        </p>
       <LogoutButton/>
        <div className="flex flex-wrap gap-4 mt-4">


        </div>
      </header>


      <section className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Alunos</h2>
            <p className="text-4xl font-bold mt-2">
              {dados.Alunos}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Professores</h2>
            <p className="text-4xl font-bold mt-2">
              {dados.Professores}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Administradores</h2>
            <p className="text-4xl font-bold mt-2">
              {dados.Admins}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total de usuários</h2>
            <p className="text-4xl font-bold mt-2">
              {dados.Usuarios}
            </p>
          </div>

        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Ações rápidas
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/dashboards/professor/cadastrarAluno"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg"
            >
             Cadastrar Aluno
            </Link>

            <Link
              href="/dashboards/professor/editarBoletins"
              className="bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Gerenciar Notas
            </Link>

            <button className="bg-red-700 text-white px-6 py-3 rounded-lg">
              Auditoria
            </button>

          </div>
        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Últimos Cadastros
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-4">Nome</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Perfil</th>
                <th className="text-left px-6 py-4">Criado em</th>
                <th className="text-left px-6 py-4">Criado por</th>
              </tr>
            </thead>

            <tbody>
              {dados.Cadastros?.length > 0 ? (
                dados.Cadastros.map((usuario, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      {usuario.nome}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {usuario.email}
                    </td>

                    <td className="px-6 py-4">
                      {usuario.perfil}
                    </td>

                    <td className="px-6 py-4">
                      {usuario.criado_em
                        ? new Date(usuario.criado_em).toLocaleString("pt-BR")
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4 text-blue-600 font-medium">
                      {usuario.criado_por || "Sistema"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Nenhum usuário cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
}