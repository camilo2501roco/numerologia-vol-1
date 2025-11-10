import { crearLecturaPrincipal,crearLecturaDiaria ,
    obtenerLecturasPorUsuario,obtenerlecturaPorId,
LecturaYaExisteError} from "../models/lecturaModels.js";

import { obtenerUsuarioPorId } from "../models/usuarioModels.js";



export async function postLecturaPrincipal(req,res) {
    


    try {
        const {usuario_id} =req.params;

        const usuario = await obtenerUsuarioPorId(usuario_id);

        if(!usuario) return res.status(404).json({error:'usuario no encontrado'});




        const lectura = await crearLecturaPrincipal(usuario_id, usuario.fecha_nacimiento);


        res.status(201).json({
            success: true,
            mensaje: 'lectura principal generada exitosamente',
            data:lectura
        });
    } catch (error) {
        console.error('Error al generar lectura principal:', error.message);
        
       if (error instanceof LecturaYaExisteError) {  // ✅
            return res.status(409).json({
                error: 'Lectura ya existe',
                mensaje: error.message
            });
        }
        res.status(500).json({ 
            error: 'Error al generar lectura principal',
            mensajeTecnico: error.message
        });
    }
}





export async function postLecturaDiaria(req,res) {
    try {
        const {usuario_id} = req.params;

        const usuario = await  obtenerUsuarioPorId(usuario_id);



        if(!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });




if(usuario.estado !== 'activo'){

    return res.status(403).json({ 
                error: 'Usuario inactivo',
                mensaje: 'Debes tener una membresía activa para generar lecturas diarias'
            });
}


const lectura = await crearLecturaDiaria(usuario_id,usuario.fecha_nacimiento);

res.status(201).json({
     success: true,
            mensaje: 'Lectura diaria generada exitosamente',
            data: lectura
});



    } catch (error) {
        

        console.error('Error al generar lectura diaria:', error.message);
        res.status(500).json({ 
            error: 'Error al generar lectura diaria',
            mensajeTecnico: error.message
        });
    }
}









export async function getLecturasPorUsuario(req,res) {
    
    try {
         const  {usuario_id} = req.params;

         const usuario = await obtenerUsuarioPorId(usuario_id);

         if(!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });



         const lecturas = await  obtenerLecturasPorUsuario(usuario_id);

            res.json({
            success: true,
            usuario_id: parseInt(usuario_id),
            nombre: usuario.nombre,
            total_lecturas: lecturas.length,
            data: lecturas
        });
    } catch (error) {
         console.error('Error al obtener lecturas:', error.message);
        res.status(500).json({ 
            error: 'Error al obtener lecturas',
            mensajeTecnico: error.message
        });
    }
}




export async function getLectura(req,res) {
    try {
        const {id} = req.params;

        const lectura = await obtenerlecturaPorId(id)


          
        if (!lectura) {
            return res.status(404).json({ error: 'Lectura no encontrada' });
        }

        res.json({
             success: true,
            data: lectura
        })
        
    } catch (error) {
        console.error('Error al obtener lectura:', error.message);
        res.status(500).json({ 
            error: 'Error al obtener lectura',
            mensajeTecnico: error.message
        });
    }
}