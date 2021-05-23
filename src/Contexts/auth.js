import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../Services/api";

const AuthContextData = {
  signed: Boolean,
  loading: Boolean,
  message: String,
  user: Object,
  messageClean: Function,
  signIn: Function,
  signOut: Function,
  userChanger: Function,
  passwordChange: Function,
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
        try {
          await api.get(`/auth/checktoken/${storageToken}`);
        } catch (error) {
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
  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  //clean Message
  function messageClean() {
    setMessage("");
  }
  /**
   * Alterar os dados do usuários
   * @param {Objeto} user Recebe um objeto com os dados name, email e phone
   */
  async function userChanger(dataUser) {
    const userId = user.id;
    const upgradeUser = await (
      await api.put(`/auth/users/${userId}`, dataUser)
    ).data;

    if (upgradeUser.success) {
      const newDataUser = {
        ...user,
        name: dataUser.name,
        email: dataUser.email,
        phone: dataUser.phone,
      };
      setUser(newDataUser);

      AsyncStorage.setItem("@Premium:User", JSON.stringify(newDataUser));
    }

    return upgradeUser;
  }

  async function passwordChange(dataPassword) {
    const userId = user.id;

    const upgradePass = await (
      await api.put(`/auth/password/${userId}`, dataPassword)
    ).data;

    return upgradePass;
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
        userChanger,
        passwordChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
