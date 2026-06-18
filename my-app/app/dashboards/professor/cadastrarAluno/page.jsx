"use client";
import {useState} from "react";
import useProf from "../../../../app/hooks/prof";
export default function CriarUsuario(){
    useProf();
    const [nome, setNome] = useState("");
    const[email, setEmail] = useState("")
    const [senha, setSenha] = useState("");
    const [criado_por, setCriadopor] = useState("");
    const [perfil, setPerfil] = useState("ALUNO");
    const [erros, setErros] = useState({})

    async function cadastrar(e) {
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

        if (!senha) {
            errosValidados.senha = "A senha é obrigatória.";
        } else if (senha.length < 6) {
            errosValidados.senha = "A senha deve ter pelo menos 6 caracteres.";
        }
        if (!criado_por){
            errosValidados.criado_por = "È necessario digitar o nome de quem está cadastrando"
        }
        if (Object.keys(errosValidados).length > 0) {
            setErros(errosValidados);
            return; 
        }

        setErros({});

        const resposta = await fetch(
            "/api/usuarios",
            { method : "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome, 
                    email,
                      senha,
                     perfil,
                     criado_por
                }),
            }
        );

        const dados = await resposta.json()
        if(!resposta.ok) {
            alert(dados.erro);
            return;
        }
alert ("usuário cadastrado")
    }
return (
    <main className="flex flex-col text-center items-center mb-10 justify-center">
                    <section className="w-full max-w-md">

<h1 className=" p-10 align-center mb-4 text-xl font-bold text-heading md:text-xl lg:text-xl"> Cadastre um <span className=" text-transparent bg-clip-text bg-linear-to-r to-blue-800 from-sky-400">Novo aluno</span></h1>


        <form
            onSubmit={cadastrar}
            className="flex flex-col gap-4 max-w-md"
        >

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border p-3 rounded" />
            {erros.nome && <span className="text-red-500 text-xs px-6">{erros.nome}</span>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 rounded" />
            {erros.email && <span className="text-red-500 text-xs px-6">{erros.email}</span>}

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border p-3 rounded" />
            {erros.senha && <span className="text-red-500 text-xs px-6">{erros.senha}</span>}

{           <input
                name="criado_por"
                placeholder="Seu nome (quem está cadastrando)"
                value={criado_por}
                onChange={(e) => setCriadopor(e.target.value)}
                className="w-full p-2 border mb-4 rounded"/>}
            {erros.criado_por && <span className="text-red-500 text-xs px-6">{erros.criado_por}</span>}    
            <select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                className="border p-3 rounded"
            >
                <option value="ALUNO">
                    Aluno
                </option>
            </select>

            <button
                className="bg-blue-600 text-white p-3 rounded"
            >
                Cadastrar
            </button>

        </form>
</section>
    </main>
    
    );
}