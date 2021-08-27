import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Haptics from "expo-haptics";

import PlaceRow from "./PlaceRow";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import styles from "./styles";
import { wsize, hsize } from "../../utils/Dimensions";
import places from "../../assets/data/places";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";

navigator.geolocation = require("@react-native-community/geolocation");

const AddScreen = ({ props, navigation, route }) => {
  const [address, setAddress] = useState(null); // Put all this in one state and use ... operator
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState(""); // Should be list of strings. Will see with Max
  const [dateTime, setDateTime] = useState(new Date());

  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("#CDCDCD");

  const headerHeight = useHeaderHeight();

  const checkNavigation = () => {
    if (address && description && tags) {
      navigation.navigate("Map", {
        address,
        description,
        tags,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "white",
        //shadowColor: "black",
        //elevation: 5,
      },
      //headerTitleAlign: 'left',
      headerBackTitleVisible: true,
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>Create a run</Text>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={{ flexDirection: "row", margin: hsize(5) }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ justifyContent: "center" }}
          >
            <Entypo name="chevron-thin-left" size={24} color="#743cff" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginHorizontal: wsize(10) }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("UserSearch")} // Should have a userSearchAddScreen
            style={{ justifyContent: "center" }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="people-outline" size={24} color="#743cff" />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  function pad2(string) {
    return `0${string}`.slice(-2);
  }

  const readableDate = (d) => {
    if (!d) return undefined;
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(
      d.getDate()
    )} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  };

  function impactAsync(style) {
    switch (style) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />

      <DateTimePickerModal
        isVisible={visible}
        mode="datetime"
        display="spinner"
        onConfirm={(datum) => (
          setDateTime(datum), setVisible(false), setColor("#743cff")
        )}
        onCancel={() => setVisible(false)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        //keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View
            //animation="fadeInUpBig"
            style={{
              padding: 10,
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <View style={styles.descriptionContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Name</Text>
              </View>

              <TextInput
                style={{
                  padding: hsize(10),
                  backgroundColor: "#eee",
                  marginVertical: hsize(5),
                  borderRadius: hsize(5),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
                placeholder="Give your run a name"
                placeholderTextColor="#CDCDCD"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Address</Text>
              </View>
              <View style={styles.adressContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PlaceSearch")}
                >
                  <View
                    style={{
                      padding: hsize(10),
                      backgroundColor: "#eee",
                      marginVertical: hsize(5),
                      borderRadius: hsize(5),
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}
                  >
                    <Text style={{ color: "#CDCDCD" }}>Find an Address</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Description</Text>
              </View>

              <TextInput
                style={{
                  padding: hsize(10),
                  backgroundColor: "#eee",
                  marginVertical: hsize(5),
                  borderRadius: hsize(5),
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
                placeholder="In a few words"
                multiline
                placeholderTextColor="#CDCDCD"
                value={description}
                //OnSubmitEditing={(text) => setDescription(text)}
                //onEndEditing={(text) => setDescription(text)}
                onChangeText={(text) => setDescription(text)}
              />
            </View>

            <View style={styles.TagsContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Hashtags</Text>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="#"
                placeholderTextColor="#CDCDCD"
                value={tags}
                //OnSubmitEditing={(textTag) => setTags(textTag)}
                //onEndEditing={(textTag) => setTags(textTag)}
                onChangeText={(textTag) => setTags(textTag)}
              />
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Date & Time</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setVisible(true)}
              >
                <View style={styles.textInput}>
                  <Text style={{ color: color, fontSize: 16 }}>
                    {readableDate(dateTime)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                //width: "100%",
                marginVertical: hsize(40),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#E9E8E8",
                    borderRadius: 5,
                    height: hsize(40),
                    width: wsize(100),
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "red", // On cancel alert
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                /*onPress={() => (
                  checkNavigation(),
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  )
                )}*/
                onPress={app.currentUser.callFunction("createEvent", event)
                    .then()}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#E9E8E8",
                    borderRadius: 5,
                    height: hsize(40),
                    width: wsize(100),
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#743cff",
                    }}
                  >
                    Confirm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddScreen;
