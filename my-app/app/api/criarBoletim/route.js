import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { nome, professor_id } = await req.json();

    const alunos = await pool.query(`
      SELECT id
      FROM usuarios
      WHERE perfil = 'ALUNO'
    `);

    for (const aluno of alunos.rows) {
      await pool.query(
        `
        INSERT INTO notas (
          aluno_id,
          professor_id,
          disciplina,
          nota1,
          nota2,
          nota3,
          nota4
        )
        VALUES ($1, $2, $3, NULL, NULL, NULL, NULL)
        `,
        [
          aluno.id,
          professor_id,
          nome
        ]
      );
    }

    return Response.json({
      mensagem: "Disciplina criada para todos os alunos"
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}