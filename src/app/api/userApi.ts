import axios from "axios";
import { link, conf } from ".";
import { User } from "../types";
import { UserDto } from "../types";
const route : string = "api/users"

export const createUser = async (user : UserDto) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`, user)
    console.log("message", res.statusText);
    const use = res.data.data as User
    use.jwt = res.data.token
    console.log(res.data);
    return use
  }
  catch(error){
    throw new Error('Login faileds: ' + (error as Error).message);
  }
}

export const getUsers = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as User[]
  }
  catch(error){
    throw new Error('Get users failed: ' + (error as Error).message);
  }
}

export const getUser = async (id : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as User
  }
  catch(error){
    throw new Error('Get user failed: ' + (error as Error).message);
  }
}

export const getUserByMail = async (mail : string) => {
  try{
    const res = await axios.get(`${link}/api/mail/${mail}`)
    console.log(res.data.data);
    return res.data.data as User
  }
  catch(error){
    throw new Error('Get user by mail failed: ' + (error as Error).message);
  }
}

export const updateUser = async (user : User, jwt : string) => {
  try{
    const{ id,tags,notes,categories, ...noId} = user
    const res = await axios.put(`${link}/${route}/${id}`,noId,conf(jwt))
    console.log(res.data.data);
    return res.data.data as User
  }
  catch(error){
    throw new Error('Update user failed: ' + (error as Error).message);
  }
}

export const deleteUser = async (id : string, jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as User
  }
  catch(error){
    throw new Error('Delete user failed: ' + (error as Error).message);
  }
}

export const loginUser = async (email : string, password : string) => {
  try{
    const res = await axios.post(`${link}/api/login`, {email, password})
    // console.log(res);
    
    const user = res.data.data as User
    user.jwt = res.data.token
    console.log(res.data);
    return user
  }
  catch(error){
    throw new Error('Login faileds: ' + (error as Error).message);
  }
}