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
  tagIds: string[];
  category?: Category;
  categoryId?: string;
  user?: User;
  userId: string;
}

export interface NoteDto {
  id: string;
  title: string;
  date: Date;
  time: string;
  tagIds: string[];
  categoryId: string;
  userId: string;
}