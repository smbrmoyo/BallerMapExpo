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
  StyleSheet,
} from "react-native";
//import firestore from "@react-native-firebase/firestore";
//import firebase from "@react-native-firebase/app";
//import auth from "@react-native-firebase/auth";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import { AuthContext } from "../../components/navigation/AuthProvider";
import styles from "./styles";
import { BlurView } from "expo-blur";

const PopularCard = ({ props, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        borderRadius: 20,
        overflow: "hidden",
        //padding: 5,
        marginHorizontal: 5,
        height: 70,
      }}
    >
      <Image
        style={{ height: "100%", width: "100%", borderRadius: 20 }}
        source={{
          uri: "https://i.insider.com/5d03aa8e6fc9201bc7002b43?width=1136&format=jpeg",
        }}
      />
      <BlurView
        intensity={50}
        tint={"dark"}
        style={[
          StyleSheet.absoluteFill,
          styles.nonBlurredContent,
          styles.blurViewCard,
        ]}
      >
        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
            color: "white",
          }}
        >
          Area
        </Text>
      </BlurView>
    </View>
  );
};

export default PopularCard;

/*<ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/images/bitmoji-image.png")}
      > */
