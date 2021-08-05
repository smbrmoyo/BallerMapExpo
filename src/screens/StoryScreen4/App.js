import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  UIManager,
  Platform,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Stories from "./Stories";
import store from "./Store";
import Bubbles from "./Bubble";

const { width, height } = Dimensions.get("window");

const StoryScreen4 = () => {
  navigation = useNavigation();
  StatusBar.setHidden(true);

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.carouselWrap,
            store.offset,
            store.carouselOpen ? styles.open : navigation.goBack(),
          ]}
        >
          <Stories />
        </View>
      </View>
    </>
  );
};

export default StoryScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  carouselWrap: {
    overflow: "hidden",
    position: "absolute",
  },
  closed: {
    width,
    height,
    backgroundColor: "red",
  },
  open: {
    width,
    height,
    top: 0,
    left: 0,
  },

  btn: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "black",
  },
});
