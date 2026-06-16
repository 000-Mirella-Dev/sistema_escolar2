import { cookies } from "next/headers";

export async function GET() {

    const cookieStore = await cookies();

    const usuarioCookie =
        cookieStore.get("usuario");

    if (!usuarioCookie) {

        return Response.json(
            { autorizado: false },
            { status: 401 }
        );

    }

    const usuario = JSON.parse(
        decodeURIComponent(
            usuarioCookie.value
        )
    );

    if (usuario.perfil !== "ADMIN") {

        return Response.json(
            { autorizado: false },
            { status: 403 }
        );

    }

    return Response.json({
        autorizado: true,
        usuario
    });

}