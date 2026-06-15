import pool from "@/lib/db";

export async function DELETE(req) {
  try {
    const { email } = await req.json();

    const result = await pool.query(
      `
      DELETE FROM usuarios
      WHERE email = $1
      RETURNING email
      `,
      [email]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { erro: "Email não encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      mensagem: `Usuário ${email} excluído com sucesso`,
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}