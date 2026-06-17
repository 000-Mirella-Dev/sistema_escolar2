import Link from "next/link";

export default function Side_Bar({ aberta, fechar }) {
  return (
    <>
      {aberta && (
        <>
          <div
            onClick={fechar}
            className="fixed inset-0 bg-black/40"
          />

          <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-950 text-blue-200 z-50">
            
            <div className="flex justify-center p-5">
            <div className="size-30 bg-blue-100 rounded-full"></div>
            </div>
            <div className="bg-blue-900 p-4 border-b border-b-blue-400 w-100 h-30">
              <p className="text-sm text-blue-300">Logado como:</p>
              <h2 className="font-bold text-lg">Professor</h2>
            </div>

            <nav className="p-4 mt-20">
              <ul className="space-y-4">
                <li>
                  <Link href="/turma">Turma</Link>
                </li>
                <li>
                  <Link href="/notas">Notas</Link>
                </li>
                <li>
                  <Link href="funcoes_usuario/professores">Professores</Link>
                </li>
                <li>
                  <Link href="/disciplinas">Disciplinas</Link>
                </li>
              </ul>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}