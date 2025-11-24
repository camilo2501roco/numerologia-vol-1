import pool from "../config/dataBase.js";
import dotenv from 'dotenv';
dotenv.config();
import {  GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model =genAI.getGenerativeModel({model:"gemini-2.5-flash"});




async function generarContenidoIA(tipo, fecha_nacimiento) {
    
    // ✅ Solo validación básica de seguridad
    if (!fecha_nacimiento) {
        throw new Error('Fecha de nacimiento no disponible para generar la lectura');
    }

    // Resto del código (prompts y llamada a IA)
    let prompt;
    
    if(tipo === 'principal'){
        prompt = `Eres un experto numerólogo...`;
    } else {
        const fechaActual = new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        prompt = `Eres un experto numerólogo...`;
    }

    try {
        console.log('📝 Generando contenido tipo:', tipo);
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const texto = response.text();
        
        if (!texto || texto.trim().length === 0) {
            throw new Error('La IA no generó contenido válido');
        }
        
        console.log('✅ Contenido generado exitosamente');
        return texto;
        
    } catch (error) {
        console.error('❌ Error de Gemini:', error.message);
        
        if (error.message.includes('API_KEY') || error.message.includes('401')) {
            throw new Error('Clave de API de Gemini inválida o no configurada');
        }
        
        if (error.message.includes('quota') || error.message.includes('429')) {
            throw new Error('Límite de uso de la API de Gemini excedido. Intenta más tarde');
        }
        
        if (error.message.includes('timeout')) {
            throw new Error('Tiempo de espera agotado al conectar con la IA');
        }
        
        throw new Error('No se pudo generar la lectura con IA: ' + error.message);
    }
}


class LecturaYaExisteError extends Error {
    constructor(mensaje){
        super(mensaje);
        this.name = 'LecturaYaExisteError'
    }
}






 export async function crearLecturaPrincipal(usuario_id,fecha_nacimiento) {


 
   const [existe] = await pool.query(`
    SELECT id FROM lecturas WHERE usuario_id = ? AND tipo = "principal"`,
    [usuario_id]

);


if(existe.length > 0){
    throw new LecturaYaExisteError("Este usuario ya tiene generada una lectura principal");
    

}


const contenido = await generarContenidoIA('principal',fecha_nacimiento);


const [result] = await pool.query(`
    
    INSERT INTO lecturas (usuario_id, tipo, contenido) VALUES (?, ?, ?)
    `,
[usuario_id,'principal', contenido]
);
    



return {
       id_lectura: result.insertId,
        
    tipo:'principal',
    contenido,
    fecha_lectura: new Date()
};




}


export { LecturaYaExisteError };



export async function crearLecturaDiaria(usuario_id, fecha_nacimiento) {

    const contenido = await generarContenidoIA('diaria', fecha_nacimiento);
    
   
    const [result] = await pool.query(
        'INSERT INTO lecturas (usuario_id, tipo, contenido) VALUES (?, ?, ?)',
        [usuario_id, 'diaria', contenido]
    );
    
    return {
        id_lectura: result.insertId,
        
        tipo: 'diaria',
        contenido,
        fecha_lectura: new Date()
    };
}





export async function obtenerLecturasPorUsuario(usuario_id) {
    


    const [rows] = await pool.query(`
        SELECT 
            id,
           
            tipo,
            contenido,
            fecha_lectura
        FROM lecturas
        WHERE usuario_id = ?
        ORDER BY fecha_lectura DESC`,
    [usuario_id]
);
return rows;

}



export async function obtenerlecturaPorId(id) {
    

    const [rows] = await pool.query(`
        
        SELECT 
            l.id,
            l.usuario_id,
            l.tipo,
            l.contenido,
            l.fecha_lectura,
            u.nombre,
            u.email
        FROM lecturas l
        INNER JOIN usuarios u ON l.usuario_id = u.id
        WHERE l.id = ?`,
    [id]
);

return rows[0];
}