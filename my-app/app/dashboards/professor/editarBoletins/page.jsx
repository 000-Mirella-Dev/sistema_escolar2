"use client";
import useProf from "@/app/hooks/prof";
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
  useProf();
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({});

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
    if (erros[id]) {
      setErros((prev) => {
        const novosErros = { ...prev };
        delete novosErros[id];
        return novosErros;
      });
    }
  }

  async function salvarAlteracoes(e) {
    e.preventDefault();
    let errosValidados = {};

    for (const n of notas) {
      const n1 = Number(n.nota1);
      const n2 = Number(n.nota2);
      const n3 = Number(n.nota3);
      const n4 = Number(n.nota4);

      if (n1 < 0 || n2 < 0 || n3 < 0 || n4 < 0) {
        errosValidados[n.id] = "As notas não podem ser negativas.";
      } else if (n1 > 10 || n2 > 10 || n3 > 10 || n4 > 10) {
        errosValidados[n.id] = "As notas não podem ser maiores que 10.";
      }
    }

    if (Object.keys(errosValidados).length > 0) {
      setErros(errosValidados);
      alert("Por favor, corrija as notas inválidas antes de salvar.");
      return;
    }

    setErros({});
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
      <h1 className="text-2xl font-bold mb-4">Boletim dos Alunos</h1>

      <table className="w-full border mb-4 text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2">Aluno</th>
            <th className="p-2">Disciplina</th>
            <th className="p-2">Nota 1</th>
            <th className="p-2">Nota 2</th>
            <th className="p-2">Nota 3</th>
            <th className="p-2">Nota 4</th>
            <th className="p-2">Média Final</th>
          </tr>
        </thead>

        <tbody>
          {notas.map((n) => (
            <tr key={n.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                {n.aluno_nome}
                {erros[n.id] && (
                  <div className="text-red-500 text-xs mt-1 font-medium">
                    {erros[n.id]}
                  </div>
                )}
              </td>
              <td className="p-2">{n.disciplina}</td>

              <td className="p-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className={`border w-16 p-1 rounded ${corNota(n.nota1)}`}
                  value={n.nota1 ?? ""}
                  onChange={(e) => handleChange(n.id, "nota1", e.target.value)}
                />
              </td>

              <td className="p-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className={`border w-16 p-1 rounded ${corNota(n.nota2)}`}
                  value={n.nota2 ?? ""}
                  onChange={(e) => handleChange(n.id, "nota2", e.target.value)}
                />
              </td>

              <td className="p-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className={`border w-16 p-1 rounded ${corNota(n.nota3)}`}
                  value={n.nota3 ?? ""}
                  onChange={(e) => handleChange(n.id, "nota3", e.target.value)}
                />
              </td>

              <td className="p-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className={`border w-16 p-1 rounded ${corNota(n.nota4)}`}
                  value={n.nota4 ?? ""}
                  onChange={(e) => handleChange(n.id, "nota4", e.target.value)}
                />
              </td>

              <td className={`p-2 font-bold ${corNota(calcularMedia(n))}`}>
                {calcularMedia(n)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={salvarAlteracoes}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Salvando..." : "Salvar alterações"}
      </button>
    </div>
  );
}