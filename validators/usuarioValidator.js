import { body, param } from 'express-validator';
// Asegúrate de que apunten bien:
import { validarCampos } from './validateResults.js'; 
import { existeEmail } from '../models/usuarioModels.js';

export const validarCreacionUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(async (email) => {
      const yaExiste = await existeEmail(email);
      if (yaExiste) {
        throw new Error('El email ya está registrado');
      }
    }),


body('fecha_nacimiento')
 .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('La fecha debe tener el formato YYYY-MM-DD (ejemplo: 2005-05-25)')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Debe ser una fecha válida en formato YYYY-MM-DD'),

    
  validarCampos 
];



export const  validarActualizacionUsuario= [
body('nombre')
  .optional()  
  .isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),

body('email')
  .optional() 
  .isEmail().withMessage('Debe ser un email válido')
  .custom(async (email, {req}) => {
    const existe = await existeEmail(email, req.params.id);
    if (existe) {
      throw new Error('El email ya está registrado');
    }
  }),

body('fecha_nacimiento')
  .optional()  
  .isDate().withMessage('Debe ser una fecha válida (YYYY-MM-DD)'),

    validarCampos 
]


export const validarCambioEstado =[
  body('estado')
  .notEmpty().withMessage('el estado es obligatorio')
  .isIn(['activo','inactivo']).withMessage('El estado debe ser activo o inactivo'),
  validarCampos
]