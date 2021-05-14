import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../Services/api";

const AuthContextData = {
  signed: Boolean,
  loading: Boolean,
  message: String,
  messageClean: Function,
  user: Object,
  signIn: Function,
  signOut: Function,
};

const AuthContext = createContext(AuthContextData);
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storageUser = await AsyncStorage.getItem("@Premium:User");
      const storageToken = await AsyncStorage.getItem("@Premium:token");

      // Verificar se existe já uma credencial salva
      if (storageUser && storageToken) {
        // Verificar se o token se expirou - caso True renovar token
        const refreshToken = await (
          await api.get(`/auth/checktoken/${storageToken}`)
        ).data;

        if (refreshToken.refreshToken) {
          const token = refreshToken.token;
          AsyncStorage.setItem("@Premium:token", token);
          signOut();
        }

        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    })();
  }, []);

  // Autenticar a aplicação
  async function signIn(email, password) {
    try {
      await api
        .post("/auth/authenticate", { email, password })
        .then((response) => {
          const { user, token } = response.data;
          setUser(user);
          AsyncStorage.setItem("@Premium:User", JSON.stringify(user));
          AsyncStorage.setItem("@Premium:token", token);
        })
        .catch(function (error) {
          if (error.response) {
            setMessage(error.response.data.error);
          } else if (error.request) {
            setMessage(
              "Erro no servidor, verifique sua internet ou tente mais tarde."
            );
          } else {
            console.log("Error", error.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  // Sair da aplicação.
  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  //clean Message
  function messageClean() {
    setMessage("");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //Verificar se existe um usuário converte True/false
        user,
        loading,
        message,
        messageClean,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
