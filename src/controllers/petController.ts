import { Request, Response } from 'express';
import Pet from '../models/Pet';

export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la mascota' });
  }
};

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las mascotas' });
  }
};
