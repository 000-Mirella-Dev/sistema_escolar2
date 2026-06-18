"use client";
import LogoutButton from "@/app/components/logout";
import { useEffect, useState } from "react";
import useAluno from "../../hooks/aluno"
import { useRouter } from "next/navigation";
export default function MinhasNotas() {
  useAluno();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
function corNota(nota) {
  return Number(nota) >= 6
    ? "text-green-600 font-semibold"
    : "text-red-600 font-semibold";
}
function calcularMedia(n) {
  const notas = [
    n.nota1,
    n.nota2,
    n.nota3,
    n.nota4,
  ];
  const validas = notas.filter(
    (v) =>
      v !== null &&
      v !== undefined &&
      v !== ""
  );
  if (validas.length === 0) {
    return "-";
  }
  const soma = validas.reduce(
    (acc, val) => acc + Number(val),
    0
  );
  return (soma / validas.length).toFixed(2);
}
  useEffect(() => {
    async function carregar() {
      const res = await fetch("/api/minhasNotas");
      const data = await res.json();

      setDados(data);
      setLoading(false);
    }

    carregar();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (dados?.erro) {
    return <p className="text-red-600">{dados.erro}</p>;
  }
  return (
    <div>
<header className="bg-linear-to-tr from-blue-700 to-sky-400 text-white p-6 pr-20 shadow flex items-center justify-between">
  <h1 className="text-3xl font-bold">
    Bem-vindo, {dados.aluno}
  </h1>
<button className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-sm"type="button" onClick={() => router.push('/auth/tabelaUsuarios')}>Pesquisar Usuários</button>


  <LogoutButton/>
</header>

<div className= " mt-10 rounded-lg overflow-hidden border-2 border-gray-400">
      <table className="w-full">
<thead>
  <tr className="bg-gray-400">
    <th className="p-4 text-left font-semibold">
      Disciplina
    </th>
    <th className="p-4 text-center font-semibold">
      Nota 1
    </th>
    <th className="p-4 text-center font-semibold">
      Nota 2
    </th>
    <th className="p-4 text-center font-semibold">
      Nota 3
    </th>
    <th className="p-4 text-center font-semibold">
      Nota 4
    </th>
    <th className="p-4 text-center font-semibold">
      Média Final
    </th>
  </tr>
</thead>

 <tbody>
  {dados.notas.map((n, i) => (
    <tr
      key={i}
      className={`
        ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}
        hover:bg-blue-50
        transition-colors
      `}
    >
      <td className="p-4 text-left">
        {n.disciplina}
      </td>

      <td className="p-4 text-center">
        {n.nota1 ?? "-"}
      </td>

      <td className="p-4 text-center">
        {n.nota2 ?? "-"}
      </td>

      <td className="p-4 text-center">
        {n.nota3 ?? "-"}
      </td>

      <td className="p-4 text-center">
        {n.nota4 ?? "-"}
      </td>

      <td
        className={`p-4 text-center ${corNota(
          calcularMedia(n)
        )}`}
      >
        {calcularMedia(n)}
      </td>
    </tr>
  ))}
</tbody>
      </table>

    </div>
    </div>
  );
}