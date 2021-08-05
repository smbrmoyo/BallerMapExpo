import React, { useState, useEffect, createRef, useRef } from "react";
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
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import ProfilePicture from "../../components/ProfilePicture";
import { wsize, hsize } from "../../utils/Dimensions";
import styles from "./styles";
import BottomSheet from "reanimated-bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const DescripTry = () => {
  bsDescr = useRef(null);
  fallDescr = useRef(new Animated.Value(1)).current;

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderInner = () => (
    <View style={styles.panel}>
      {/*<View style={styles.row}>
        <AntDesign name="adduser" size={30} color="black" />
        <Text style={styles.panelTitle}>Settings</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('EditProfile')}>
        <View style={styles.row}>
          <AntDesign name="adduser" size={30} color="black" />
          <Text style={styles.panelTitle}>EditProfile</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <AntDesign name="adduser" size={30} color="black" />
        <Text style={styles.panelTitle}>Abcde</Text>
      </View>
      <View style={styles.row}>
        <AntDesign name="adduser" size={30} color="black" />
        <Text style={styles.panelTitle}>Abcde</Text>
      </View>
      <View style={styles.row}>
        <AntDesign name="adduser" size={30} color="black" />
        <Text style={styles.panelTitle}>Abcde</Text>
      </View>*/}
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
    </View>
  );

  return (
    <>
      <BottomSheet
        ref={bsDescr}
        snapPoints={["60%", -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fallDescr}
        enabledBottomClamp={true}
        overdragResistanceFactor={20}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Open Sheet"
          onPress={() => {
            bsDescr.current.snapTo(0);
          }}
        />
      </View>
    </>
  );
};

export default DescripTry;
