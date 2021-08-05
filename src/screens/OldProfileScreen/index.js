import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useCode,
  Value,
  set,
  eq,
  cond,
  not,
} from "react-native-reanimated";
//import firestore from "@react-native-firebase/firestore";
//import firebase from "@react-native-firebase/app";
//import auth from "@react-native-firebase/auth";
import BottomSheet from "reanimated-bottom-sheet";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import { AuthContext } from "../../components/navigation/AuthProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";

const OldProfileScreen = ({ data, size, navigation, route }) => {
  //bsProf = useRef();
  //fall = useRef(new Animated.Value(1)).current;

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
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.panelButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <AntDesign name="edit" size={30} color="black" />
          <Text style={styles.panelButtonTitle}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.panelButton}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.panelButtonTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.panelButton}
          onPress={() => this.bsProf.current.snapTo(1)}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>COVID-19 Information</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {/*<BottomSheet
        ref={bsProf}
        snapPoints={["60%", 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
        enabledContentGestureInteraction={true}
        enabledContentTapInteraction={false}
        overdragResistanceFactor={100}
      />*/}
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          //opacity: Animated.add(0.05, Animated.multiply(this.fall, 1.0)),
        }}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <SafeAreaView style={styles.screen}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.profilepic}>
                <ProfilePicture size={80} />
              </View>
              <Text style={styles.userName}>
                {"@"}
                {/*firebase.auth().currentUser.email*/}
              </Text>
              <View style={styles.userInfoWrapper}>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>10</Text>
                  <Text style={styles.userInfoSubTitle}>Posts</Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>1000</Text>
                  <Text style={styles.userInfoSubTitle}>Followers</Text>
                </View>
                <View style={styles.userInfoItem}>
                  <Text style={styles.userInfoTitle}>100</Text>
                  <Text style={styles.userInfoSubTitle}>Following</Text>
                </View>
              </View>
              <View style={styles.separator}>
                <View style={styles.iconPost}>
                  <AntDesign name="adduser" size={30} color="black" />
                </View>
                <View style={styles.iconTags}>
                  <AntDesign name="adduser" size={30} color="grey" />
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.userBtn}
                onPress={() => logout()}
              >
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
};

export default OldProfileScreen;
