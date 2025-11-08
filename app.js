import express from 'express'
import 'dotenv/config' 
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
