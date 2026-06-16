import { cookies } from "next/headers";

export async function getUsuarioLogado() {

    const cookieStore = await cookies();

    const usuarioCookie =
        cookieStore.get("usuario");

    if (!usuarioCookie) {
        return null;
    }

    try {

        return JSON.parse(
            decodeURIComponent(
                usuarioCookie.value
            )
        );

    } catch {

        return null;

    }

}