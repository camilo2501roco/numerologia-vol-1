import express from 'express'
import 'dotenv/config' 
import usuarioRoutes from './routes/usuarioRoutes.js';
import pagoRoutes from './routes/pagoRutas.js'

import { iniciarTareaVerificacionMembresisas } from './cron/verificiarMembresisas.js';

const app = express();

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pagos', pagoRoutes);



iniciarTareaVerificacionMembresisas()
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
