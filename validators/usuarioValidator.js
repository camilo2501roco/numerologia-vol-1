import { body, param } from 'express-validator';
// Asegúrate de que apunten bien:
import { validarCampos } from './validateResults.js'; 


export const validarCreacionUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

body('fecha_nacimiento')
.notEmpty().withMessage('la fecha es obligatoria ej : 2005-05-25'),

    
  validarCampos // <-- aplica el middleware genérico
];