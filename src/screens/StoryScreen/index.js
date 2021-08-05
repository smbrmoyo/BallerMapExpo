import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
//import { API, graphqlOperation } from "aws-amplify";
//import { listStorys } from "../../graphql/queries";
//import styles from "./styles";
import Swipe from "./Swipe";
//import storiesData from "../../assets/data/stories";
import ProfilePicture from "../../components/ProfilePicture";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const storiesData = [
  {
    id: "2",
    source: require("../../assets/stories/2.jpg"),
    user: "derek.russel",
    avatar: require("../../assets/avatars/derek.russel.png"),
  },
  {
    id: "4",
    source: require("../../assets/stories/4.jpg"),
    user: "jmitch",
    avatar: require("../../assets/avatars/jmitch.png"),
  },
  {
    id: "5",
    source: require("../../assets/stories/5.jpg"),
    user: "monicaa",
    avatar: require("../../assets/avatars/monicaa.png"),
  },

  {
    id: "1",
    source: require("../../assets/stories/1.jpg"),
    user: "andrea.schmidt",
    avatar: require("../../assets/avatars/andrea.schmidt.png"),
  },
];

const StoryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Swipe storiesData={storiesData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
  },
});

export default StoryScreen;
