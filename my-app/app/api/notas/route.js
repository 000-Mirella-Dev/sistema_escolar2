import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        n.id,
        n.disciplina,
        n.nota1,
        n.nota2,
        n.nota3,
        n.nota4,
        n.criadoEm,
        u.nome AS aluno_nome
      FROM notas n
      JOIN usuarios u ON u.id = n.aluno_id
      ORDER BY n.criadoEm DESC
    `);

    return Response.json(result.rows);
  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}