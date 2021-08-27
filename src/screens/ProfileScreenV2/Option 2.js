import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
//import { window, wsize, hsize } from "../entities/constants";

export default function ({
  title,
  setModalVisible,
  navigation,
  textStyle,
  navigateTo,
  children,
  ...props
}) {
  if (setModalVisible) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.modalOption}
        onPress={() => {
          navigation.navigate(navigateTo);
          setModalVisible(false);
        }}
      >
        {children}
        <Text style={[styles.modalOptionText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.modalOption}
        onPress={() => {
          navigation.navigate(navigateTo);
        }}
      >
        {children}
        <Text style={[styles.modalOptionText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modalOption: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DADBDA",
    padding: 4,
    paddingLeft: 19,
  },
  modalOptionText: {
    fontSize: 18,
  },
});
