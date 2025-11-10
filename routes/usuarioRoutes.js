import { Router } from "express";



import 
{ getUsuarios, 
 postUsuario,getUsuario,putUsuario,deleteUsuario,patchEstado
 

} 
    from "../controllers/usuarioController.js";

import { validarCreacionUsuario, validarActualizacionUsuario,validarCambioEstado } from "../validators/usuarioValidator.js";

const router= Router();
router.get('/', getUsuarios);
router.get('/:id' ,getUsuario);
router.post('/', validarCreacionUsuario, postUsuario);
router.put('/:id', validarActualizacionUsuario, putUsuario);
router.patch('/:id/estado', validarCambioEstado ,patchEstado)
router.delete('/:id', deleteUsuario);
export default router;
