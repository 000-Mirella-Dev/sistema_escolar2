import pool from "@/lib/db";
import { cookies } from "next/headers";


export async function GET() {
  const cookieStore = await cookies();

  const usuario = JSON.parse(
    decodeURIComponent(
      cookieStore.get("usuario").value
    )
  );

  const professorId = usuario.id;

  const result = await pool.query(
    `
    SELECT *
    FROM notas
    WHERE professor_id = $1
    `,
    [professorId]
  );

  return Response.json(result.rows);
}
export async function PUT(req) {
  try {
    let {
      id,
      nota1,
      nota2,
      nota3,
      nota4,
    } = await req.json();

    nota1 = nota1 === "" ? null : nota1;
    nota2 = nota2 === "" ? null : nota2;
    nota3 = nota3 === "" ? null : nota3;
    nota4 = nota4 === "" ? null : nota4;

    const check = await pool.query(
      `SELECT * FROM notas WHERE id = $1`,
      [id]
    );

    if (check.rowCount === 0) {
      return Response.json(
        { erro: "Nota não encontrada" },
        { status: 404 }
      );
    }

    const result = await pool.query(
      `
      UPDATE notas
      SET
        nota1 = $1,
        nota2 = $2,
        nota3 = $3,
        nota4 = $4
      WHERE id = $5
      RETURNING *
      `,
      [nota1, nota2, nota3, nota4, id]
    );

    return Response.json({
      
      mensagem: "Notas atualizadas com sucesso",
      nota: result.rows[0],
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}