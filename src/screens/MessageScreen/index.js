import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
//import firebase from "@react-native-firebase/app";
//import firestore from "@react-native-firebase/firestore";
import MessageRow from "./MessageRow";
import debounce from "lodash/debounce";
import Bitmoji from "../../components/Bitmoji";
import Stories from "../../components/Stories";
import Header from "./Header";
import styles from "./styles";

const Messages = [
  {
    id: "1",
    userName: "__letch",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "AdrTnk",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Alicia",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "__letch",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "AdrTnk",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "6",
    userName: "Alicia",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "7",
    userName: "JonaKetch",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "8",
    userName: "TinaNjall",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "9",
    userName: "__letch",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "10",
    userName: "AdrTnk",
    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "11",
    userName: "Alicia",
    imageUri:
      "https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521",

    userImg: require("../../assets/images/bitmoji-image.png"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const MessageScreen = ({ props, navigation }) => {
  const [chats, setChats] = useState(Messages);
  const [text, setText] = useState("");
  const { colors, dark } = useTheme();
  let startAncestor;
  let startNode;

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  /*const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });*/

  const onChangeText = async (text) => {
    setText(text);
  };

  useEffect(() => {
    /*const unsuscribe = firebase
      .firestore()
      .collection("chats")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsuscribe;*/
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Direct Messages',
      //height: 100,
      headerLeft: () => (
        <View style={{ marginBottom: 0 }}>
          <Text style={styles.textHeader}>Direct Messages</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("MessageStack", { screen: "MessageSearch" })
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons name="search" size={24} color="#743cff" />
            </View>
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("MessageStack", { screen: "AddChat" })
              }
            >
              <Ionicons name="pencil-outline" size={24} color="#743cff" />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <>
      <StatusBar
        //translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <FlatList
          style={{ backgroundColor: "white" }}
          data={chats}
          keyExtractor={(item) => item.id}
          /*ListHeaderComponent={
            <View style={styles.headerContainer}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("MessageStack", {
                    screen: "MessageSearch",
                  })
                }
              >
                <View
                  style={[
                    styles.inputBox,
                    {
                      color: colors.text,
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderWidth: dark ? 1 : 0.5,
                    },
                  ]}
                >
                  <Text>Search</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          }*/
          /*ListHeaderComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput style={styles.searchInput} placeholder="Search" />
            </View>
          }*/
          renderItem={({ item }) => (
            <MessageRow
              chatName={item.userName}
              messageText={item.messageText}
              id={item.id}
              messageTime={item.messageTime}
              enterChat={enterChat}
              //size={50}
              uri={item.imageUri}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default MessageScreen;
