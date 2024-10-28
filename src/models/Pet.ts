import mongoose, { Document, Schema } from 'mongoose';

// Definimos la interfaz para TypeScript
interface IPet extends Document {
  name: string;
  type: string;
  age?: number;
}

// Esquema de Mongoose
const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, default: 0 },
});

// Modelo de Mongoose
const Pet = mongoose.model<IPet>('Pet', PetSchema);

export default Pet;
