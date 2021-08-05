import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import HomeMap from "../../components/HomeMap";
import NewHomeMap from "../../components/NewHomeMap";
import Bitmoji from "../../components/Bitmoji";
import Stories from "../../components/Stories";
import styles from "./styles";

const MapScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <View style={styles.screen}>
        <HomeMap />
      </View>
    </>
  );
};

export default MapScreen;
