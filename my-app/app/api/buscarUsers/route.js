import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const busca = searchParams.get("busca")?.trim();

    if (!busca) {
      return Response.json([]);
    }

    const resultado = await pool.query(
      `
      SELECT
        id,
        nome,
        email,
        perfil,
        criado_em,
        criado_por,
        criado_ip
      FROM usuarios
      WHERE nome::text ILIKE $1
         OR perfil::text ILIKE $1
         OR email::text ILIKE $1
      ORDER BY nome ASC
      `,
      [`%${busca}%`]
    );

    return Response.json(resultado.rows);

  } catch (erro) {
    console.error(erro);

    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}