
import Link from "next/link";
export default function AcessoNegado() {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center border border-red-100">

        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-4xl">⛔</span>
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Acesso Negado
        </h1>

        <p className="text-gray-600 mb-8">
          Você não possui permissão para acessar essa página.
        </p>

        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Voltar para o início
        </Link>

      </div>
    </div>
  );
}