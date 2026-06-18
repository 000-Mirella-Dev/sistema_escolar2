

import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function DELETE(req) {
  try {

    const { email } = await req.json();

    const cookieStore = await cookies();

    const admin = JSON.parse(
      decodeURIComponent(
        cookieStore.get("usuario").value
      )
    );

    const usuario = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    if (usuario.rowCount === 0) {
      return Response.json(
        { erro: "Email não encontrado" },
        { status: 404 }
      );
    }

    const usuarioExcluido = usuario.rows[0];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await pool.query(
      `
      DELETE FROM usuarios
      WHERE email = $1
      RETURNING *
      `,
      [email]
    );

    try {
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
          admin.id,
          "usuarios",
          usuarioExcluido.id,
          "DELETE",
          `${admin.nome} excluiu o usuário ${usuarioExcluido.nome} (${usuarioExcluido.email})`
        ]
      );
    } catch (erroAuditoria) {
      console.error(
        "Erro ao registrar auditoria:",
        erroAuditoria
      );
    }

    return Response.json({
      mensagem: `Usuário ${email} excluído com sucesso`,
    });

  } catch (erro) {

    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );

  }
}