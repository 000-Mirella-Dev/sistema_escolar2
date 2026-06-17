import pool from "../../../lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        nome,
        email,
        perfil,
        criado_em,
        criado_por,
        criado_ip
      FROM usuarios
      ORDER BY nome ASC
    `);

    return Response.json(result.rows);

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}