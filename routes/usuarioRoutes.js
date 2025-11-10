import { Router } from "express";



import 
{ getUsuarios, 
 postUsuario,getUsuario,putUsuario,deleteUsuario,patchEstado
 

} 
    from "../controllers/usuarioController.js";

import { validarCreacionUsuario, validarActualizacionUsuario,validarCambioEstado } from "../validators/usuarioValidator.js";

const router= Router();

router.post('/', validarCreacionUsuario, postUsuario);
router.get('/', getUsuarios);
router.get('/:id' ,getUsuario);
router.put('/:id', validarActualizacionUsuario, putUsuario);
router.delete('/:id', deleteUsuario);
router.patch('/:id/estado', validarCambioEstado ,patchEstado)
export default router;
