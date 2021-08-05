// @flow
import React, { Component, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions, Platform } from "react-native";
import Story from "./Story";
//import storiesData from "../../assets/data/stories";

const { width, height } = Dimensions.get("window");
const ratio = Platform.OS === "ios" ? 2 : 1.1;
const perspective = 400;
const angle = Math.atan(perspective / (width / 2));

const storiesData = [
  {
    id: "2",
    source: require("../../assets/stories/2.jpg"),
    user: "derek.russel",
    avatar: require("../../assets/avatars/derek.russel.png"),
  },
  {
    id: "4",
    source: require("../../assets/stories/4.jpg"),
    user: "jmitch",
    avatar: require("../../assets/avatars/jmitch.png"),
  },
  {
    id: "5",
    source: require("../../assets/stories/5.jpg"),
    user: "monicaa",
    avatar: require("../../assets/avatars/monicaa.png"),
  },

  {
    id: "1",
    source: require("../../assets/stories/1.jpg"),
    user: "andrea.schmidt",
    avatar: require("../../assets/avatars/andrea.schmidt.png"),
  },
];

function StoryList(props) {
  return (
    <Animated.ScrollView
      ref={props.scroll}
      style={StyleSheet.absoluteFillObject}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}
      snapToInterval={width}
      contentContainerStyle={{
        width: width * storiesData.length,
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: props.x,
              },
            },
          },
        ],
        {
          useNativeDriver: true,
        }
      )}
      decelerationRate={"fast"}
      horizontal
    />
  );
}

function Screen(props) {
  const offsetY = 2 * height;
  const inputRangeY = [offsetY - height, offsetY + height];
  const y = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      //ref={props.scroll}
      //showsHorizontalScrollIndicator={false}
      //scrollEventThrottle={1}
      //snapToInterval={height}
      //key={index}
      style={[
        StyleSheet.absoluteFillObject,
        {
          transform: [
            {
              translateY: y.interpolate({
                inputRangeY,
                outputRange: [height / ratio, -height / ratio],
                extrapolate: "clamp",
              }),
            },
          ],
        },
      ]}
    ></Animated.View>
  );
}

const Swipe = () => {
  const x = useRef(new Animated.Value(0)).current;

  const scroll = useRef();
  const screen = useRef();

  const getStyle = (index) => {
    const offset = index * width;
    const inputRange = [offset - width, offset + width];
    const inputRangeY = [offset - height, offset + height];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: "clamp",
    });

    /*const translateY = x.interpolate({
      inputRange,
      outputRange: [height / ratio, -height / ratio],
      extrapolate: "clamp",
    });*/

    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: "clamp",
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: "clamp",
    });

    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: "clamp",
    });

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        //{ translateY },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 },
      ],
    };
  };

  const getMaskStyle = (index) => {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: "clamp",
    });
    return {
      backgroundColor: "black",
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {storiesData.map((story, index) => (
        <Animated.View style={getStyle(index)} key={story.id}>
          {
            <Story
              source={story.source}
              user={story.user}
              avatar={story.avatar}
            />
          }
          <Animated.View style={getMaskStyle(index)} />
        </Animated.View>
      ))}

      {/* List of Stories */}
      <Screen>
        <StoryList x={x} scroll={scroll} />
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default Swipe;
