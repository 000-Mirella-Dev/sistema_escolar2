// eslint-disable-next-line @typescript-eslint/no-unused-vars
const result = await pool.query(
  `
  SELECT 
    n.id,
    n.disciplina,
    n.nota1,
    n.nota2,
    n.nota3,
    n.nota4,
    u.nome AS aluno_nome
  FROM notas n
  JOIN usuarios u ON u.id = n.aluno_id
  WHERE n.professor_id = $1
  ORDER BY n.id DESC
  LIMIT 200
  `,
  [professorId]
);