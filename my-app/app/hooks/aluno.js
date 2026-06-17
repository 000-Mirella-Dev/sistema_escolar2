"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAluno() {

    const router = useRouter();

    useEffect(() => {

        async function verificar() {

            const resposta =
                await fetch("/api/verificaraluno");

            if (!resposta.ok) {

                router.push("/acessoNegado");

            }

        }

        verificar();

    }, [router]);

}