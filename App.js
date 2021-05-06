import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import { NavigationContainer } from "@react-navigation/native";
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
  const [expoPushToken, setExpoPushToken] = useState("");
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Verificar atualização no aplicativo no expo
  useEffect(() => {
    async function updateApp() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {}
    }
    updateApp();
    registerForPushNotificationsAsync().then((response) =>
      setExpoPushToken(response)
    );
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
