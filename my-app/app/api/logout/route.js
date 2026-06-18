import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function POST() {
  try {

    const cookieStore = await cookies();

    const cookieUsuario =
      cookieStore.get("usuario");

    if (cookieUsuario) {

      const usuario = JSON.parse(
        decodeURIComponent(
          cookieUsuario.value
        )
      );

      try {
        await pool.query(
          `
          INSERT INTO log_acesso
          (
            usuario_id,
            acao,
            ip,
            descricao
          )
          VALUES
          ($1,$2,$3,$4)
          `,
          [
            usuario.id,
            "LOGOUT",
            "localhost",
            `Logout realizado por ${usuario.nome}`
          ]
        );
      } catch (erroLog) {
        console.error(
          "Erro ao registrar logout:",
          erroLog
        );
      }
    }

    const response = NextResponse.json({
      ok: true,
    });

    response.cookies.set("usuario", "", {
      path: "/",
      expires: new Date(0),
    });

    return response;

  } catch (erro) {

    return NextResponse.json(
      {
        erro: erro.message,
      },
      {
        status: 500,
      }
    );

  }
}