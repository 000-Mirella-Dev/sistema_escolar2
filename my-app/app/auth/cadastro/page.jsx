"use client";
import { useState } from "react";
import FormInput from "../../components/formInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cadastro() {
    const router = useRouter();
    const [perfil, setPerfil] = useState("ALUNO");
    const [abrirPerfil, setAbrirPerfil] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [chaveMestra, setChaveMestra] = useState("");

    async function fazerCadastro(e) {
        e.preventDefault();

        try {
            const resposta = await fetch("/api/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    perfil,
                    chaveMestra,
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao cadastrar");
                return;
            }

            alert(dados.mensagem);

            if (resposta.ok) {
                router.push("@/login")
            }

            alert(dados.mensagem);
        } catch {
            alert("Erro ao conectar com o servidor");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <i className="bi bi-person-circle text-blue-400 text-8xl"></i>

                    <h2 className="text-3xl font-semibold mt-4">Cadastre-se</h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Crie sua conta para continuar
                    </p>
                </div>

                <form onSubmit={fazerCadastro} className="flex flex-col gap-2">
                    <div className="relative mx-6">
                        <button
                            type="button"
                            onClick={() => setAbrirPerfil(!abrirPerfil)}
                            className="w-full h-10 border-b-2 border-gray-300 flex items-center justify-between text-gray-700"
                        >
                            <span>
                                Perfil: {perfil === "ALUNO" ? "Aluno" : perfil === "PROFESSOR" ? "Professor" : "Administrador"}
                            </span>

                            <i
                                className={`bi ${abrirPerfil ? "bi-chevron-up" : "bi-chevron-down"}`}
                            />
                        </button>

                        {abrirPerfil && (
                            <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-md overflow-hidden">

                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                    onClick={() => {
                                        setPerfil("PROFESSOR");
                                        setAbrirPerfil(false);
                                    }}
                                >
                                    Professor
                                </button>

                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                    onClick={() => {
                                        setPerfil("ADMIN");
                                        setAbrirPerfil(false);
                                    }}
                                >
                                    Administrador
                                </button>
                            </div>
                        )}
                    </div>

                    <input type="hidden" name="perfil" value={perfil} />

                    <FormInput
                        nameLabel="Nome"
                        id="id-nome"
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <FormInput
                        nameLabel="Email"
                        id="id-email"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        nameLabel="Senha"
                        id="id-senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {perfil !== "ALUNO" && (
                        <FormInput
                            nameLabel="Chave Mestra"
                            id="id-chave"
                            type="password"
                            placeholder="Digite a chave"
                            value={chaveMestra}
                            onChange={(e) => setChaveMestra(e.target.value)}
                        />
                    )}

                    <button
                        type="submit"
                        className="mt-6 h-12 rounded-2xl bg-gray-900 text-white hover:opacity-90 transition"
                    >
                        Cadastrar
                    </button>

                    <div className="text-center text-gray-600 mt-6">
                        Já possui uma conta?
                        <Link href="/auth/login" className="ml-1 text-emerald-700 hover:underline">
                            Entrar
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    );
}
