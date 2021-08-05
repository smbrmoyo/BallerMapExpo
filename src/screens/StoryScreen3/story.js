import React, { useState } from "react";
import {
  StatusBar,
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Avatar from "./Avatar";

function CloseButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        close();
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          paddingHorizontal: 15,
        }}
      >
        <Ionicons name="ios-close" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const Story = ({ source, user, avatar }) => {
  const [input, setInput] = useState("");

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <ImageBackground source={source} style={styles.image}>
            <View style={styles.userInfo}>
              {/*<ProfilePicture uri={storiesData[0].user.imageUri} size={50} />
              <Text style={styles.userName}>{storiesData[0].user.name}</Text>
              <Text style={styles.postedTime}>{storiesData[0].createdAt}</Text>*/}
              <Avatar user={user} avatar={avatar} />
            </View>
            <View style={styles.bottomContainer}>
              <TextInput
                value={input}
                //editable
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={() => Alert.alert("Commenting")}
                multiline
                //textAlignVertical="top"
                style={styles.textInput}
                placeholder="Message..."
                placeholderTextColor="white"
              />

              <View style={styles.messageButton}>
                <Ionicons name="send" size={24} color="white" />
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    //flexDirection: "row",
    //justifyContent: "space-between",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    height: 28,
    width: 250,
    borderRadius: Platform.OS === "android" ? 0 : 10,
  },
});*/

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  postedTime: {
    marginLeft: 10,
    fontWeight: "700",
    color: "#808080",
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  cameraButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
  },
  messageButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    //bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    color: "grey",
    borderRadius: 30,
    textAlignVertical: "top",
    fontSize: 16,
    paddingTop: Platform.OS === "ios" ? 10 : 0,
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    height: 40,
  },
});

export default Story;
