"use client";
import useAdmin from "../../../../app/hooks/adm";
import { useState } from "react";

export default function EditarUsuario() {
  useAdmin();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function salvar(e) {
    e.preventDefault();

    const res = await fetch("/api/atualizacaoDeUsuarios", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,  
        nome,
        novoEmail,  
        senha: senha || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.erro);
      return;
    }

    alert("Usuário atualizado com sucesso!");
  }

  return (
     <main className=" pt-20 flex flex-col text-center items-center mb-10 justify-center">
<section className="w-full max-w-md">

    <form
      onSubmit={salvar}
      className="flex flex-col gap-3 max-w-md bg-white p-6 rounded shadow"
    >
      <h1 className="text-xl font-bold">
        Editar Usuário (por email)
      </h1>

      <input
        placeholder="Email atual do usuário"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Novo nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Novo email (opcional)"
        value={novoEmail}
        onChange={(e) => setNovoEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Nova senha (opcional)"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 rounded"
      />

      <button className="bg-blue-600 text-white p-2 rounded">
        Atualizar
      </button>
    </form>
    </section>
    </main>
  );
}