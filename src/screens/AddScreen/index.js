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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";

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

const AddScreen = ({ props, navigation, route }) => {
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  //const [dateTime, setDateTime] = useState("");
  //const [listUsers, setListUsers] = useState(null)
  //const { address, description, tags } = route.params;

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
        height: 80,
      },
      //headerTitleAlign: 'left',
      headerBackTitleVisible: true,
      //headerTitle: (),
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
        <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            //onPress={() => Alert.alert("BottomSheet Profile")}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.iconContainer}>
              <Feather name="plus" size={30} color="#743cff" />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView style={styles.screen}>
              <View style={styles.locationContainer}>
                <View style={styles.title}>
                  <View style={styles.iconTitleContainer}>
                    <Entypo name="location-pin" size={25} color={"#743cff"} />
                  </View>

                  <Text style={styles.titleLocation}>Location</Text>
                </View>
                <View style={styles.adressContainer}>
                  <GooglePlacesAutocomplete
                    placeholder="Address"
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      setAddress(details.geometry.location);
                      //console.log(details);
                    }}
                    enablePoweredByContainer={false}
                    suppressDefaultStyles
                    currentLocation={true}
                    currentLocationLabel="Current location"
                    styles={{
                      textInput: styles.textInput,
                      container: styles.autocompleteContainer,
                      listView: styles.listView,
                      separator: styles.separator,
                    }}
                    fetchDetails
                    query={{
                      key: "AIzaSyCL4evs3-ff9p7pd_KhW9fO-lcAybk6Lhk",
                      language: "en",
                    }}
                    renderRow={(data) => <PlaceRow data={data} />}
                    renderDescription={(data) =>
                      data.description || data.vicinity
                    }
                  />
                </View>
              </View>
              <View style={styles.dateContainer}>
                <View style={styles.title}>
                  <View style={styles.iconTitleContainer}>
                    <Entypo name="calendar" size={24} color="#743cff" />
                  </View>
                  <Text style={styles.titleLocation}>Date & Time</Text>
                </View>
                <View
                  style={{
                    height: 100,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                  }}
                >
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <View style={styles.title}>
                  <View style={styles.iconTitleContainer}>
                    <Ionicons name="pencil-outline" size={24} color="#743cff" />
                  </View>
                  <Text style={styles.titleLocation}>Description</Text>
                </View>

                <TextInput
                  style={styles.textInput}
                  placeholder="In a few words"
                  value={description}
                  //OnSubmitEditing={(text) => setDescription(text)}
                  //onEndEditing={(text) => setDescription(text)}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>

              <View style={styles.TagsContainer}>
                <View style={styles.title}>
                  <View style={styles.iconTitleContainer}>
                    <Fontisto name="hashtag" size={24} color="#743cff" />
                  </View>
                  <Text style={styles.titleLocation}>Hashtags</Text>
                </View>

                <TextInput
                  style={styles.textInput}
                  placeholder="#"
                  value={tags}
                  //OnSubmitEditing={(textTag) => setTags(textTag)}
                  //onEndEditing={(textTag) => setTags(textTag)}
                  onChangeText={(textTag) => setTags(textTag)}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={checkNavigation}
              >
                <Text style={{ fontWeight: "bold", color: "#743cff" }}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <View style={styles.usersContainer}></View>
              {/*<Text style={{ fontWeight: "bold" }}>{route.params.address.lat}</Text>
        <Text style={{ fontWeight: "bold" }}>{route.params.address.lng}</Text>*/}
            </ScrollView>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddScreen;
