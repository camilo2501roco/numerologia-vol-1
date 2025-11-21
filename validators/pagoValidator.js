import { body } from "express-validator";
import { validarCampos } from "./validateResults.js";

import { MONTO_MEMBRESIA_MENSUAL } from "../models/pagoModels.js";



export const validarCreacionPago=[


    body('usuario_id')
    .notEmpty().withMessage('el usuasio_id es obligatorio')
    .isInt({min:1}).withMessage('el usuaio_id debe ser un numero entero positivo'),



    body('monto')
        .optional()
        .custom((value) => {
            if (value && value !== MONTO_MEMBRESIA_MENSUAL) {
                throw new Error(`El monto debe ser ${MONTO_MEMBRESIA_MENSUAL}`);
            }
            return true;
        }),

    body('metodo')
    .notEmpty().withMessage(' el metodo de pago es olbigatorio')
    .isIn(['tarjeta', 'efectivo','transferencia']).withMessage('El metodo debe ser: tarjeta , efectivo o transferencia'),
    validarCampos
]