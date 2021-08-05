// @flow
import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  Platform,
} from "react-native";

const Avatar = ({ user, avatar }) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.username}>{user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 10 : 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 16,
  },
  username: {
    color: "white",
    fontSize: 16,
  },
});

export default Avatar;
