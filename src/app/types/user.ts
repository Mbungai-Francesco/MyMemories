import { Category } from "./category";
import { Note } from "./note";
import { Tag } from "./tag";

export interface User {
  id: string;
  firstname: string;
  lastname?: string;
  password: string;
  email: string;
  jwt ?: string
  tags: Tag[];
  categories: Category[];
  notes: Note[];
}

export interface UserDto {
  firstname: string;
  lastname?: string;
  password: string;
  email: string;
}

export interface UserLogin {
  email: string;
  password: string;
}