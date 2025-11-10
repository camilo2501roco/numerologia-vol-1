import { Router } from "express";
import { postPago ,getEstadoMembresia, getAllPagos, getPagosPorUsuario} from "../controllers/pagoControllers.js";
import { validarCreacionPago } from "../validators/pagoValidator.js";



const router = Router()

// listar todos los pagos
router.get('/', getAllPagos);

// obtener estado de membresia
router.get('/estado/:usuario_id', getEstadoMembresia, );
// listar pagos de un usuario especifico 
router.get('/:usuario_id', getPagosPorUsuario);

// REGISTRAR EL PAGO
router.post('/',validarCreacionPago, postPago);
export default router;