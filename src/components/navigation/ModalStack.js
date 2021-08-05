import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import AddChatScreen from "../../screens/AddChatScreen";
import MessageStack from "./MessageStack";
import MessageSearchScreen from "../../screens/MessageSearchScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const ModalStack = ({ navigation }) => {
  let routeName;

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="MessageSearch"
        component={MessageSearchScreen}
        //options={{header: () => null}}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#f9fafd",
            //shadowColor: "black",
            //elevation: 5,
            height: 80,
          },
        })}
      />
      <Stack.Screen
        name="AddChat"
        component={AddChatScreen}
        //options={{header: () => null}}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#f9fafd",
            //shadowColor: "black",
            //elevation: 5,
            height: 80,
          },
        })}
      />
      <Stack.Screen
        name="MessageStack"
        component={MessageStack}
        options={{ headerShown: false }}
        mode="modal"
      />
    </Stack.Navigator>
  );
};
export default ModalStack;
