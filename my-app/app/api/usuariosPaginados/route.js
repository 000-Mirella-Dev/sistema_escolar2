import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const paginaAlvo = parseInt(searchParams.get("pagina")) || 1;
    const busca = searchParams.get("busca")?.trim();

    // Contagem total
    let countQuery = "SELECT COUNT(*) AS total FROM usuarios";
    let queryParams = [];

    if (busca) {
      const whereClause = ` WHERE nome::text ILIKE $1 OR perfil::text ILIKE $1 OR email::text ILIKE $1`;
      countQuery += whereClause;
      queryParams.push(`%${busca}%`);
    }

    const countResult = await pool.query(countQuery, queryParams);
    const totalUsuarios = parseInt(countResult.rows[0].total);

    // Cálculo de paginação
    const maxDivisoes = 10;
    let limite = 20;
    if (totalUsuarios > 200) {
      limite = Math.ceil(totalUsuarios / maxDivisoes);
    }

    const totalPaginas = Math.max(1, Math.ceil(totalUsuarios / limite));
    const pagina = Math.min(Math.max(1, paginaAlvo), totalPaginas);
    const offsetCalculado = (pagina - 1) * limite;

    // Query dos dados
    let dataQuery = `
      SELECT id, nome, email, perfil, criado_em, criado_por
      FROM usuarios
    `;
    let dataParams = [];

    if (busca) {
      dataQuery += ` WHERE nome::text ILIKE $1 OR perfil::text ILIKE $1 OR email::text ILIKE $1`;
      dataParams.push(`%${busca}%`);
      dataQuery += ` ORDER BY nome ASC LIMIT $2 OFFSET $3`;
      dataParams.push(limite, offsetCalculado);
    } else {
      dataQuery += ` ORDER BY nome ASC LIMIT $1 OFFSET $2`;
      dataParams.push(limite, offsetCalculado);
    }

    const result = await pool.query(dataQuery, dataParams);

    return Response.json({
      usuarios: result.rows,
      total: totalUsuarios,
      pagina,
      totalPaginas,
      limite,
    });
  } catch (erro) {
    console.error(erro);
    return Response.json({ erro: erro.message }, { status: 500 });
  }
}
