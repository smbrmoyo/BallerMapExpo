import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import CategoryScreen from "../../screens/CategoryScreen";
import Pressable from "../../screens/Pressable";
import OtherProfileScreen from "../../screens/OtherProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const CategoryStack = ({ navigation }) => {
  let routeName;

  return (
    <Stack.Navigator initialRouteName={"Category"}>
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
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

export default CategoryStack;

/*headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Ionicons.Button
                name="chevron-back"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Message')}
              />
            </View>
          ),*/
