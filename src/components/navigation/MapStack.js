import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StatusBar, View } from "react-native";
import MapScreen from "../../screens/MapScreen";
import FindScreen from "../../screens/FindScreen";
import StoryScreen from "../../screens/StoryScreen";
import StoryScreen4 from "../../screens/StoryScreen4/App";
import AddScreen from "../../screens/AddScreen";
import MapV3 from "../../screens/MapV3";
import DescriptionScreen from "../../screens/DescriptionScreen";
import OtherProfileScreen from "../../screens/OtherProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Geolocation from '@react-native-community/geolocation';
//navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createStackNavigator();

const MapStack = () => {
  let routeName;

  return (
    <Stack.Navigator initialRouteName={"Map"}>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen4}
        options={({ navigation }) => ({
          title: "",

          header: () => null,
        })}
      />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "white",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          /*headerRight: () => (
            <View style={{ marginLeft: 10 }}>
              <Entypo name="cross" size={24} color="black" />
              <Ionicons.Button
                name="chevron-back"
                size={25}
                backgroundColor="white"
                color="#333"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),*/
        })}
      />
      <Stack.Screen
        name="Description"
        component={DescriptionScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "white",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          /*headerRight: () => (
            <View style={{ marginLeft: 10 }}>
              <Entypo name="cross" size={24} color="black" />
              <Ionicons.Button
                name="chevron-back"
                size={25}
                backgroundColor="white"
                color="#333"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),*/
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

export default MapStack;