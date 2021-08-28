import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import HomeMap from "../../components/HomeMap";
import { useAuth } from "../../components/navigation/Providers/AuthProvider";
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

  const { loadingUser } = useAuth();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />

      {loadingUser ? (
        <View style={styles.screenLoading}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View style={styles.screen}>
          <HomeMap />
        </View>
      )}
    </>
  );
};

export default MapScreen;
