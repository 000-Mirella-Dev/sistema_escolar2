import pool from "@/lib/db";

export async function GET() {
  try {
const resultado = await pool.query(`
      SELECT
        l.id,
        l.acao,
        l.descricao,
        l.ip,
        l.data_hora,
        u.nome,
        u.email,
        u.perfil
      FROM log_acesso l
      INNER JOIN usuarios u
        ON u.id = l.usuario_id
      ORDER BY l.data_hora DESC
    `);

 return Response.json(resultado.rows);

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
       { status: 500 }
    );

  }
}