import { Note } from "./note";
import { User } from "./user";

export interface Tag {
  id: string;
  name: string;
  description?: string;
  color?: string;
  user?: User;
  userId: string;
  notes: Note[];
  noteIds: string[];
}

export interface TagDto {
  id: string;
  name: string;
  description?: string;
  color?: string;
  userId: string;
}