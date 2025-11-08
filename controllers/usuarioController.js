// Asegúrate de que apunten bien:
// Asegúrate de que apunten bien:
import  {crearUsuario}  from '../models/usuarioModels.js'


export async function postUsuario(req, res) {
  try {
    const nuevo = await crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    // ESTO MOSTRARÁ EL MENSAJE DE ERROR REAL EN TU CONSOLA DE NODEMON
    console.error('--- ERROR CRÍTICO EN POST USUARIO ---', error.message); 
    res.status(500).json({ 
        error: 'Error interno del servidor. Revisa la consola para más detalles.',
        mensajeTecnico: error.message // Puedes enviar esto en la respuesta para depurar en Postman
    });
  }
}