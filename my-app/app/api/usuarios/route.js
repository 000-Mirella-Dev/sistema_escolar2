import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { nome, email, senha, perfil, criado_por } = await req.json();

    if (!nome || !nome.trim()) {
      return Response.json(
        { erro: "O nome é obrigatório." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return Response.json(
        { erro: "O e-mail é obrigatório." },
        { status: 400 }
      );
    } else if (!emailRegex.test(email)) {
      return Response.json(
        { erro: "Insira um e-mail válido." },
        { status: 400 }
      );
    }

    if (!senha) {
      return Response.json(
        { erro: "A senha é obrigatória." },
        { status: 400 }
      );
    } else if (senha.length < 6) {
      return Response.json(
        { erro: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    if (!criado_por || !criado_por.trim()) {
      return Response.json(
        { erro: "É necessário digitar o nome de quem está cadastrando." },
        { status: 400 }
      );
    }

    const usuarioExistente = await pool.query(
      `SELECT id FROM usuarios WHERE email = $1`,
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      return Response.json(
        { erro: "Este email já está cadastrado." },
        { status: 409 }
      );
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const alunoResult = await pool.query(
      `
      INSERT INTO usuarios (nome, email, senha, perfil, criado_por)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [nome, email, senhaCriptografada, perfil, criado_por]
    );

    const alunoId = alunoResult.rows[0].id;

    const disciplinas = await pool.query(`
      SELECT DISTINCT disciplina, professor_id
      FROM notas
    `);

    for (const d of disciplinas.rows) {
      await pool.query(
        `
        INSERT INTO notas (
          aluno_id,
          professor_id,
          disciplina,
          nota1,
          nota2,
          nota3,
          nota4
        )
        VALUES ($1, $2, $3, NULL, NULL, NULL, NULL)
        `,
        [
          alunoId,
          d.professor_id,
          d.disciplina
        ]
      );
    }

    return Response.json({
      mensagem: "Aluno criado com sucesso"
    });

  } catch (erro) {
    return Response.json(
      { erro: erro.message },
      { status: 500 }
    );
  }
}