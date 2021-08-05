import React, { useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import store from "./Store";

const Indicator = ({ animate, seen, coming, story, i }) => {
  const [width, setWidth] = useState(0);

  setWidthFromLayout = (event) => {
    setWidth(event.nativeEvent.layout);
  };

  let style = {};

  if (animate) {
    style = {
      width: store.indicatorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width],
        extrapolate: "clamp",
      }),
    };
  } else if (story.idx > i) {
    console.log(story.idx + "seen");
    // seen
    style = { flex: 1 };
  } else if (story.idx <= i + "coming") {
    // coming
    style = { width: 0 };
  }

  return (
    <View
      style={styles.line}
      onLayout={() => {
        setWidthFromLayout;
      }}
    >
      <Animated.View style={[styles.progress, style]} />
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 1,
    height: 2,
  },
  progress: {
    backgroundColor: "rgba(255,255,255,0.4)",
    height: 2,
  },
});
