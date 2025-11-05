import axios from "axios";
import { link, conf } from ".";
import { Category } from "../types";
import { CategoryDto } from "../types";

const route : string = "api/cats"

export const createCategory = async (cat : CategoryDto, jwt : string) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`,cat,conf(jwt))
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Category
  }
  catch(error){
    throw new Error('Create category failed: ' + (error as Error).message);
  }
}

export const getCategories = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Category[]
  }
  catch(error){
    throw new Error('Get categories failed: ' + (error as Error).message);
  }
}

export const getCategory = async (id : string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Category
  }
  catch(error){
    throw new Error('Get category failed: ' + (error as Error).message);
  }
}

export const updateCategory = async (cat : Category,jwt : string) => {
  try{
    const {id, notes, user, ...noId} = cat
    console.log(noId);
    
    const res = await axios.put(`${link}/${route}/${id}`,noId,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Category
  }
  catch(error){
    throw new Error('Update category failed: ' + (error as Error).message);
  }
}

export const deleteCategory = async (id : string,jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Category
  }
  catch(error){
    throw new Error('Delete category failed: ' + (error as Error).message);
  }
}