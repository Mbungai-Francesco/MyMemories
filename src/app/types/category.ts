import { Note } from "./note";
import { User } from "./user";

export interface Category {
  id: string;
  name: string;
  description?: string;
  user?: User;
  userId: string;
  notes: Note[];
}