import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "../routes/tabs.routes";
import Car from "../Pages/Car";
import Payments from "../Pages/Payments";
import MyOrderDetails from "../Pages/MyOrderDetails";
import RegisterPerfil from "../Pages/RegisterPerfil";
import Onboarding from "../Pages/Onboarding";
import SignIn from "../Pages/SignIn";
import ForgotPassword from "../Pages/ForgotPassword";
import RegisterAddress from "../Pages/RegisterAddress";
import Perfil from "../Pages/Perfil";
import Menu from "../Pages/Menu";
import Location from "../Pages/Location";
import About from "../Pages/About";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator initialRouteName={"App"} screenOptions={{ headerShown: false }}>
      <Screen name="App" component={Tabs} />
      <Screen name="Car" component={Car} />
      <Screen name="Menu" component={Menu} />
      <Screen name="Onboarding" component={Onboarding} />
      <Screen name="Login" component={SignIn} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="RegisterPerfil" component={RegisterPerfil} />
      <Screen name="Payments" component={Payments} />
      <Screen name="MyOrderDetails" component={MyOrderDetails} />
      <Screen name="RegisterAddress" component={RegisterAddress} />
      <Screen name="Perfil" component={Perfil} />
      <Screen name="Location" component={Location} />
      <Screen name="About" component={About} />
    </Navigator>
  );
};

export default AppRoutes;
