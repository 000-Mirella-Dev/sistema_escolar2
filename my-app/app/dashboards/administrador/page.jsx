"use client";
import LogoutButton from "@/app/components/logout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardAdmin() {
  const router = useRouter();

  const [dados, setDados] = useState({
    Usuarios: 0,
    Admins: 0,
    Professores: 0,
    Alunos: 0,
    Cadastros: [],
  });

  useEffect(() => {

    async function verificarAcesso() {

      const resposta =
        await fetch("/api/verificarAdm");

      if (!resposta.ok) {

        router.push("/acessoNegado");

      }

    }

    verificarAcesso();

  }, [router]);

  useEffect(() => {

    async function carregarDados() {

      try {

        const resposta =
          await fetch("/api/totalUsuarios");

        const data =
          await resposta.json();

        setDados(data);

      } catch (err) {

        console.log(err);

      }
    }

    carregarDados();

  }, []);

  return (
    <main className="min-h-screen bg-gray-100">

      <header className=" bg-linear-to-tr from-blue-700 to-sky-400 text-white p-6 shadow ">
        <h1 className="text-3xl font-bold">
          Plataforma Escolar
        </h1>


        <p className="text-blue-100 mt-1">
          Área do Administrador
        </p>

        <div className="flex flex-wrap gap-4 mt-4">

          <LogoutButton/>

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
              href="/dashboards/administrador/gerenciarUsuarios"
              className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-900 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm p-4 text-center leading-5 rounded-sm"
            >
              Cadastrar Usuarios
            </Link> 

            <Link
              href="/dashboards/administrador/editarUsuarios"
              className= "text-white bg-linear-to-r from-blue-400 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-900 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm p-4 text-center leading-5 rounded-sm"
            >
              Editar Usuarios
            </Link>

            <Link
              href="/dashboards/administrador/excluirUsuarios"
              className="text-white bg-linear-to-r from-pink-600 via-red-600 to-red-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-red-900 dark:focus:ring-red-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-base text-sm p-4 text-center leading-5 rounded-sm"
            >
              Excluir Usuarios
            </Link>

                       <Link
              href="/dashboards/administrador/gerenciarBoletim"
              className="text-white bg-linear-to-r from-blue-400 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-900 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm p-4 text-center leading-5 rounded-sm"
            >
              Gerenciar Boletims
            </Link>

               <Link
              href="/dashboards/administrador/tabelaUsuarios"
              className="text-white bg-linear-to-r from-blue-400 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-900 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm p-4 text-center leading-5 rounded-sm"
            >
              Ver todos os usuários
            </Link>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Últimos Cadastros
          </h2>
       <div className= " mt-10 rounded-lg overflow-hidden border-2 border-gray-400">
          <table className="w-full">
            <thead>
              <tr className="overflow-x-auto rounded-t-xl border-gray-200 shadow-md m-5">
                <th className="text-left bg-gray-400 px-6 py-4">Nome</th>
                <th className="text-left bg-gray-400 px-6 py-4">Email</th>
                <th className="text-left bg-gray-400 px-6 py-4">Perfil</th>
                <th className="text-left bg-gray-400 px-6 py-4">Criado em</th>
                <th className="text-left bg-gray-400 px-6 py-4">Criado por</th>
              </tr>
            </thead>

            <tbody >
              { dados.Cadastros?.length > 0 ? (
                dados.Cadastros.map((usuario, index) => (
                  <tr
                    key={index} 
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>

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
</div>
      </section>
    </main>
  );
}