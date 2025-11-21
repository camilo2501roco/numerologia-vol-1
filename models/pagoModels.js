import pool from '../config/database.js';

import { actualizarEstadoPorUusuario } from './usuarioModels.js';
export const MONTO_MEMBRESIA_MENSUAL = 5000;

export async function crearPago({usuario_id, monto, metodo}) {
    
    
    const [pagosVigentes] = await pool.query(
        `SELECT id FROM pagos 
         WHERE usuario_id = ? AND fecha_vencimiento >= CURDATE()`,
        [usuario_id]
    );

    if (pagosVigentes.length > 0) {
        throw new Error('Ya tienes una membresía activa. Puedes renovar cuando venza la actual.');
    }

    const fechaPago = new Date().toISOString().split('T')[0];
    const fechaVencimientoDate = new Date();
    fechaVencimientoDate.setDate(fechaVencimientoDate.getDate() + 30);
    const fechaVencimiento = fechaVencimientoDate.toISOString().split('T')[0];

    const [result] = await pool.query(
        'INSERT INTO pagos (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo) VALUES (?, ?, ?, ?, ?)',
        [usuario_id, monto, fechaPago, fechaVencimiento, metodo]
    );

    await actualizarEstadoPorUusuario(usuario_id, 'activo');

    return {
        id: result.insertId,
        usuario_id,
        monto,
        fechaPago,
        fechaVencimiento,
        metodo
    };
}

export async function obtenerEstadoMembresia(usuario_id) {
    

    const [rows] = await pool.query(
    `SELECT 
    u.id as usuario_id,
    u.nombre ,
    u.estado as estado_usuario,
    p.fecha_vencimiento,
    CASE 
    WHEN p.fecha_vencimiento >= CURDATE() THEN 'activo'
    
    ELSE  'inactivo'
    END  as estado_membresia,
    DATEDIFF(p.fecha_vencimiento, CURDATE()) as dias_restantes
    FROM usuarios u
    LEFT JOIN pagos p ON u.id = p.usuario_id
    WHERE  u.id= ?
    ORDER BY p.fecha_vencimiento DESC
    LIMIT 1`,
    [usuario_id]
    );

    return rows[0] || null;
}



export async function obtenerTodosLosPagos() {

    const [rows] = await pool.query(
       `SELECT 
            p.id,
            p.usuario_id,
            p.monto,
            p.fecha_pago,
            p.fecha_vencimiento,
            p.metodo,
            u.nombre,
            u.email,
            CASE 
                WHEN p.fecha_vencimiento >= CURDATE() THEN 'vigente'
                ELSE 'vencido'
            END as estado_pago
        FROM pagos p
        INNER JOIN usuarios u ON p.usuario_id = u.id
        ORDER BY p.fecha_pago DESC`
    );
    return rows;
    
}



export async function obtenerpagosPorUsuario(usuario_id) {
    
const [rows] = await pool.query(`
    
    
    SELECT 
    p.id,
    p.usuario_id,
    p.monto,
    p.fecha_pago,
    p.fecha_vencimiento,
    p.metodo,
    CASE
    WHEN p.fecha_vencimiento >= CURDATE() THEN 'vigente'
    ELSE 'vencido'
    END  as estado_pago ,
    DATEDIFF(p.fecha_vencimiento, CURDATE()) as dias_restantes
    from  pagos p
    WHERE p.usuario_id = ?
    ORDER BY p.fecha_pago DESC`,
      [usuario_id]);
  
return  rows;

}