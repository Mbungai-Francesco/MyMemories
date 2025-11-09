import axios from "axios";
import { Color } from "../types";

export const getColors = async () => {
  try{
    const res = await axios.get(`https://www.csscolorsapi.com/api/colors`)
    console.log(res.data.colors);
    return res.data.colors as Color[]
  }
  catch(error){
    throw new Error('Fetching colors failed: ' + (error as Error).message);
  }
}