import Link from 'next/link'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
import { Poppins } from "next/font/google";
export default function Hero(){
    return (
  <section className="min-h-screen flex flex-col lg:flex-row">
    <div className="relative flex items-center w-full lg:w-1/2 bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 px-8 lg:px-20 py-20">

      <div className="max-w-xl z-10">

        <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-100">
          Plataforma Escolar
        </span>

        <h1
          className={`mt-6 text-5xl lg:text-7xl font-bold text-white leading-tight ${poppins.className}`}
        >
          Aprender hoje,
          <span className="block text-yellow-400">
            transformar o amanhã
          </span>
        </h1>

        <p className="mt-6 text-lg text-blue-100 leading-relaxed">
          Conecte alunos, professores e responsáveis em uma
          plataforma intuitiva.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">

          <Link href="../auth/cadastro">
            <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105">
              Cadastro
            </button>
          </Link>

          <Link href="../auth/login">
            <button className="px-8 py-4 border border-white/30 backdrop-blur-sm bg-white/10 text-white rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300">
              Login
            </button>
          </Link>

        </div>

      </div>

      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-yellow-400/20 rounded-full blur-3xl"></div>

    </div>

    <div className="relative w-full lg:w-1/2 min-h-100">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/escolas-antes-12.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-blue-950/40 to-transparent" />

    </div>

  </section>
);
}