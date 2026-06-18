import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const cookie = cookieStore.get("usuario");

    if (!cookie) {
      return Response.json(
        { erro: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const usuario = JSON.parse(
      decodeURIComponent(cookie.value)
    );

    return Response.json({
      autenticado: true,
      usuario,
    });

  } catch {
    return Response.json(
      { erro: "Sessão inválida" },
      { status: 401 }
    );
  }
}