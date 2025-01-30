import { Category } from "./category";
import { Note } from "./note";
import { Tag } from "./tag";

export interface User {
  id: string;
  firstname: string;
  lastname?: string;
  password: string;
  email: string;
  tags: Tag[];
  categories: Category[];
  notes: Note[];
}