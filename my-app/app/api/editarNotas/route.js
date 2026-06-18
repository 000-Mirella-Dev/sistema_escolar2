import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const usuario = JSON.parse(
      decodeURIComponent(
        cookieStore.get("usuario").value
      )
    );

    const professorId = usuario.id;

    const result = await pool.query(
      `
      SELECT
        n.id,
        n.aluno_id,
        n.professor_id,
        n.disciplina,
        n.nota1,
        n.nota2,
        n.nota3,
        n.nota4,
        n.criadoem,
        u.nome AS aluno_nome
      FROM notas n
      INNER JOIN usuarios u
        ON u.id = n.aluno_id
      WHERE n.professor_id = $1
      ORDER BY u.nome
      `,
      [professorId]
    );

    return Response.json(result.rows);

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
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
      `
      SELECT *
      FROM notas
      WHERE id = $1
      `,
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

    try {
      const cookieStore = await cookies();

      const usuario = JSON.parse(
        decodeURIComponent(
          cookieStore.get("usuario").value
        )
      );

      await pool.query(
        `
        INSERT INTO auditoria
        (
          usuario_id,
          tabela_afetada,
          registro_id,
          tipo_alteracao,
          descricao
        )
        VALUES
        ($1,$2,$3,$4,$5)
        `,
        [
          usuario.id,
          "notas",
          id,
          "UPDATE",
          `Professor ${usuario.nome} alterou as notas do registro ${id}`
        ]
      );
    } catch (erroAuditoria) {
      console.error(
        "Erro ao registrar auditoria:",
        erroAuditoria
      );
    }
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