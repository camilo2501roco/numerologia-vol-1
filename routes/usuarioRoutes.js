import { Router } from "express";


// Asegúrate de que apunten bien:
// Asegúrate de que apunten bien:
import { postUsuario } from "../controllers/usuarioController.js";
import { validarCreacionUsuario } from "../validators/usuarioValidator.js";

const router= Router();

router.post('/', validarCreacionUsuario, postUsuario);


export default router;
