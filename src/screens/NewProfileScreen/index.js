import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import styles from "./styles";

export default function NewProfileScreen() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.ProfileImage}>
              <Image
                source={require("../../assets/images/bitmoji-image.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.dn}>
              <MaterialIcons name="chat" size={30} color="#DFD8C8" />
            </View>
            <View style={styles.texts}>
              <Text style={styles.titletext}>Brian Moyou</Text>
              <Text style={styles.subtitletext}>@smbrmoyo</Text>
            </View>
          </View>
          <View style={styles.statscontainer}>
            <View style={styles.statsbox}>
              <Text style={{ fontSize: 24 }}>4</Text>
              <Text style={styles.statstext}>posts</Text>
            </View>
            <View style={styles.statsbox}>
              <Text style={{ fontSize: 24 }}>567</Text>
              <Text style={styles.statstext}>followers</Text>
            </View>
            <View style={styles.statsbox}>
              <Text style={{ fontSize: 24 }}>36</Text>
              <Text style={styles.statstext}>following</Text>
            </View>
          </View>
          {
            <View style={styles.followview}>
              <TouchableOpacity activeOpacity={0.7} style={styles.follow}>
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: 20,
                    fontWeight: "800",
                    color: "#fff",
                  }}
                >
                  Something
                </Text>
              </TouchableOpacity>
            </View>
          }
          <View style={styles.separator}>
            <View style={styles.iconPost}>
              <MaterialCommunityIcons name="grid" size={24} color="black" />
            </View>
            <View style={styles.iconTags}>
              <Feather name="user" size={24} color="black" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
