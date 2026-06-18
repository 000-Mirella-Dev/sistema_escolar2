"use client";
import useAdmin from "../../../../app/hooks/adm";
import { useState } from "react";

export default function EditarUsuario() {
  useAdmin();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});

  async function salvar(e) {
    e.preventDefault();
    let errosValidados = {}
        if (!nome.trim()){
            errosValidados.nome = "O nome é obrigatório."
        } else if (nome.trim().length < 3) {
            errosValidados.nome = "O nome deve ter pelo menos 3 caracteres."
        }
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
      {erros.email && <span className="text-red-500 text-xs px-6">{erros.email}</span>}
      

      <input
        placeholder="Novo nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 rounded"
      />
      {erros.nome && <span className="text-red-500 text-xs px-6">{erros.nome}</span>}

      <input
        placeholder="Novo email (opcional)"
        value={novoEmail}
        onChange={(e) => setNovoEmail(e.target.value)}
        className="border p-2 rounded"
      />
      {erros.novoEmail && <span className="text-red-500 text-xs px-6">{erros.novoEmail}</span>}

      <input
        type="password"
        placeholder="Nova senha (opcional)"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 rounded"
      />
      {erros.senha && <span className="text-red-500 text-xs px-6">{erros.senha}</span>}

      <button className="bg-blue-600 text-white p-2 rounded">
        Atualizar
      </button>
    </form>
    </section>
    </main>
  );
}

