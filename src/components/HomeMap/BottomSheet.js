import React from "react";
import BottomSheet from "reanimated-bottom-sheet";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { wsize, hsize } from "../../utils/Dimensions";
import ProfilePicture from "../ProfilePicture";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import people from "../../assets/data/people";

const BottomSheetMap = (props) => {
  navigation = useNavigation();

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderInner = () => (
    <View style={styles.panel}>
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
            <EvilIcons name="calendar" size={24} color="#743cff" />
            <Text style={styles.dateTimeInfo}>15.05.2021 14:00</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#E9E8E8",

              borderRadius: 15,
              height: hsize(40),
              width: wsize(150),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="share" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 10 }}>Share</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7} /*onPress={console.log("follow")}*/
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#743cff",
                borderWidth: 1,
                borderColor: "#E9E8E8",
                borderRadius: 15,
                height: hsize(40),
                width: wsize(150),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="bookmark-o" size={24} color="white" />
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                {"Confirm"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{ paddingHorizontal: wsize(20), marginVertical: hsize(5) }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "black",
              marginBottom: 5,
            }}
          >
            Who's coming?
          </Text>

          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 5,
              shadowOpacity: 0.4,
              elevation: 2.5,
              borderRadius: 10,
              height: "50%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Attendance")}>
              <FlatList
                data={people}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                numColumns={6}
                renderItem={(item) => (
                  <View style={{ margin: 5 }}>
                    <ProfilePicture size={hsize(40)} />
                  </View>
                )}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet
      ref={bsMap}
      snapPoints={["38%", "60%", -hsize(5)]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={2}
      //callbackNode={fallMap}
      overdragResistanceFactor={0}
      callbackThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    height: "100%",
    width: "100%",
    //padding: 20,
    backgroundColor: "white",
    paddingTop: hsize(10),
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
    paddingTop: hsize(10),
    borderTopLeftRadius: hsize(20),
    borderTopRightRadius: hsize(20),
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: wsize(40),
    height: hsize(6),
    borderRadius: hsize(3),
    backgroundColor: "#00000040",
    marginBottom: hsize(10),
  },
  panelTitle: {
    fontSize: 27,
    height: hsize(35),
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: hsize(30),
    marginBottom: hsize(10),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: hsize(44),
  },
  iconContainer: {
    height: hsize(40),
    width: wsize(40),
    borderRadius: hsize(20),
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'rgba(0,0,0,0.05)',
    //marginBottom: 15,
    marginHorizontal: wsize(10),
  },
  profileInitialContainer: {
    flexDirection: "row",
    paddingHorizontal: wsize(10),
    paddingVertical: hsize(10),
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
    margin: hsize(5),
  },
  textInfo: {
    fontSize: wsize(16),
  },
  dateTimeInfo: {
    fontSize: wsize(16),
    color: "#003569",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    //width: "100%",
    marginVertical: hsize(16),
  },
});

export default BottomSheetMap;
