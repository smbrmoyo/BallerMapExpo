import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  Alert,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Platform,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
//import * as firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";
//import firebase from "@react-native-firebase/app";
//import auth from "@react-native-firebase/auth";
import { useAuth } from "../../components/navigation/Providers/AuthProvider";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfilePicture from "../../components/ProfilePicture";
import Bitmoji from "../../components/Bitmoji";
import styles from "./styles";

const ChatScreen = ({ data, size, navigation, route }) => {
  const headerHeight = useHeaderHeight();
  const scrollView = useRef();

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
      //headerBackTitleVisible: false,
      //headerTitle: (),
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.iconContainer}>
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <ProfilePicture size={40} />
          <Text style={styles.textHeader}>{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert("BottomSheet Profile")}
            style={{ justifyContent: "center" }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const [input, setInput] = useState("");
  const { user } = useAuth();
  console.log(user.email);
  const [messages, setMessages] = useState([
    {
      id: "6",
      data: {
        message: "Pourquoi tu es laid?",
        email: "brianmoyou",
      },
    },
    {
      id: "7",
      data: {
        message: "Gars",
        email: "maximefx@gmail.com",
      },
    },
    {
      id: "8",
      data: {
        message: "Je n'y peux rien",
        email: "maximefx@gmail.com",
      },
    },
    {
      id: "9",
      data: {
        message: "Assia vraiment",
        email: "brianmoyou",
      },
    },
    {
      id: "10",
      data: {
        message: "Tout va s'arranger",
        email: "brianmoyou",
      },
    },
  ]);

  const sendMessage = () => {
    //Keyboard.dismiss();
    /*firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        email: firebase.auth().currentUser.email,
      });*/
    setInput("");
  };

  useEffect(() => {
    /*const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;*/
  }, [route]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={headerHeight}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView
                ref={scrollView}
                contentContainerStyle={{ paddingTop: 10 }}
                onContentSizeChange={() =>
                  scrollView.current.scrollToEnd({ animated: true })
                }
                style={{ flex: 1 }}
              >
                {messages.map(({ id, data }) =>
                  data.email === user.email ? (
                    <View key={id} style={styles.sender}>
                      <Text style={styles.senderText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={styles.receiver}>
                      <Text style={styles.senderText}>{data.message}</Text>
                    </View>
                  )
                )}
              </ScrollView>

              <View style={styles.footer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => Alert.alert("BottomSheet Sharing Options")}
                >
                  <AntDesign name="plus" size={24} color="#743cff" />
                </TouchableOpacity>
                <TextInput
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  onSubmitEditing={sendMessage}
                  multiline
                  //textAlignVertical="top"
                  style={styles.textInput}
                  placeholder="Message..."
                />
                <TouchableOpacity activeOpacity={0.7} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#743cff" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;
