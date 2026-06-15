import pool from "@/lib/db";

export async function GET(req) {
  try {
    const cookie = req.headers.get("cookie");

    if (!cookie) {
      return Response.json(
        { erro: "Não autenticado" },
        { status: 401 }
      );
    }

    const match = cookie
      .split("usuario=")[1]
      ?.split(";")[0];

    if (!match) {
      return Response.json(
        { erro: "Cookie inválido" },
        { status: 401 }
      );
    }

    const usuario = JSON.parse(decodeURIComponent(match));

    const alunoId = usuario.id;

    const notas = await pool.query(
      `
      SELECT
        disciplina,
        nota1,
        nota2,
        nota3,
        nota4
      FROM notas
      WHERE aluno_id = $1
      `,
      [alunoId]
    );

    return Response.json({
      aluno: usuario.nome,
      notas: notas.rows,
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}