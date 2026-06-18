"use client";
import useAdmin from "../../../../app/hooks/adm";
import { useState } from "react";

export default function DeletarUsuario() {
  useAdmin();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [erros, setErros] = useState({});

  async function deletar(e) {
    e.preventDefault();
    let errosValidados = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
          errosValidados.email = "O e-mail é obrigatório.";
      } else if (!emailRegex.test(email)) {
          errosValidados.email = "Insira um e-mail válido.";
      }
      if (Object.keys(errosValidados).length > 0) {
        setErros(errosValidados);
        return; 
      }
    setErros({});
    setMensagem("");
    setErro("");
    const certeza = window.confirm("Você tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.");
    if (!certeza) {
      return;
    }
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
        {erros.email && <span className="text-red-500 text-xs px-6">{erros.email}</span>}

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