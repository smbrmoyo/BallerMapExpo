import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  //ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../components/navigation/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import styles from "./styles";

const DescriptionScreen = ({ props, navigation, route }) => {
  const { user, logout } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      //headerTitleAlign: 'left',
      //headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <View style={styles.iconContainer}>
            <AntDesign name="adduser" size={30} color="black" />
          </View>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>
              {/*firebase.auth().currentUser.email*/}
              email
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            bsProf.current.snapTo(0);
          }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileInitialContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("TryStory")}
          >
            <ProfilePicture size={70} />
          </TouchableOpacity>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>user.email</Text>
            <Text style={styles.profileType}>userExtraInfo.status</Text>
          </View>
        </View>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <SimpleLineIcons name="location-pin" size={20} color="#743cff" />
            <Text style={styles.textInfo}>
              {/*userExtraInfo.city*/}
              Paris, Rue du con
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.profileInfo}>
            <EvilIcons name="link" size={20} color="black" />
            <Text style={styles.linkInfo}>userExtraInfo.link</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoWrapper}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E9E8E8",
              borderRadius: 5,
              height: 30,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Message</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={console.log("follow")}>
            <View
              style={{
                backgroundColor: "#743cff",
                borderWidth: 1,
                borderColor: "#E9E8E8",
                borderRadius: 5,
                height: 30,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"Follow"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DescriptionScreen;
