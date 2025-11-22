import express from 'express'
import 'dotenv/config' 
import usuarioRoutes from './routes/usuarioRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js'
import lecturaRoutes from './routes/lecturaRoutes.js';
import { iniciarTareaVerificacionMembresias } from './cron/verificarMembresias.js';

const app = express();

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/lecturas', lecturaRoutes);


iniciarTareaVerificacionMembresias()
app.listen(process.env.PORT   || 3000, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
