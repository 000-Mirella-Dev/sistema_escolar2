import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function PUT(req) {
  try {
    const { email, nome, novoEmail, senha } = await req.json();

    const usuarioAtual = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    if (usuarioAtual.rowCount === 0) {
      return Response.json(
        { erro: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const dadosAntigos = usuarioAtual.rows[0];

    const nomeFinal =
      nome?.trim() || dadosAntigos.nome;

    const emailFinal =
      novoEmail?.trim() || dadosAntigos.email;

    let senhaHash = null;

    if (senha?.trim()) {
      senhaHash = await bcrypt.hash(
        senha,
        10
      );
    }

    const result = await pool.query(
      `
      UPDATE usuarios
      SET
        nome = $1,
        email = $2,
        senha = COALESCE($3, senha)
      WHERE email = $4
      RETURNING *
      `,
      [
        nomeFinal, emailFinal, senhaHash, email
      ]
    );

    const cookieStore = await cookies();

    const cookieUsuario =
      cookieStore.get("usuario");

    if (cookieUsuario) {
      const usuarioLogado = JSON.parse(
        decodeURIComponent(
          cookieUsuario.value
        )
      );
      const alteracoes = [];

      if (dadosAntigos.nome !== nomeFinal) {
        alteracoes.push(
          `nome: "${dadosAntigos.nome}" → "${nomeFinal}"`
        );
      }

      if (dadosAntigos.email !== emailFinal) {
        alteracoes.push(
          `email: "${dadosAntigos.email}" → "${emailFinal}"`
        );
      }

      if (senha?.trim()) {
        alteracoes.push("senha alterada");
      }

      if (alteracoes.length > 0) {
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
            usuarioLogado.id,
            "usuarios",
            result.rows[0].id,
            "UPDATE",
            `Administrador ${usuarioLogado.nome} alterou: ${alteracoes.join(", ")}`
          ]
        );
      }
    }
    return Response.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: result.rows[0],
    });

  } catch (erro) {
    return Response.json(
      {
        erro: erro.message,
      },
      {
        status: 500,
      }
    );
  }
}