import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";

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

const { width, height } = Dimensions.get("window");

const StoryScreen3 = () => {
  const VERTICAL_THRESHOLD = 80;
  const HORIZONTAL_THRESHOLD = 60;

  const carouselOpen = false;
  const offset = { top: height / 2, left: width / 2 };

  const stories = storiesData;
  const deckIdx = 0;
  const paused = false;
  const backOpacity = 0;

  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const horizontalSwipe = useRef(new Animated.Value(0)).current;
  const verticalSwipe = useRef(new Animated.Value(0)).current;

  var swipedHorizontally = true;

  const value = useRef(new Animated.ValueXY(0)).current;

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (evt, { dx, dy }) => {
        if (Math.abs(dx) > 5) {
          swipedHorizontally = true;
          console.log("horizontal");
          return true;
        }

        if (dy > 5) {
          swipedHorizontally = false;
          return true;
        }

        return false;
      },
      onPanResponderGrant: () => {
        if (swipedHorizontally) {
          console.log("hori");

          horizontalSwipe.setOffset(horizontalSwipe._value);
          horizontalSwipe.setValue(0);
        }

        //pause();
        //setBackOpacity(0);
      },
      onPanResponderMove: (e, { dx, dy }) => {
        if (swipedHorizontally) {
          horizontalSwipe.setValue(-dx);
        } else {
          verticalSwipe.setValue(dy);
        }
      },
      onPanResponderRelease: (e, { dx, dy }) => {
        if (!swipedHorizontally) {
          if (dy > VERTICAL_THRESHOLD) return leaveStories();
          play();
          return resetVerticalSwipe();
        }

        horizontalSwipe.flattenOffset();
        const deckIdx = deckIdx;

        if (dx > HORIZONTAL_THRESHOLD) {
          // previous deck
          if (deckIdx == 0) return leaveStories();

          return animateDeck(width * (deckIdx - 1), true);
        }

        if (dx < -HORIZONTAL_THRESHOLD) {
          // -> next deck
          if (deckIdx == stories.length - 1) return leaveStories();

          return animateDeck(width * (deckIdx + 1), true);
        }

        play();
        return animateDeck(width * deckIdx);
      },
    })
  ).current;

  ///////////////////////////////////
  // Toggle Carousel
  ///////////////////////////////////

  const openCarousel = (idx, offset) => {
    offset = offset;
    setDeckIdx(idx);
    horizontalSwipe.setValue(idx * width);

    requestAnimationFrame(() => {
      LayoutAnimation.easeInEaseOut();
      carouselOpen = true;
      animateIndicator();
    });
  };

  const dismissCarousel = () => {
    LayoutAnimation.easeInEaseOut();
    carouselOpen = false;
  };

  const leaveStories = () => {
    if (swipedHorizontally) {
      animateDeck(width * deckIdx);
    } else {
      resetVerticalSwipe();
    }

    dismissCarousel();
  };

  ///////////////////////////////////
  // Setter Methods
  ///////////////////////////////////

  const setPaused = (paused) => {
    paused = paused;
  };

  const setDeckIdx = (deckIdx) => {
    deckIdx = deckIdx;
  };

  const setBackOpacity = (backOpacity) => {
    backOpacity = backOpacity;
  };

  const setStoryIdx = (idx) => {
    currentStory.idx = idx;
  };

  ///////////////////////////////////
  // Toggle Indicator Animation
  ///////////////////////////////////

  const pause = () => {
    setPaused(true);
    indicatorAnim.stopAnimation();
  };

  const play = () => {
    if (paused) {
      setPaused(false);
      animateIndicator(false);
    }
  };

  const animateIndicator = (reset = true) => {
    if (reset) indicatorAnim.setValue(0);

    requestAnimationFrame(() => {
      Animated.timing(indicatorAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 5000 * (1 - indicatorAnim._value),
      }).start(({ finished }) => {
        if (finished) onNextItem();
      });
    });
  };

  const resetVerticalSwipe = () => {
    Animated.spring(verticalSwipe, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  ///////////////////////////////////
  // Navigate Story Items
  ///////////////////////////////////

  const onNextItem = () => {
    if (paused) return play();

    const story = currentStory;

    if (story.idx >= story.items.length - 1) return onNextDeck();

    animateIndicator();
    setStoryIdx(story.idx + 1);
  };

  const onPrevItem = () => {
    if (backOpacity == 1) setBackOpacity(0);

    const story = currentStory;

    if (story.idx == 0) return onPrevDeck();

    animateIndicator();
    setStoryIdx(story.idx - 1);
  };

  ///////////////////////////////////
  // Navigate Deck Items
  ///////////////////////////////////

  const onNextDeck = () => {
    if (deckIdx >= stories.length - 1) return leaveStories();
    animateDeck((deckIdx + 1) * width, true);
  };

  const onPrevDeck = () => {
    if (deckIdx == 0) return leaveStories();
    animateDeck((deckIdx - 1) * width, true);
  };

  const animateDeck = (toValue, reset = false) => {
    if (reset) {
      setDeckIdx(parseInt(toValue / width));
      animateIndicator();
    }

    Animated.spring(horizontalSwipe, {
      toValue,
      friction: 9,
      useNativeDriver: true,
    }).start();
  };

  ///////////////////////////////////
  // Computed properties
  ///////////////////////////////////

  const currentStory = () => {
    if (stories.length <= 0) return null;
    return stories[deckIdx];
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {storiesData.map((story, idx) => {
        let scale = verticalSwipe.interpolate({
          inputRange: [-1, 0, height],
          outputRange: [1, 1, 0.75],
        });

        if (swipedHorizontally) {
          scale = horizontalSwipe.interpolate({
            inputRange: [width * (idx - 1), width * idx, width * (idx + 1)],
            outputRange: [0.79, 1, 0.78],
          });
        }

        return (
          <Animated.View
            key={idx}
            style={[
              styles.deck,
              {
                transform: [
                  {
                    translateX: horizontalSwipe.interpolate({
                      inputRange: [
                        width * (idx - 1),
                        width * idx,
                        width * (idx + 1),
                      ],
                      outputRange: [width, 0, -width],
                    }),
                  },
                  {
                    translateY: verticalSwipe.interpolate({
                      inputRange: [-1, 0, height],
                      outputRange: [0, 0, height / 2],
                    }),
                  },
                  { scale },
                ],
              },
            ]}
          >
            <Story story={story} currentDeck={deckIdx == idx} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default StoryScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  deck: {
    position: "absolute",
    width,
    height,
    top: 0,
    left: 0,
  },
});
