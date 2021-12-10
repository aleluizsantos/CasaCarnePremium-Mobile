import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
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
import { MyOrderProvider } from "./src/Contexts/myOrder";
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

  // Verificar atualização no aplicativo via expo
  async function prepareApp() {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {}
  }

  useEffect(() => {
    let amoted = true;
    // Registrando usuário
    registerForPushNotificationsAsync().then(async (tokenPush) => {
      AsyncStorage.setItem(
        "@CasaCarnePremium:tokenPushNotification",
        tokenPush
      );
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
    if (amoted) {
      prepareApp();
    }

    return () => {
      amoted = false;
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <AuthProvider>
        <MyOrderProvider>
          <Routes />
        </MyOrderProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
