import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import serverURL from "./serverURL";

const url = serverURL.URL;

const api = axios.create({
  baseURL: url,
  timeout: 5000,
  timeoutErrorMessage: "Error internal Server",
});

// Add a request interceptor
// enviando a toda requisição o token
api.interceptors.request.use(
  async function (config) {
    // Capturar o token salvo no dispositivo
    await AsyncStorage.multiGet([
      "@CasaCarnePremium:token",
      "@CasaCarnePremium:tokenPushNotification",
    ]).then((response) => {
      if (response) {
        const tokenUser = response[0][1];
        const tokenPush = response[1][1];
        // o response retorna uma ARRAY de matriz
        // response[0][0]) // Key1
        // response[0][1]) // Value1
        // response[1][0]) // Key2
        // response[1][1]) // Value2
        // Definir o token no Header Authorization em toda requisição
        config.headers.Authorization = `Bearer ${tokenUser}`;
        config.headers.tokenPushNotification = tokenPush;
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
