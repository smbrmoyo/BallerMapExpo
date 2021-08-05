import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StatusBar, View } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import AddScreen from "../../screens/AddScreen";
import FindScreen from "../../screens/FindScreen";
import StoryScreen from "../../screens/StoryScreen";
import Push from "../../../Notifications";
import OtherProfileScreen from "../../screens/OtherProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Geolocation from '@react-native-community/geolocation';
//navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createStackNavigator();

const HomeStack = () => {
  let routeName;

  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="Push"
        component={Push}
        options={({ navigation }) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="OtherProfile"
        component={OtherProfileScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "white",
            //shadowColor: "black",
            //elevation: 5,
            height: 80,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
