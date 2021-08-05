import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Bitmoji from "../../components/Bitmoji";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import styles from "./styles";

const OnboardingScreen = ({ navigation }) => {
  const Skip = ({ ...props }) => (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Text style={styles.button}> Skip </Text>
    </TouchableOpacity>
  );
  const Next = ({ ...props }) => (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Text style={styles.button}> Next </Text>
    </TouchableOpacity>
  );
  const Done = ({ ...props }) => (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Text style={styles.button}> Done </Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DoneButtonComponent={Done}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      onSkip={() => navigation.replace("SignInSocial")}
      onDone={() => navigation.navigate("SignInSocial")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.imageOne}
              source={require("../../assets/images/bitmoji-image.png")}
            />
          ),
          title: "Onboarding 1",
          subtitle: "FIRST TEXT",
        },
        {
          backgroundColor: "orange",
          image: (
            <Image
              style={styles.imageThree}
              source={require("../../assets/images/bitmoji-image.png")}
            />
          ),
          title: "Onboarding 2",
          subtitle: "SECOND TEXT",
        },
        {
          backgroundColor: "grey",
          image: (
            <Image
              style={styles.imageTwo}
              source={require("../../assets/images/bitmoji-image.png")}
            />
          ),
          title: "Onboarding 3",
          subtitle: "THIRD TEXT",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
