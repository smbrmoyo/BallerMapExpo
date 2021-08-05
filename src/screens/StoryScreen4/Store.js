import {
  LayoutAnimation,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import data from "./data";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const VERTICAL_THRESHOLD = 200;
const HORIZONTAL_THRESHOLD = 60;

class Store {
  carouselOpen = true;
  offset = { top: height / 2, left: width / 2 };

  stories = data;
  deckIdx = 0;
  paused = false;
  backOpacity = 0;

  //const { navigation } = this.props;

  indicatorAnim = new Animated.Value(0);
  horizontalSwipe = new Animated.Value(0);
  verticalSwipe = new Animated.Value(0);

  swipedHorizontally = true;
  panResponder = null;

  constructor() {
    this.initPanResponder();
  }

  initPanResponder() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, { dx, dy }) => {
        if (Math.abs(dx) > 5) {
          this.swipedHorizontally = true;
          return true;
        }

        if (dy > 5) {
          this.swipedHorizontally = false;
          //this.carouselOpen = false;
          return true;
        }

        return false;
      },

      onPanResponderGrant: () => {
        if (this.swipedHorizontally) {
          this.horizontalSwipe.setOffset(this.horizontalSwipe._value);
          this.horizontalSwipe.setValue(0);
        }

        this.pause();
        this.setBackOpacity(0);
      },

      onPanResponderMove: (e, { dx, dy }) => {
        if (this.swipedHorizontally) {
          this.horizontalSwipe.setValue(-dx);
        } else {
          this.verticalSwipe.setValue(dy);
        }
      },

      onPanResponderRelease: (e, { dx, dy }) => {
        if (!this.swipedHorizontally) {
          if (dy > VERTICAL_THRESHOLD) return this.leaveStories();
          this.play();
          this.carouselOpen = false;
          return this.resetVerticalSwipe();
        }

        this.horizontalSwipe.flattenOffset();
        const deckIdx = this.deckIdx;

        if (dx > HORIZONTAL_THRESHOLD) {
          // previous deck
          if (deckIdx == 0) return this.leaveStories();

          return this.animateDeck(width * (deckIdx - 1), true);
        }

        if (dx < -HORIZONTAL_THRESHOLD) {
          // -> next deck
          if (deckIdx == this.stories.length - 1) return this.leaveStories();

          return this.animateDeck(width * (deckIdx + 1), true);
        }

        this.play();
        return this.animateDeck(width * deckIdx);
      },
    });
  }

  ///////////////////////////////////
  // Toggle Carousel
  ///////////////////////////////////

  openCarousel = (idx, offset) => {
    this.offset = offset;
    this.setDeckIdx(idx);
    this.horizontalSwipe.setValue(idx * width);

    requestAnimationFrame(() => {
      LayoutAnimation.easeInEaseOut();
      this.carouselOpen = true;
      this.animateIndicator(true);
    });
  };

  dismissCarousel = () => {
    LayoutAnimation.easeInEaseOut();
    this.carouselOpen = false;
    //goBack();
  };

  leaveStories() {
    if (this.swipedHorizontally) {
      this.animateDeck(width * this.deckIdx);
    } else {
      this.resetVerticalSwipe();
    }

    this.dismissCarousel();
  }

  ///////////////////////////////////
  // Setter Methods
  ///////////////////////////////////

  setPaused = (paused) => {
    this.paused = paused;
  };

  setDeckIdx = (deckIdx) => {
    this.deckIdx = deckIdx;
  };

  setBackOpacity = (backOpacity) => {
    this.backOpacity = backOpacity;
  };

  setStoryIdx = (idx) => {
    this.currentStory().idx = idx;
  };

  setCarousselClose = () => {
    this.carouselOpen = false;
  };

  setCarousselOpen = () => {
    this.carouselOpen = true;
  };

  ///////////////////////////////////
  // Toggle Indicator Animation
  ///////////////////////////////////

  pause = () => {
    this.setPaused(true);
    this.indicatorAnim.stopAnimation();
  };

  play = () => {
    if (this.paused) {
      this.setPaused(false);
      this.animateIndicator(false);
    }
  };

  animateIndicator = (reset = true) => {
    if (reset) this.indicatorAnim.setValue(0);

    requestAnimationFrame(() => {
      //console.log(this.indicatorAnim);
      //console.log(story.idx);
      Animated.timing(this.indicatorAnim, {
        toValue: 1,
        duration: 5000 * (1 - this.indicatorAnim._value),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          this.onNextItem();
        }
      });
    });
  };

  resetVerticalSwipe() {
    Animated.spring(this.verticalSwipe, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }

  ///////////////////////////////////
  // Navigate Story Items
  ///////////////////////////////////

  onNextItem = () => {
    if (this.paused) return this.play();

    const story = this.currentStory();

    if (story.idx >= story.items.length - 1) {
      return this.onNextDeck();
    }

    this.animateIndicator(true);
    this.setStoryIdx(story.idx + 1);
  };

  onPrevItem = () => {
    if (this.backOpacity == 1) this.setBackOpacity(0);

    const story = this.currentStory();

    if (story.idx == 0) return this.onPrevDeck();

    this.animateIndicator(true);
    this.setStoryIdx(story.idx - 1);
  };

  ///////////////////////////////////
  // Navigate Deck Items
  ///////////////////////////////////

  onNextDeck() {
    if (this.deckIdx >= this.stories.length - 1) return this.leaveStories();
    this.animateDeck((this.deckIdx + 1) * width, true);
  }

  onPrevDeck() {
    if (this.deckIdx == 0) return this.leaveStories();
    this.animateDeck((this.deckIdx - 1) * width, true);
  }

  animateDeck(toValue, reset = true) {
    if (reset) {
      this.setDeckIdx(parseInt(toValue / width));
      this.animateIndicator(reset);
    }

    Animated.spring(this.horizontalSwipe, {
      toValue,
      friction: 9,
      useNativeDriver: false,
    }).start();
  }

  ///////////////////////////////////
  // Computed properties
  ///////////////////////////////////

  currentStory() {
    if (this.stories.length <= 0) return null;
    return this.stories[this.deckIdx];
  }
}

export default new Store();
