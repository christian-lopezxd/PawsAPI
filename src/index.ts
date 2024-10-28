import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import petRoutes from './routes/pets';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Middleware para parsear JSON
app.use(express.json());

// Opciones de conexión
const options: ConnectOptions = {
  dbName: 'pawsdb', // Nombre de la base de datos (opcional)
};

// Conectar a MongoDB
mongoose.connect(MONGODB_URI, options)
  .then(() => console.log('Conectado a MongoDB 🚀'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Usar las rutas de mascotas
app.use('/api/pets', petRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a PawsAPI 🐾');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
