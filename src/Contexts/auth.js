import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Services/api";

const AuthContextData = {
  signed: Boolean,
  user: Object,
  signIn: Function,
  signOut: Function,
  userChanger: Function,
  passwordChange: Function,
  userAddress: Object,
  storeAddress: Object,
  setUserAddress: Function,
};

const AuthContext = createContext(AuthContextData);

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  useEffect(() => {
    let amoted = true;
    if (amoted) {
      (async () => {
        const storageUser = await AsyncStorage.getItem(
          "@CasaCarnePremium:User"
        );
        const userAddr = await AsyncStorage.getItem(
          "@CasaCarnePremium:UserAddress"
        );

        if (userAddr === null) {
          // Se o endereço não estiver salvo no Storage
          // Verificar se o usuário esta cadastrado busca o endereço
          storageUser !== null && addUserAddress();
        } else {
          // Usuário Cadastrado set o endereço
          setUserAddress(JSON.parse(userAddr));
        }
        setUser(JSON.parse(storageUser));
        addStoreAddress();
      })();
    }
    return () => (amoted = false);
  }, []);

  // Autenticar a aplicação
  async function signIn(email, password, exponentPushToken) {
    try {
      const isAuth = await (
        await api.post("/auth/authenticate", {
          email,
          password,
          exponentPushToken,
        })
      ).data;
      setUser(isAuth.user);
      AsyncStorage.setItem(
        "@CasaCarnePremium:User",
        JSON.stringify(isAuth.user)
      );
      AsyncStorage.setItem("@CasaCarnePremium:token", isAuth.token).then(() =>
        // Apos salvar o Token no Storage, buscar endereço do usuário e set
        addUserAddress()
      );
      return isAuth;
    } catch (error) {
      return error.response.data;
    }
  }
  // Desconectar do usuário, limpart credenciais
  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  // Alterar os dados do usuários
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

      AsyncStorage.setItem(
        "@CasaCarnePremium:User",
        JSON.stringify(newDataUser)
      );
    }

    return upgradeUser;
  }
  // Alterar o senha do usuário
  async function passwordChange(dataPassword) {
    const userId = user.id;

    const upgradePass = await (
      await api.put(`/auth/password/${userId}`, dataPassword)
    ).data;

    return upgradePass;
  }
  // Buscar o endereço padrão do usuário
  async function addUserAddress() {
    const userAddr = await (
      await api.get("address")
    ).data.find((item) => item.active === true);

    if (userAddr !== undefined) {
      // Salvar o endereço padrão
      AsyncStorage.setItem(
        "@CasaCarnePremium:UserAddress",
        JSON.stringify(userAddr)
      );
      setUserAddress(userAddr);
    }
  }
  // Buscar o endereço de entrega do usuário
  async function addStoreAddress() {
    const storeAddr = await (await api.get("addressStore")).data;
    storeAddr !== undefined && setStoreAddress(storeAddr);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //Verificar se existe um usuário converte True/false
        user,
        signIn,
        signOut,
        userChanger,
        passwordChange,
        userAddress,
        storeAddress,
        setUserAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
