import axios from "axios";
import { link, conf } from ".";
import { Note } from "../types";
import { NoteDto } from "../types";

const route : string = "api/notes"

export const createNote = async (note : NoteDto, jwt : string) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`,note,conf(jwt))
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Note
  }
  catch(error){
    throw new Error('Create note failed: ' + (error as Error).message);
  }
}

export const getNotes = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Note[]
  }
  catch(error){
    throw new Error('Get notes failed: ' + (error as Error).message);
  }
}

export const getUserNotes = async (userId :string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/user/${userId}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Note[]
  }
  catch(error){
    throw new Error('Get user notes failed: ' + (error as Error).message);
  }
}

export const getNote = async (id : string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Note
  }
  catch(error){
    throw new Error('Get note failed: ' + (error as Error).message);
  }
}

export const updateNote = async (note : Note,jwt : string) => {
  try{
    const {id, tags, category, user, ...noId} = note
    console.log(noId);
    
    const res = await axios.put(`${link}/${route}/${id}`,noId,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Note
  }
  catch(error){
    throw new Error('Update note failed: ' + (error as Error).message);
  }
}

export const deleteNote = async (id : string,jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`, conf(jwt))
    console.log(res.data.data);
    return res.data.data as Note
  }
  catch(error){
    throw new Error('Delete note failed: ' + (error as Error).message);
  }
}