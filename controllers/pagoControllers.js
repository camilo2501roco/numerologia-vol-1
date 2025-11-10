import { crearPago, obtenerEstadoMembresia ,obtenerTodosLosPagos, obtenerpagosPorUsuario} from "../models/pagoModels.js";

import { obtenerUsuarioPorId } from "../models/usuarioModels.js";





// registrar nuevo pago de membresia

export async function  postPago(req,res) {
    



    try {
        const {usuario_id} =  req.body;
         const usuario = await obtenerUsuarioPorId(usuario_id);
         if(!usuario){
            return res.status(404).json({error:'usuario no encontrado'})
         }




const nuevoPago =await crearPago(req.body);
res.status(201).json(nuevoPago)

    } catch (error) {
          console.error('Error al crear pago:', error.message);
        res.status(500).json({ 
            error: 'Error al crear pago',
            mensajeTecnico: error.message
        });
    }
}







export async function getEstadoMembresia(req, res) {
    try {
        const { usuario_id } = req.params;

        const usuario = await obtenerUsuarioPorId(usuario_id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const estadoMembresia = await obtenerEstadoMembresia(usuario_id);
        const estadoActivo = estadoMembresia?.fecha_vencimiento && estadoMembresia.estado_membresia === 'activo';

        return res.json({
            usuario_id: parseInt(usuario_id),
            estado: estadoActivo ? 'activo' : 'inactivo'
        });

    } catch (error) {  // 👈 EL CATCH DEBE ESTAR DENTRO DE LA FUNCIÓN
        console.error('Error al consultar estado de membresía:', error.message);
        res.status(500).json({ 
            error: 'Error al consultar estado de membresía',
            mensajeTecnico: error.message
        });
    }
}



export async function getAllPagos(req,res) {

    try {
        const pagos = await obtenerTodosLosPagos();

        res.json({
            succes: true,
            total: pagos.length,
            data: pagos
        });


    } catch (error) {
        console.error('Error al obtener pagos:', error.message);
        res.status(500).json({ 
            error: 'Error al obtener los pagos',
            mensajeTecnico: error.message
        });
    }
    
}





export async function getPagosPorUsuario(req,res) {
    

    try {
        const {usuario_id} = req.params;

        const usuario = await obtenerpagosPorUsuario(usuario_id);
        if(!usuario)return res.status(404).json({error:'usuario no encontrado'});

        const pagos = await obtenerpagosPorUsuario(usuario_id);
        res.json({
            succes: true,
            usuario_id:parseInt(usuario_id),
            nombre:usuario.nombre,
            total_pagos: pagos.length,
            data: pagos
        })
    } catch (error) { 
         console.error('Error al obtener pagos del usuario:', error.message);
        res.status(500).json({ 
            error: 'Error al obtener pagos del usuario',
            mensajeTecnico: error.message
        });
    }
}