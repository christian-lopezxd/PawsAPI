import { Router, Request, Response } from 'express';

const router = Router();
const pets = [
  { id: 1, name: 'Firulais', type: 'dog' },
  { id: 2, name: 'Michi', type: 'cat' }
];

// Obtener todas las mascotas
router.get('/', (req: Request, res: Response) => {
  res.json(pets);
});

// Agregar una nueva mascota
router.post('/', (req: Request, res: Response) => {
  const { name, type } = req.body;
  const newPet = { id: pets.length + 1, name, type };
  pets.push(newPet);
  res.status(201).json(newPet);
});

export default router;
