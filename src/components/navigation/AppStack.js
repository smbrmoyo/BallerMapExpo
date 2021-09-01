import React from "react";
import HomeStack from "./HomeStack";
import MessageStack from "./MessageStack";
import MapStack from "./MapStack";
import ProfileStack from "./ProfileStack";
import CategoryStack from "./CategoryStack";
import ModalStack from "./ModalStack";
//import SnapchatStack from "../../../Snapchat";
import {useState, useEffect} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from 'expo-constants';


const Tab = createBottomTabNavigator();


/*useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const experienceId = "brianmoyou/BallerMapExpo";
    const token = (await Notifications.getExpoPushTokenAsync(experienceId=experienceId).data;
    console.log(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: 'rgba(255,35,31,0.49)',
    });
  }
  };

}, [])*/
const AppStack = (route) => {
  const [notifPermission, setNotifPermission] = useState();



  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "Home") {
      return false;
    }
    if (routeName === "AddChat") {
      return false;
    }
    if (routeName === "MessageSearch") {
      return false;
    }
    if (routeName === "Add") {
      return false;
    }
    if (routeName === "Find") {
      return false;
    }
    if (routeName === "Story") {
      return false;
    }
    if (routeName === "Chat") {
      return false;
    }
    if (routeName === "Following") {
      return false;
    }
    if (routeName === "CreatePost") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="Map"
      shifting={false}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "#7B7B7B",
        showLabel: false,
        style: {
          backgroundColor: "white",
          borderTopWidth: 0.3,
          borderTopColor: "#C4C4C4",
          //height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={({ route }) => ({
          tabBarLabel: "Map",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={30} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

{
  /*
  <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={({ route }) => ({
          tabBarLabel: "Message",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" size={26} color={color} />
          ),
          //tabBarBadge: 3,
        })}
      />
  
  <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: "Feed",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-circle-outline"
              size={30}
              color={color}
            />
          ),
          //tabBarBadge: 5,
        })}
      />
      
      <Tab.Screen
        name="Category"
        component={CategoryStack}
        options={({ route }) => ({
          tabBarLabel: "Places",
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        })}
      />
      */
}
