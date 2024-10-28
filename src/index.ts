import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import petRoutes from './routes/petRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/pets', petRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
