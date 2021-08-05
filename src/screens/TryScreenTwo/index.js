import React, {useState, useEffect} from 'react';
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
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const TryScreenTwo = props => {
  const dimensions = useWindowDimensions();

  const sommet = useSharedValue(700);

  console.log(sommet.value);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: sommet.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    /*onActive(event) {
      top.value = event.translationY;
    },*/
  });

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Open Sheet"
          onPress={() =>
            (sommet.value = withSpring(windowHeight / 2, SPRING_CONFIG))
          }
        />
      </View>
      <PanGestureHandler>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <Text>SHEET</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grabber: {
    width: 60,
    borderTopWidth: 5,
    borderTopColor: '#aaa',
    borderRadius: 2.5,
    marginVertical: 10,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'grey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TryScreenTwo;
