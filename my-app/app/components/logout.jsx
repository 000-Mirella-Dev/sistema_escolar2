

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("../api/logout", {
      method: "POST",
    });

    router.push("/");
  }

  return (
<button onClick={logout} type="button" className="text-white bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-sm">↩ Log-out</button>

  );
}