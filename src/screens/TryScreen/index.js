import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useCode, Value, set, eq, cond, not } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const TryScreen = (props) => {
  this.animatedValue = useRef(new Animated.Value(0)).current;

  this.animatedValue.addListener(({ value }) => (this._value = value));

  Animated.timing(this.animatedValue, {
    toValue: 100,
    duration: 500,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        style={{ position: "absolute", top: 50 }}
        title="press"
        onPress={() => console.log("pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grabber: {
    width: 60,
    borderTopWidth: 5,
    borderTopColor: "#aaa",
    borderRadius: 2.5,
    marginVertical: 10,
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export default TryScreen;
