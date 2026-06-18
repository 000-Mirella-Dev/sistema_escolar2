import pool from "./db";

export async function registrarAuditoria({
  usuarioId,
  tabela,
  registroId,
  tipo,
  ip,
}) {

  await pool.query(
    `
    INSERT INTO auditoria
    (
      usuario_id,
      tabela_afetada,
      registro_id,
      tipo_alteracao,
      ip_usuario
    )
    VALUES
    ($1,$2,$3,$4,$5)
    `,
    [
      usuarioId,
      tabela,
      registroId,
      tipo,
      ip
    ]
  );

}