import { Router, Request, Response, NextFunction } from 'express';
import Pet from '../models/Pet';

const router = Router();

// Middleware para manejar errores de manera centralizada
const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Obtener todas las mascotas
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const pets = await Pet.find();
  res.json(pets);
}));

// Obtener una mascota por ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Mascota no encontrada' });
  }
  res.json(pet);
}));

// Agregar una nueva mascota
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { name, type, age } = req.body;
  const newPet = new Pet({ name, type, age });
  await newPet.save();
  res.status(201).json(newPet);
}));

// Actualizar una mascota por ID
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { name, type, age } = req.body;
  const updatedPet = await Pet.findByIdAndUpdate(
    req.params.id,
    { name, type, age },
    { new: true }
  );
  if (!updatedPet) {
    return res.status(404).json({ error: 'Mascota no encontrada' });
  }
  res.json(updatedPet);
}));

// Eliminar una mascota por ID
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const deletedPet = await Pet.findByIdAndDelete(req.params.id);
  if (!deletedPet) {
    return res.status(404).json({ error: 'Mascota no encontrada' });
  }
  res.status(204).send();
}));

export default router;
