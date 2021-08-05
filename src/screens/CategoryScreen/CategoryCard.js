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

const CategoryCard = ({ props, navigation }) => {
  return (
    <View style={{ flex: 2, alignItems: "center" }}>
      <ImageBackground
        style={{ flex: 2, width: "30%", height: 100 }}
        source={require("../../assets/images/bitmoji-image.png")}
      >
        <Text style={{ fontSize: 30 }}>Card</Text>
      </ImageBackground>
    </View>
  );
};

export default CategoryCard;
