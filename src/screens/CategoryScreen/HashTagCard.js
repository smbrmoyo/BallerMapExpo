import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//import firestore from "@react-native-firebase/firestore";
//import firebase from "@react-native-firebase/app";
//import auth from "@react-native-firebase/auth";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import { AuthContext } from "../../components/navigation/AuthProvider";
import styles from "./styles";

const HashTagCard = ({ props, navigation, hashtag }) => {
  return (
    <View style={{ borderRadius: 16 }}>
      <Text
        style={{
          borderRadius: 18,
          margin: 10,
          padding: 8,
          backgroundColor: "#F0F0F0",
          overflow: "hidden",
        }}
      >
        <Text style={{ fontSize: 16 }}>#{hashtag}</Text>
      </Text>
    </View>
  );
};

export default HashTagCard;

/*<ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/bitmoji-image.png")}
      > */
