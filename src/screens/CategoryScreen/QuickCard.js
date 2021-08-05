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
import { LinearGradient } from "expo-linear-gradient";
//import firestore from "@react-native-firebase/firestore";
//import firebase from "@react-native-firebase/app";
//import auth from "@react-native-firebase/auth";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import { AuthContext } from "../../components/navigation/AuthProvider";
import styles from "./styles";

const QuickCard = ({ props, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        borderRadius: 25,
        padding: 5,
        marginHorizontal: 5,
        height: 50,
        flexDirection: "row",
        backgroundColor: "white",
        shadowColor: "grey",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <ProfilePicture size={30} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18 }}>__letch</Text>
        <Text style={{ fontSize: 12, color: "grey" }}>Maxime Tchagou</Text>
      </View>
    </View>
  );
};

export default QuickCard;

/*<ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/bitmoji-image.png")}
      > */
