
import Boletim from "@/app/components/criarBoletim"
import { useState } from "react";

export default function CriarDisciplina() {

  const [nome, setNome] = useState("");
  const [professorId, setProfessorId] = useState(1);

  async function criar() {
    const response = await fetch("/api/criarBoletim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        professor_id: Number(professorId),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro);
      return;
    }

    alert("Disciplina criada para todos os alunos!");
    setNome("");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Criar Disciplina
      </h1>

      <input
        placeholder="Nome da disciplina"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2"
      />

      <input
        placeholder="Professor ID"
        value={professorId}
        onChange={(e) => setProfessorId(e.target.value)}
        className="border p-2 ml-2"
      />

      <button
        onClick={criar}
        className="bg-blue-600 text-white px-4 py-2 ml-2"
      >
        Criar disciplina
      </button>

      <Boletim/>
    </div>
  );
}