import axios from "axios";
import { link, conf } from ".";
import { Tag } from "../types";
import { TagDto } from "../types";

const route : string = "api/tags"

export const createTag = async (tag : TagDto, jwt : string) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`,tag,conf(jwt))
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    throw new Error('Create tag failed: ' + (error as Error).message);
  }
}

export const getTags = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag[]
  }
  catch(error){
    throw new Error('Fetching tags failed: ' + (error as Error).message);
  }
}

export const getUserTags = async (userId: string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/user/${userId}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag[]
  }
  catch(error){
    throw new Error('Fetching user tags failed: ' + (error as Error).message);
  }
}

export const getTag = async (id : string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    throw new Error('Get tag failed: ' + (error as Error).message);
  }
}

export const updateTag = async (tag : Tag,jwt : string) => {
  try{
    const {id, notes, user, ...noId} = tag
    console.log(noId);
    
    const res = await axios.put(`${link}/${route}/${id}`,noId,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    throw new Error('Update tag failed: ' + (error as Error).message);
  }
}

export const deleteTag = async (id : string,jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    throw new Error('Delete tag failed: ' + (error as Error).message);
  }
}