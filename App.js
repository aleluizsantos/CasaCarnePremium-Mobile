import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import * as Updates from "expo-updates";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { View, ActivityIndicator } from "react-native";

import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { AuthProvider } from "./src/Contexts/auth";
import { RequestProvider } from "./src/Contexts/requests";
import { registerForPushNotificationsAsync } from "./src/Components/Notification";
import Routes from "./src/routes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    // Verificar atualização no aplicativo via expo
    async function updateApp() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {}
    }
    // Registrando usuário
    registerForPushNotificationsAsync().then(async (tokenPush) => {
      AsyncStorage.setItem("@Premium:tokenPushNotification", tokenPush);
    });

    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("==>", response);
      });
    //When the app is open
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("==>", notification);
      });

    updateApp();

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#484848" size={48} />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthProvider>
          <RequestProvider>
            <Routes />
          </RequestProvider>
        </AuthProvider>
      </NavigationContainer>
    );
  }
};

export default App;
