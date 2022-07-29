import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com/",
  timeout: 12000,
});
