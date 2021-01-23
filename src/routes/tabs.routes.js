import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";

import { colors } from "../Styles";

import Home from "../Pages/Home";
import Category from "../Pages/Category";
import Search from "../Pages/Search";
import MyOrder from "../Pages/MyOrder";
import Config from "../Pages/Config";

const { Navigator, Screen } = createBottomTabNavigator();

function Tabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 55,
        },
        labelStyle: {
          fontFamily: "Archivo_700Bold",
          fontSize: 11,
          paddingBottom: 5,
        },
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebedf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: "#32264d",
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ color, size, focused }) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Categoria",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <AntDesign
                style={focused && { top: -4 }}
                name="isv"
                size={focused ? 30 : size}
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
                style={focused && { top: -4 }}
                name="search1"
                size={focused ? 30 : size}
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
                style={focused && { top: -4 }}
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
                style={focused && { top: -4 }}
                size={focused ? 30 : size}
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
