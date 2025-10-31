import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // ajuste se precisar
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
