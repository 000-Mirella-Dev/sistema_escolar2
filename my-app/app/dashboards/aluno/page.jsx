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

      <table className="w-full border">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Nota 4</th>
          </tr>
        </thead>

        <tbody>
          {dados.notas.map((n, i) => (
            <tr key={i}>
              <td>{n.disciplina}</td>
              <td>{n.nota1 ?? "-"}</td>
              <td>{n.nota2 ?? "-"}</td>
              <td>{n.nota3 ?? "-"}</td>
              <td>{n.nota4 ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}