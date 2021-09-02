import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  createRef,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  //Animated,
} from "react-native";
import Animated, {
  useCode,
  Value,
  set,
  eq,
  cond,
  not,
} from "react-native-reanimated";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import ProfilePicture from "../../components/ProfilePicture";
import LoadingScreen from "../../screens/LoadingScreen";
import FollowButton from "../../components/FollowButton";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "../../components/navigation/Providers/AuthProvider";
import { useProfile } from "../../components/navigation/Providers/ProfileProvider";
import { wsize, hsize } from "../../utils/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import UserModal from "./UserModal";
import people from "../../assets/data/people";

//render function

const ProfileScreen = ({ navigation, route }) => {
  // Alert for logout

  const LogoutAlert = () =>
    Alert.alert(
      `${username}`,
      "Are you sure you want to log out of BallerMap?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Logout", onPress: () => signOut(), style: "destructive" },
      ]
    );

  bsProf = useRef(null);
  fall = useRef(new Animated.Value(1)).current;
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, signOut } = useAuth();
  const [userExtraInfo, setUserExstraInfo] = useState(null);
  const { username } = useProfile();
  const isFocused = useIsFocused();

  function TabContainer(props) {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity>
          <Feather name="list" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      //title: "",
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("UserSearch")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="people-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>{username}</Text>
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
  }, [username]);

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
          onPress={() => bsProf.current.snapTo(1)}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>COVID-19 Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={LogoutAlert}
          activeOpacity={0.7}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const goToFollowing = (user) => {
    navigation.navigate("Following", {
      user: {
        id: user.uid,
      },
    });
  };

  const goToFollowers = (user) => {
    navigation.navigate("Followers", {
      user: {
        id: user.uid,
      },
    });
  };
  return (
    <>
      <StatusBar
        //translucent
        backgroundColor="white" /*transparent*/
        barStyle="dark-content"
      />

      <BottomSheet
        ref={bsProf}
        snapPoints={["60%", -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
        enabledContentGestureInteraction={true}
        enabledContentTapInteraction={false}
        overdragResistanceFactor={100}
      />
      <TouchableWithoutFeedback onPress={() => bsProf.current.snapTo(1)}>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 2,
            height: "100%",
            width: "100%",
            //opacity: Animated.add(0.05, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={styles.container}>
            <View style={styles.profileInitialContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("TryStory")}
              >
                <ProfilePicture size={70} />
              </TouchableOpacity>
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{username}</Text>
                <Text style={styles.profileType}>userExtraInfo.status</Text>
              </View>
            </View>
            <View style={styles.profileInfoContainer}>
              <View style={styles.profileInfo}>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color="#743cff"
                />
                <Text style={styles.textInfo}>
                  {/*userExtraInfo.city*/}
                  Paris, Rue du con
                </Text>
              </View>

              <TouchableOpacity activeOpacity={0.7} style={styles.profileInfo}>
                <EvilIcons name="link" size={20} color="black" />
                <Text style={styles.linkInfo}>userExtraInfo.link</Text>
              </TouchableOpacity>

              <View style={styles.userInfoWrapper}>
                <TouchableOpacity activeOpacity={0.7} onPress={goToFollowers}>
                  <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>1000</Text>
                    <Text style={styles.userInfoSubTitle}>Followers</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={goToFollowing}>
                  <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>100</Text>
                    <Text style={styles.userInfoSubTitle}>Following</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <View
                  style={{
                    //backgroundColor: "#D8D8D8",
                    marginVertical: hsize(5),
                    borderWidth: 2,
                    borderColor: "#E9E8E8",
                    borderRadius: 5,
                    height: 30,
                    width: "50%",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    /*shadowColor: "grey",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 10,*/
                  }}
                >
                  <Text style={{ fontSize: 16 }}> Edit Info </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TabContainer />
          </View>

          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                  shadowOpacity: 0.3,
                  elevation: 2.5,
                  borderRadius: 10,
                  height: hsize(80),
                  width: "95%",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: hsize(10),
                }}
                onPress={() => navigation.navigate("Attendance")}
              >
                <View>
                  <Text></Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    //paddingTop: hsize(44),
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    //marginBottom: 15,
    marginHorizontal: 10,
  },
  profileInitialContainer: {
    flexDirection: "row",
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(5),
  },
  profilePhoto: {
    width: wsize(80),
    height: wsize(80),
    borderRadius: wsize(40),
  },
  profileNameContainer: {
    marginLeft: wsize(22),
    justifyContent: "center",
    alignContent: "center",
  },
  profileName: {
    fontSize: wsize(24),
    fontWeight: "bold",
    color: "#262626",
  },
  profileType: {
    fontSize: wsize(14),
  },
  profileInfoContainer: {
    paddingHorizontal: wsize(10),
    paddingTop: hsize(10),
    marginBottom: hsize(2),
    alignSelf: "center",
    width: "100%",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wsize(5),
    paddingBottom: wsize(5),
  },
  textInfo: {
    fontSize: wsize(14),
    marginHorizontal: wsize(2),
  },
  linkInfo: {
    fontSize: wsize(14),
    color: "#003569",
  },
  followersContainer: {
    marginTop: hsize(7),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  followersContainerLeft: {
    marginTop: hsize(7),
    flexDirection: "row",
  },
  followersContainerRight: {
    marginTop: hsize(14),
    flexDirection: "row",
  },
  followers: {
    flexDirection: "row",
    marginRight: wsize(19),
  },
  followersNumbers: {
    fontSize: wsize(15),
    fontWeight: "bold",
    marginRight: wsize(3),
  },
  followersText: {
    fontSize: wsize(15),
    marginTop: hsize(3),
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    //width: "100%",
    //marginVertical: 10,
  },
  userInfoItem: {
    justifyContent: "center",
    alignItems: "center",
    //borderRightColor: '##E7E7E7',
    //borderRightWidth: 0.5,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  followersLittleButton: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    paddingHorizontal: wsize(10),
    marginLeft: wsize(4),
  },
  lbuttonText: {
    color: "#0148FF",
    fontSize: wsize(14),
  },
  tabContainer: {
    borderWidth: 1,
    height: hsize(50),
    width: "100%",
    alignItems: "center",
    borderColor: "#DADBDA",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  grabber: {
    width: 60,
    borderTopWidth: 5,
    borderTopColor: "#aaa",
    borderRadius: 2.5,
    marginVertical: 10,
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    //padding: 20,
    backgroundColor: "white",
    paddingTop: 10,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 2.5,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: hsize(30),
    marginBottom: hsize(10),
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: hsize(20),
    marginHorizontal: wsize(10),
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  panelButton: {
    padding: 15,
    //borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 7,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "flex-start",
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
