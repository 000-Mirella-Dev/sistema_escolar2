"use client";

import { useEffect, useState } from "react";

function corNota(nota) {
  return Number(nota) >= 6
    ? "text-green-600"
    : "text-red-600";
}

function calcularMedia(n) {
  const notas = [
    n.nota1,
    n.nota2,
    n.nota3,
    n.nota4,
  ];

  const validas = notas.filter(
    (nota) =>
      nota !== null &&
      nota !== "" &&
      !isNaN(Number(nota))
  );

  if (validas.length === 0) {
    return "-";
  }

  const soma = validas.reduce(
    (acc, nota) => acc + Number(nota),
    0
  );

  return (soma / validas.length).toFixed(2);
}
export default function GerenciarBoletim() {
  const [nome, setNome] = useState("");
  const [professorId, setProfessorId] = useState(1);

  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarNotas();
  }, []);

  async function carregarNotas() {
    try {
      const res = await fetch("/api/notas");
      const data = await res.json();
      setNotas(data);
    } catch {
      alert("Erro ao carregar boletim");
    }
  }

  async function criarDisciplina() {
    try {
      const response = await fetch(
        "/api/criarBoletim",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nome,
            professor_id:
              Number(professorId),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.erro);
        return;
      }

      alert(
        "Disciplina criada para todos os alunos!"
      );

      setNome("");

      carregarNotas();
    } catch {
      alert(
        "Erro ao criar disciplina"
      );
    }
  }

  function handleChange(
    id,
    campo,
    valor
  ) {
    setNotas((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              [campo]: valor,
            }
          : n
      )
    );
  }

  async function salvarAlteracoes() {
    setLoading(true);

    try {
      for (const n of notas) {
        const res = await fetch(
          "/api/editarNotas",
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              id: Number(n.id),
              nota1: Number(n.nota1),
              nota2: Number(n.nota2),
              nota3: Number(n.nota3),
              nota4: Number(n.nota4),
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          alert(data.erro);
          setLoading(false);
          return;
        }
      }

      alert(
        "Boletim atualizado com sucesso!"
      );
    } catch {
      alert(
        "Erro ao salvar alterações"
      );
    }

    setLoading(false);
  }

  return (
    <main className="p-6 space-y-8">


      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Criar Disciplina
        </h1>

        <div className="flex gap-2 flex-wrap">
          <input
            placeholder="Nome da disciplina"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Professor ID"
            value={professorId}
            onChange={(e) =>
              setProfessorId(
                e.target.value
              )
            }
            className="border p-2 rounded"
          />

          <button
            onClick={criarDisciplina}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Criar disciplina
          </button>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Boletim dos Alunos
        </h1>

        <table className="w-full border">
          <thead>
            <tr className="border-b bg-gray-100">
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
              <tr
                key={n.id}
                className="border-b"
              >
                <td className="p-2">
                  {n.aluno_nome}
                </td>

                <td className="p-2">
                  {n.disciplina}
                </td>

                <td>
                  <input
                    className={`border w-16 p-1 ${corNota(
                      n.nota1
                    )}`}
                    value={n.nota1 || ""}
                    onChange={(e) =>
                      handleChange(
                        n.id,
                        "nota1",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className={`border w-16 p-1 ${corNota(
                      n.nota2
                    )}`}
                    value={n.nota2 || ""}
                    onChange={(e) =>
                      handleChange(
                        n.id,
                        "nota2",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className={`border w-16 p-1 ${corNota(
                      n.nota3
                    )}`}
                    value={n.nota3 || ""}
                    onChange={(e) =>
                      handleChange(
                        n.id,
                        "nota3",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className={`border w-16 p-1 ${corNota(
                      n.nota4
                    )}`}
                    value={n.nota4 || ""}
                    onChange={(e) =>
                      handleChange(
                        n.id,
                        "nota4",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td
                  className={`text-center font-bold ${corNota(
                    calcularMedia(n)
                  )}`}
                >
                  {calcularMedia(n)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={salvarAlteracoes}
          disabled={loading}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Salvando..."
            : "Salvar alterações"}
        </button>
      </div>
    </main>
  );
}