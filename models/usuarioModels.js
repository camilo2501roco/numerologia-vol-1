// Asegúrate de que apunte bien:
import pool from '../config/database.js';







// ... en models/ususariosModels.js

export async function crearUsuario({nombre,email,fecha_nacimiento}){

    const [result ]= await pool.query(
        'INSERT INTO usuarios (nombre, email,fecha_nacimiento) VALUES (?, ?,?)',
        [nombre,email,fecha_nacimiento]
    );
 console.log('Resultado SQL:', result);
    // Corregir aquí: 'inserId' debe ser 'insertId'
    return {id:result.insertId,nombre,email,fecha_nacimiento}; 
};
