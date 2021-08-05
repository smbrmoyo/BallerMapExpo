import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({ buttonTitle, btnType, color, onPress, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.buttonContainer} {...rest}>
        <View style={styles.iconWrapper}>
          <FontAwesome
            name={btnType}
            style={styles.icon}
            size={22}
            color={color}
          />
        </View>
        <View style={styles.btnTxtWrapper}>
          <Text style={[styles.buttonText, { color: color }]}>
            {buttonTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    elevation: 5,
  },
  iconWrapper: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontWeight: "bold",
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
