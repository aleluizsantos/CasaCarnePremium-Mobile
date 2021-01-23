import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "../routes/tabs.routes";
import Car from "../Pages/Car";
import Payments from "../Pages/Payments";
import MyOrderDetails from "../Pages/MyOrderDetails";
import RegisterAddress from "../Pages/RegisterAddress";
import Perfil from "../Pages/Perfil";
import Menu from "../Pages/Menu";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="App" component={Tabs} />
      <Screen name="Car" component={Car} />
      <Screen name="Menu" component={Menu} />
      <Screen name="Payments" component={Payments} />
      <Screen name="MyOrderDetails" component={MyOrderDetails} />
      <Screen name="RegisterAddress" component={RegisterAddress} />
      <Screen name="Perfil" component={Perfil} />
    </Navigator>
  );
};

export default AppRoutes;
