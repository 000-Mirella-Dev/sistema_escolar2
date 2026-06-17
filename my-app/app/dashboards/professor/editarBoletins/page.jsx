"use client";
import useProf from "../../../hooks/prof";
import { useEffect, useState } from "react";


function corNota(nota) {
  return Number(nota) >= 6 ? "text-green-600" : "text-red-600";
}
function calcularMedia(n) {
  const notas = [
    Number(n.nota1),
    Number(n.nota2),
    Number(n.nota3),
    Number(n.nota4),
  ];

  const validas = notas.filter((v) => !isNaN(v));

  if (validas.length === 0) return 0;

  const soma = validas.reduce((acc, val) => acc + val, 0);

  return (soma / validas.length).toFixed(2);
}
export default function Boletim() {
  useProf()
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  async function carregar() {
    const res = await fetch("/api/editarNotas");

    const data = await res.json();

    setNotas(data);
  }

  carregar();
}, []);

  function handleChange(id, campo, valor) {
    setNotas((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, [campo]: valor } : n
      )
    );
  }
  async function salvarAlteracoes() {
    setLoading(true);

    try {
      for (const n of notas) {
        const res = await fetch("/api/editarNotas", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Number(n.id),
            nota1: Number(n.nota1),
            nota2: Number(n.nota2),
            nota3: Number(n.nota3),
            nota4: Number(n.nota4),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.erro);
          setLoading(false);
          return;
        }
      }

      alert("Boletim atualizado com sucesso!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (erro) {
      alert("Erro ao salvar alterações");
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Boletim dos Alunos
      </h1>

      <table className="w-full border mb-4">
        <thead>
          <tr className="border-b">
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Nota 4</th>
            <th>Média Final</th>
          </tr>
        </thead>

        <tbody>
          {notas.map((n) => (
            <tr key={n.id} className="border-b">
              <td className="p-2">{n.aluno_nome}</td>
              <td className="p-2">{n.disciplina}</td>

              <td>
                <input
                 className={`border w-16 p-1 ${corNota(n.nota1)}`}
                  value={n.nota1 || ""}
                  onChange={(e) =>
                    handleChange(n.id, "nota1", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                 className={`border w-16 p-1 ${corNota(n.nota2)}`}
                  value={n.nota2 || ""}
                  onChange={(e) =>
                    handleChange(n.id, "nota2", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                 className={`border w-16 p-1 ${corNota(n.nota3)}`}
                  value={n.nota3 || ""}
                  onChange={(e) =>
                    handleChange(n.id, "nota3", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                 className={`border w-16 p-1 ${corNota(n.nota4)}`}
                  value={n.nota4 || ""}
                  onChange={(e) =>
                    handleChange(n.id, "nota4", e.target.value)
                  }
                />
              </td>
     <td className={`border w-16 p-1 ${corNota(calcularMedia(n))}`}>
  {calcularMedia(n)}
</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={salvarAlteracoes}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar alterações"}
      </button>
    </div>
  );
}