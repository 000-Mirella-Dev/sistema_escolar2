"use client";
import LogoutButton from "@/app/components/logout";
import { useEffect, useState } from "react";

export default function MinhasNotas() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Bem-vindo, {dados.aluno}
      </h1>
      <LogoutButton/>

<div className= " mt-10 rounded-lg overflow-hidden border-2 border-gray-400">
      <table className="w-full">
        <thead>
          <tr className="overflow-x-auto rounded-t-xl border-gray-200 shadow-md m-5">
            <th className="bg-gray-400 p-3">Disciplina</th>
            <th className="bg-gray-400">Nota 1</th>
            <th className="bg-gray-400">Nota 2</th>
            <th className="bg-gray-400">Nota 3</th>
            <th className="bg-gray-400">Nota 4</th>
          </tr>
        </thead>

        <tbody>
          {dados.notas.map((n, i) => (
            <tr key={i}  
            className={i % 2 === 0 ? "bg-white" : "bg-gray-200"}>
              <td className="p-3 pl-6">{n.disciplina}</td>
              <td className="p-3">{n.nota1 ?? "-"}</td>
              <td className="p-3">{n.nota2 ?? "-"}</td>
              <td className="p-3">{n.nota3 ?? "-"}</td>
              <td className="p-3">{n.nota4 ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
}