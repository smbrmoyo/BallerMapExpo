import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  //Image,
  TouchableWithoutFeedback,
} from "react-native";
import store from "./Store";
import Indicator from "./Indicator";
import Image from "react-native-image-progress";
//import CircleSnail from 'react-native-progress/CircleSnail';
import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";

const circleSnailProps = { progress: 0.5, width: 80 };
const { width, height } = Dimensions.get("window");

const Story = ({ story, currentDeck }) => {
  navigation = useNavigation();

  CloseButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        {/*store.setCarousselClose */}
        <View style={styles.closeButton}>
          <View
            style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]}
          />
          <View
            style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  //console.log(story.items.length);

  Indicators = () => {
    return (
      <View style={styles.indicatorWrap}>
        <LinearGradient
          colors={["rgba(0,0,0,0.33)", "transparent"]}
          locations={[0, 0.95]}
          style={styles.indicatorBg}
        />

        <View style={styles.indicators}>
          {story.items.map((item, i) => (
            <Indicator
              key={i}
              i={i}
              animate={currentDeck && story.idx == i}
              story={story}
            />
          ))}
        </View>
      </View>
    );
  };

  BackButton = () => {
    return (
      <TouchableWithoutFeedback
        onPress={store.onPrevItem}
        onPressIn={() => store.setBackOpacity(1)}
        onLongPress={() => store.setBackOpacity(0)}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.33)", "transparent"]}
          locations={[0, 0.85]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.back,
            {
              opacity: store.backOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={store.onNextItem}
      delayPressIn={200}
      onPressIn={store.pause}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: story.items[story.idx].src }}
          style={styles.deck}
          indicator={ProgressBar}
          indicatorProps={circleSnailProps}
        />
        <Indicators story currentDeck />
        <CloseButton />
        <BackButton />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Story;

const styles = StyleSheet.create({
  deck: {
    width,
    height,
    backgroundColor: "white",
  },

  progressIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  indicatorWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  indicators: {
    height: 30,
    alignItems: "center",
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  indicatorBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },

  back: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 90,
  },

  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 70,
    height: 70,
    zIndex: 1,
  },
  closeCross: {
    position: "absolute",
    top: 32,
    right: 8,
    width: 20,
    height: 1,
    backgroundColor: "#fff",
  },
});
