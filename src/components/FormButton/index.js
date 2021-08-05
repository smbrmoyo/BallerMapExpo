import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.buttonContainer}
      {...rest}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: windowHeight / 17,
    backgroundColor: "#2e64e5",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
