import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, senha } = await req.json();

    const resultado = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );
    if (resultado.rows.length === 0) {
      return Response.json(
        { erro: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const usuario = resultado.rows[0];

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
 );

  if (!senhaValida) {

await pool.query(
  `
  INSERT INTO log_acesso
  (
    usuario_id,
    acao,
    ip,
    descricao
  )
  VALUES
  ($1, $2, $3, $4)
  `,
  [
    usuario.id,
    "TENTATIVA_LOGIN_INVALIDA",
    req.headers.get("x-forwarded-for") || "localhost",
    `Tentativa de login inválida para ${usuario.email}`
  ]
);
      return Response.json(
        { erro: "Senha incorreta" },
        { status: 401 }
      );
    }

    const sessionData = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    };

    const response = Response.json({
      mensagem: "Login realizado com sucesso",
      usuario: sessionData,
    });

// Cookie
    response.headers.set(
      "Set-Cookie",
      `usuario=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Strict`
    );

await pool.query(
  `
  INSERT INTO log_acesso
  (
    usuario_id,
    acao,
    ip,
    descricao
  )
  VALUES
  ($1, $2, $3, $4)
  `,
  [
    usuario.id,
    "LOGIN",
    req.headers.get("x-forwarded-for") || "localhost",
    `Login realizado por ${usuario.nome}`
  ]
);

    return response;

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