"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await fetch("/api/verificarLogin");

        if (!res.ok) {
          router.push("/acessoNegado");
        }
      } catch {
        router.push("/acessoNegado");
      }
    };
    verificar();
  }, [router]);
}