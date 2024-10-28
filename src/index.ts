import express, { Request, Response } from 'express';
import petRoutes from './routes/pets';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON
app.use('/api/pets', petRoutes); // Rutas

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido a PawsAPI 🐾');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
