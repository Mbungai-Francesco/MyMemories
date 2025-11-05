import { Category } from "./category";
import { Tag } from "./tag";
import { User } from "./user";

export interface Note {
  id: string;
  title: string;
  date: Date;
  time: string;
  content: string;
  tags: Tag[];
  tagIds ?: string[]; // ? added for static data
  category?: Category;
  categoryId?: string;
  user?: User;
  userId: string;
}

export interface NoteDto {
  title: string;
  date: Date;
  time ?: string;
  tagIds : string[];
  categoryId ?: string;
  userId: string;
}