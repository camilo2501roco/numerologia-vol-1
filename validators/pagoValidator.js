import { body } from "express-validator";
import { validarCampos } from "./validateResults.js";





export const validarCreacionPago=[


    body('usuario_id')
    .notEmpty().withMessage('el usuasio_id es obligatorio')
    .isInt({min:1}).withMessage('el usuaio_id debe ser un numero entero positivo'),



    body('monto')
    .notEmpty().withMessage('El monto es obligatorio')
    .isFloat({min:0.01}).withMessage('el monto debe ser mayor a 0'),

    body('metodo')
    .notEmpty().withMessage(' el metodo de pago es olbigatorio')
    .isIn(['tarjeta', 'efectivo','transferencia']).withMessage('El metodo debe ser: tarjeta , efectivo o transferencia'),
    validarCampos
]