
import  {crearUsuario, 
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,eliminarUsuario, cambiarEstado
}  from '../models/usuarioModels.js'


export async function postUsuario(req, res) {
  try {
    const nuevo = await crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    
    console.error('--- ERROR CRÍTICO EN POST USUARIO ---', error.message); 
    res.status(500).json({ 
        error: 'Error interno del servidor. Revisa la consola para más detalles.',
        mensajeTecnico: error.message 
    });
  }
}

export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}


export async function getUsuario(req,res) {
    try {
        const usuario = await obtenerUsuarioPorId(req.params.id);
        if(!usuario) return res.status(404).json({error: 'usuario no encontrado'});
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
}

export async function putUsuario(req, res) {
    try {
        //
        if (Object.keys(req.body).length === 0) {
            return res.status(404).json({
                error: 'Datos incompletos',
                mensaje: 'Datos incompletos para actualizar deben estar los campos: nombre, email o fecha_nacimiento'
            });
        }

        const usuario = await obtenerUsuarioPorId(req.params.id);
        if(!usuario) return res.status(404).json({error: 'usuario no encontrado'});

        const actualizado = await actualizarUsuario(req.params.id, req.body);
        res.json(actualizado);
        
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
}


export async function patchEstado(req,res) {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    if(!usuario) return res.status(404).json({error: 'usuario no encontrado'});

    const actualizado = await  cambiarEstado(req.params.id,req.body);
    res.json(actualizado);
  } catch (error) {
     res.status(500).json({ error: 'Error al cambiar estado' });
  }
}









export async function deleteUsuario(req, res) {
  try {
    const eliminado = await eliminarUsuario(req.params.id);
    
    if (!eliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}