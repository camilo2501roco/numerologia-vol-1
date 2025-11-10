import { Router } from 'express';
import { 
    postLecturaPrincipal, 
    postLecturaDiaria, 
    getLecturasPorUsuario, 
    getLectura 
} from '../controllers/lecturaControllers.js';

const router = Router();

// Generar lectura principal
router.post('/principal/:usuario_id', postLecturaPrincipal);

// Generar lectura diaria
router.post('/diaria/:usuario_id', postLecturaDiaria);

// Obtener todas las lecturas de un usuario
router.get('/usuario/:usuario_id', getLecturasPorUsuario);

// Obtener una lectura específica
router.get('/:id', getLectura);

export default router;