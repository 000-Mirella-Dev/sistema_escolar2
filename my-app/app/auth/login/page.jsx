"use client";

import { useState } from "react";
import FormInput from "../../components/formInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function fazerLogin(e) {

        e.preventDefault();

        try {

            const resposta = await fetch("../../api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.erro || "Erro ao fazer login");
                return;
            }

            alert("Login realizado com sucesso!");

            if (dados.usuario.perfil === "ADMIN") {
                router.push("/dashboards/administrador");
            } else if (dados.usuario.perfil === "PROFESSOR") {
                router.push("/dashboards/professor");
            } else {
                router.push("/dashboards/aluno");
            }

        } catch {
            alert("Erro ao conectar com o servidor");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="w-full max-w-md">

                <div className="flex flex-col items-center mb-10">

                    <i className="bi bi-box-arrow-in-right text-blue-400 text-8xl"></i>

                    <h2 className="text-3xl font-semibold mt-4">
                        Entrar
                    </h2>

                    <p className="text-gray-500 text-sm mt-2">
                        Faça login para acessar sua conta
                    </p>

                </div>

                <form
                    onSubmit={fazerLogin}
                    className="flex flex-col gap-2"
                >

                    <FormInput
                        nameLabel="Email"
                        id="id-email"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <FormInput
                        nameLabel="Senha"
                        id="id-senha"
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="mt-6 h-12 rounded-2xl bg-gray-900 text-white hover:opacity-90 transition"
                    >
                        Entrar
                    </button>

                    <div className="text-center text-gray-600 mt-6">
                        Ainda não possui uma conta?

                        <Link
                            href="/auth/cadastro"
                            className="ml-1 text-emerald-700 hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </div>

                </form>

            </section>
        </main>
    );
}