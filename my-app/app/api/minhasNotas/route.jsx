import pool from "@/lib/db";

export async function GET(req) {
  try {

    const cookie = req.headers.get("cookie");

    const usuario = JSON.parse(
      decodeURIComponent(
        cookie.split("usuario=")[1].split(";")[0]
      )
    );

    const alunoId = usuario.id;

    const result = await pool.query(
      `
      SELECT disciplina, nota1, nota2, nota3, nota4
      FROM notas
      WHERE aluno_id = $1
      `,
      [alunoId]
    );

    return Response.json({
      aluno: usuario.nome,
      notas: result.rows,
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (erro) {
    return Response.json(
      { erro: "Não autenticado ou cookie inválido" },
      { status: 401 }
    );
  }
}