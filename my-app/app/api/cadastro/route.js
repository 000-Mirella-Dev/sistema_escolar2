import pool from "@/lib/db";
import bcrypt from "bcrypt"; 

const senha_un_adm = "senhaADM000"
const senha_un_prof = "senhaPROF000"
export async function POST(req) {
  try {

    const {
      nome,
      email,
      senha,
      perfil,
      chaveMestra,
    } = await req.json();

const usuarioExistente =
    await pool.query(
        `
        SELECT id
        FROM usuarios
        WHERE email = $1
        `,
        [email]
    );

if (usuarioExistente.rows.length > 0) {
    return Response.json(
        {
            erro: "Este email já está cadastrado."
        },
        {
            status: 409
        }
    );
}

        if (!nome || !email || !senha) {
            return Response.json(
                {
                    erro: "Todos os campos são obrigatórios."
                },
                {
                    status: 400
                }
            );
        }

  if (
    perfil === "ADMIN" &&
    chaveMestra !== senha_un_adm
) {
    return Response.json(
        {
            erro: "Chave mestra de administrador incorreta"
        },
        {
            status: 403
        }
    );
}

if (
    perfil === "PROFESSOR" &&
    chaveMestra !== senha_un_prof
) {
    return Response.json(
        {
            erro: "Chave mestra de professor incorreta"
        },
        {
            status: 403
        }
    );
} 
if (
    (perfil === "ADMIN" || perfil === "PROFESSOR")
    && !chaveMestra
) {
    return Response.json(
        {
            erro: "Informe a chave mestra."
        },
        {
            status: 400
        }
    );
}

    const senhaCriptografada =
      await bcrypt.hash(senha, 10);
      const resultado = await pool.query (
        `
        INSERT INTO usuarios
        (nome, email, senha, perfil)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
        `,
        [
          nome,
          email,
          senhaCriptografada,
          perfil,
        ]
      );
      const novoUsuario = resultado.rows[0];

await pool.query(
  `
  INSERT INTO auditoria
  (
    usuario_id,
    tabela_afetada,
    registro_id,
    tipo_alteracao,
    descricao
  )
  VALUES
  ($1,$2,$3,$4,$5)
  `,
  [
    novoUsuario.id,
    "usuarios",
    novoUsuario.id,
    "CREATE",
    `Cadastro de usuário ${novoUsuario.nome}`
  ]
);
    return Response.json({
      mensagem:
        "Usuário cadastrado com sucesso",
         perfil: resultado.rows[0].perfil,
    });

  } catch (erro) {

    return Response.json(
      {
        erro: erro.message,
      },
      {
        status: 500,
      }
    );

  }
}