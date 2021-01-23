import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../Pages/SignIn";
import RegisterPerfil from "../Pages/RegisterPerfil";
import ForgotPassword from "../Pages/ForgotPassword";
import RegisterAddress from "../Pages/RegisterAddress";

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes = () => (
  <Navigator headerMode="none">
    <Screen name="Login" component={SignIn} />
    <Screen name="RegisterPerfil" component={RegisterPerfil} />
    <Screen name="ForgotPassword" component={ForgotPassword} />
    <Screen name="RegisterAddress" component={RegisterAddress} />
  </Navigator>
);

export default AuthRoutes;
