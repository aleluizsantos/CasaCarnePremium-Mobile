import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Server_URL from "./Server_URL";

const url = Server_URL.URL;

const api = axios.create({
  baseURL: url,
});

// Add a request interceptor
// enviando a toda requisição o token
api.interceptors.request.use(
  async function (config) {
    // Capturar o token salvo no dispositivo
    await AsyncStorage.getItem("@Premium:token").then((tokenUser) => {
      if (tokenUser) {
        // Definir o token no Header Authorization em toda requisição
        config.headers.Authorization = `Bearer ${tokenUser}`;
      }
    });
    return config;
  },
  function (error) {
    // enviar o erro de solicitação
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
