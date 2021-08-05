import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import ProfileScreen from "../../screens/ProfileScreen";
import FollowingScreen from "../../screens/FollowingScreen";
import FollowersScreen from "../../screens/FollowersScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import TryStory from "../../screens/TryStory";
import OtherProfileScreen from "../../screens/OtherProfileScreen";
import MediaEditor from "../../screens/src/views/SelectContact";
import MediaDescription from "../../screens/src/views/MediaDescription";
import CreatePost from "../../screens/src/SnapClone";
import StoryScreen4 from "../../screens/StoryScreen4/App";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProfileStack = ({ navigation }) => {
  let routeName;

  return (
    <Stack.Navigator initialRouteName={"ProfileScreen"}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "white",
            //shadowColor: 'black',
            //elevation: 5,
            height: 80,
          },
        })}
        //options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ navigation, route }) => ({
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
        name="CreatePost"
        component={CreatePost}
        options={({ navigation, route }) => ({
          header: () => null,
        })}
      />
      <Stack.Screen
        name="media_editor"
        component={MediaEditor}
        options={({ navigation, route }) => ({
          header: () => null,
        })}
      />

      <Stack.Screen
        name="Following"
        component={FollowingScreen}
        options={({ navigation, route }) => ({
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
        name="Followers"
        component={FollowersScreen}
        options={({ navigation, route }) => ({
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
        options={({ navigation, route }) => ({
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
        name="Story"
        component={StoryScreen4}
        options={({ navigation }) => ({
          title: "",

          header: () => null,
        })}
      />
      <Stack.Screen
        name="TryStory"
        component={TryStory}
        options={({ navigation }) => ({
          title: "",

          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
