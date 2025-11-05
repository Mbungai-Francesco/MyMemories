import { Note } from "./note";
import { User } from "./user";

export interface Tag {
  id: string;
  name: string;
  description?: string;
  color?: string;
  user?: User;
  userId: string;
  notes ?: Note[]; // ? added for static data
  noteIds ?: string[]; // ? added for static data
}

export interface TagDto {
  name: string;
  description?: string;
  color?: string;
  userId: string;
}