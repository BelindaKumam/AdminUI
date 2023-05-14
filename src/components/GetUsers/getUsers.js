import axios from "axios";
import { API } from "./API";



export const getUsers = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};
