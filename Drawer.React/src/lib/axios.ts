import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
  baseURL: "http://localhost:5217/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

export default instance;
