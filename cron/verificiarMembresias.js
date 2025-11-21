import cron from 'node-cron';
import pool from '../config/database.js';

export function iniciarTareaVerificacionMembresias() {
    
    cron.schedule('*/30 * * * *', async () => {
        console.log('🔄 Ejecutando verificación de membresías vencidas...');
        
        try {
            
            const [result] = await pool.query(`
                UPDATE usuarios u
                INNER JOIN (
                    SELECT usuario_id, MAX(fecha_vencimiento) as ultima_vencimiento
                    FROM pagos
                    GROUP BY usuario_id
                ) p ON u.id = p.usuario_id
                SET u.estado = 'inactivo'
                WHERE p.ultima_vencimiento < CURDATE()
                AND u.estado = 'activo'
            `);

            if (result.affectedRows > 0) {
                console.log(`✅ ${result.affectedRows} usuario(s) actualizado(s) a inactivo`);
            } else {
                console.log('✅ No hay membresías vencidas por actualizar');
            }
            
        } catch (error) {
            console.error('❌ Error en la verificación de membresías:', error.message);
        }
    }, {
        timezone: "America/Bogota"
    });
   
    console.log(' Tarea de verificación de membresías programada (cada 30 minutos)');
}