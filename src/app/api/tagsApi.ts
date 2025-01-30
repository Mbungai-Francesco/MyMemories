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
    console.error('Error:', error);
    return null
  }
}

export const getTags = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getTag = async (id : string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    console.error('Error:', error);
    return null
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
    console.error('Error:', error);
    return null
  }
}

export const deleteTag = async (id : string,jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Tag
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}