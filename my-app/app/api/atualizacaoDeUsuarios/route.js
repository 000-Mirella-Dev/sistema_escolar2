import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function PUT(req) {
  try {
    const { email, nome, novoEmail, senha } = await req.json();

    let senhaHash = null;

    if (senha) {
      senhaHash = await bcrypt.hash(senha, 10);
    }

    const result = await pool.query(
      `
      UPDATE usuarios
      SET 
        nome = $1,
        email = $2,
        senha = COALESCE($3, senha)
      WHERE email = $4
      RETURNING *
      `,
      [nome, novoEmail, senhaHash, email]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { erro: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: result.rows[0],
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}