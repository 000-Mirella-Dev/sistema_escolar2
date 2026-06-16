import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const busca = searchParams.get("busca");

    let queryText = "";
    let queryParams = [];

    if (busca && busca.trim() !== "") {
      queryText = `
        SELECT id, nome, email, perfil, criado_em, criado_por, criado_ip
        FROM usuarios
        WHERE nome ILIKE $1 OR perfil ILIKE $1 OR email ILIKE $1
        ORDER BY nome ASC
      `;
      queryParams = [`%${busca}%`];
    } else {
      queryText = `
        SELECT id, nome, email, perfil, criado_em, criado_por, criado_ip
        FROM usuarios
        ORDER BY nome ASC
      `;
    }

    const result = await pool.query(queryText, queryParams);

    return Response.json(result.rows);

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}