import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IScheduleDoc {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilmDoc extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: IScheduleDoc[];
}

const ScheduleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

const FilmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number },
  director: { type: String },
  tags: { type: [String], default: [] },
  image: { type: String },
  cover: { type: String },
  title: { type: String },
  about: { type: String },
  description: { type: String },
  schedule: { type: [ScheduleSchema], default: [] },
});

export { FilmSchema, ScheduleSchema };
