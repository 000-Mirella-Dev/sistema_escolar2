import pool from "@/lib/db";

export async function GET() {
  try {

    const resultado = await pool.query(`
      SELECT
        a.id,
        a.tabela_afetada,
        a.registro_id,
        a.tipo_alteracao,
        a.descricao,
        a.data_hora,
        u.nome AS usuario_nome,
        u.email AS usuario_email
    FROM auditoria a
      INNER JOIN usuarios u
        ON u.id = a.usuario_id
      ORDER BY a.data_hora DESC
    `);

 return Response.json(resultado.rows);

  } catch (erro) {

    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );

  }
}