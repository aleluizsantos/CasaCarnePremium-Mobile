import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import Category from "../Pages/Category";
import Search from "../Pages/Search";
import MyOrder from "../Pages/MyOrder";
import Config from "../Pages/Config";
import { colors } from "../Styles";

const { Navigator, Screen } = createBottomTabNavigator();

function Tabs() {
  return (
    <Navigator
      initialRouteName={"Category"}
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 62,
        },
        labelStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 10,
          paddingBottom: 2,
        },
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebedf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: colors.primary,
      }}
    >
      <Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Categoria",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <AntDesign
                style={{ top: 4 }}
                name="isv"
                size={focused ? 28 : size}
                color={color}
              />
            );
          },
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <AntDesign
                style={{ top: 4 }}
                name="search1"
                size={focused ? 28 : size}
                color={color}
              />
            );
          },
        }}
      />
      <Screen
        name="MyOrder"
        component={MyOrder}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <AntDesign
                name="tagso"
                style={{ top: 4 }}
                size={focused ? 30 : size}
                color={color}
              />
            );
          },
        }}
      />
      <Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <AntDesign
                name="setting"
                style={{ top: 4 }}
                size={focused ? 28 : size}
                color={color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export default Tabs;
