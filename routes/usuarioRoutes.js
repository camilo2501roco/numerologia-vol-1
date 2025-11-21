import { Router } from "express";



import 
{ getUsuarios, 
 postUsuario,getUsuario,putUsuario,deleteUsuario,patchEstado
 

} 
    from "../controllers/usuarioControllers.js";

import { validarCreacionUsuario, validarActualizacionUsuario,validarCambioEstado } from "../validators/usuarioValidator.js";

const router= Router();
// obtener todos los usuarios
router.get('/', getUsuarios);
// obtener usuario especifico
router.get('/:id' ,getUsuario);
//registrar usuario
router.post('/', validarCreacionUsuario, postUsuario);
//actualizaar usuario
router.put('/:id', validarActualizacionUsuario, putUsuario);
// cambiar estado manual
router.patch('/:id/estado', validarCambioEstado ,patchEstado)
// eliminar usuario
router.delete('/:id', deleteUsuario);
export default router;
