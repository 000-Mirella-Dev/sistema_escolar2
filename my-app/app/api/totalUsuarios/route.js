import pool from "../../../lib/db"

export async function GET() {
    try {
        const totalUsuarios = await pool.query (`
            SELECT COUNT(*) AS total FROM usuarios`);

           const totalProfessores = await pool.query (`
            SELECT COUNT(*) AS professores FROM usuarios WHERE perfil = 'PROFESSOR' `);

           const totalAdministradores = await pool.query (`
            SELECT COUNT(*) AS admins FROM usuarios where perfil = 'ADMIN' `);

           const totalAlunos = await pool.query (`
            SELECT COUNT(*) AS alunos FROM usuarios where perfil = 'ALUNO' `);

        const UltimosCadastros = await pool.query (`
            SELECT nome, email, perfil, criado_em, criado_por FROM usuarios ORDER BY criado_em DESC LIMIT 4`);

return Response.json({
    Usuarios: Number(totalUsuarios.rows[0].total),
    Professores:Number(totalProfessores.rows[0].professores),
    Admins: Number(totalAdministradores.rows[0].admins),
    Alunos: Number(totalAlunos.rows[0].alunos),
    Cadastros: UltimosCadastros.rows
});
    } catch (erro) {
    return Response.json(
        {
            erro: erro.message
        },
        {status: 500}
    );
}
}