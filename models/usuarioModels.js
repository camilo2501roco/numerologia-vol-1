

import pool from '../config/dataBase.js';









export async function crearUsuario({nombre,email,fecha_nacimiento}){

    const [result ]= await pool.query(
        'INSERT INTO usuarios (nombre, email,fecha_nacimiento) VALUES (?, ?,?)',
        [nombre,email,fecha_nacimiento]
    );
 console.log('Resultado SQL:', result);
    
    return {id:result.insertId,nombre,email,fecha_nacimiento}; 
};


export async function obtenerUsuarios() {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
    
}



export async function obtenerUsuarioPorId(id) {

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id]);
    return rows[0];
}





export async function cambiarEstado(id,{estado}) 
{

  const [result] = await pool.query(
    'UPDATE usuarios SET estado = ? WHERE id = ?', 
  
  [estado,id]);



 if (result.affectedRows ===0){
return null;
  }

 return obtenerUsuarioPorId(id);
}












export async function actualizarUsuario(id, {nombre, email, fecha_nacimiento}) {
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre = ?, email = ?, fecha_nacimiento = ? WHERE id = ?',
    [nombre, email, fecha_nacimiento, id]
  );
  
 
  if (result.affectedRows === 0) {
    return null;
  }
  
  
  return await obtenerUsuarioPorId(id);
}





export async function existeEmail(email,idExcluir = null) {
    let query = 'SELECT id FROM usuarios WHERE email = ?';
    let params = [email] ;

    if(idExcluir){
        query += ' AND id != ?'
        params.push(idExcluir);
    }
    

    const [rows] = await pool.query(query,params);

    return rows.length >0;
}



export async function eliminarUsuario(id) {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}








export async function actualizarEstadoPorUusuario(id,estado) {
  const [result] = await pool.query(    'UPDATE usuarios SET estado = ? WHERE id = ?',

[estado,id]

  );
  return result.affectedRows > 0;
}