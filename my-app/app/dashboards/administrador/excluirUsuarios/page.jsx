"use client";

import { useState } from "react";

export default function DeletarUsuario() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function deletar(e) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const res = await fetch("/api/excluirUsuarios", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.erro);
      return;
    }

    setMensagem(data.mensagem);
    setEmail("");
  }

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={deletar}
        className="flex flex-col gap-4 bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h1 className="text-xl font-bold">
          Excluir Usuário
        </h1>

        <input
          type="email"
          placeholder="Digite o email do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded"
        />

        <button className="bg-red-600 text-white p-3 rounded hover:bg-red-700">
          Excluir
        </button>

        {mensagem && (
          <p className="text-green-600 font-medium">
            {mensagem}
          </p>
        )}

        {erro && (
          <p className="text-red-600 font-medium">
            {erro}
          </p>
        )}
      </form>
    </div>
  );
}