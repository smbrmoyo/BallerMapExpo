import React, { useEffect, useContext, useState, useRef } from "react";
import Realm from "realm";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FormButton from "../../components/FormButton";
import styles from "./styles";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { useHeaderHeight } from "@react-navigation/stack";
import { useProfile } from "../../components/navigation/Providers/ProfileProvider";
//import ImagePicker from "react-native-image-crop-picker";
import { AuthContext } from "../../components/navigation/AuthProvider";
import { useAuth } from "../../components/navigation/realmAuthProvider";
//import firestore from "@react-native-firebase/firestore";
//import storage from "@react-native-firebase/storage";

const EditProfileScreen = () => {
  const { user, profilePartition, logout } = useAuth();
  const { username, setUsername } = useProfile();
  const [modifUsername, setModifUsername] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const headerHeight = useHeaderHeight();
  const profileRealmRef = useRef();
  const usernameRef = useRef(username);

  const getUser = async () => {
    /*const currentUser = await firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });*/
  };

  const handleUpdate = async () => {
    //setUsername(modifUsername);

    // Open a realm
    const syncConfig = {
      user: user,
      partitionValue: profilePartition,
    };

    Realm.open(syncConfig)
      .then((result) => {
        profileRealmRef.current = result;
        if (profileRealmRef) {
          console.log("HANDLE UPDATE !!! : synced profile realm");
          result.write(() => {
            const uProfile = result.objects("uProfile")[0];
            if (usernameRef !== undefined) {
              // condition a executer plus haut / plus tot
              uProfile.username = usernameRef;
              setUsername(modifUsername);
              console.log(`HANDLE UPDATE !!! : username set to '${username}'`);
            }
          });
        }
      })
      .catch((error) => console.log(error));
    const profileRealm = profileRealmRef.current;
    profileRealm.close();
    profileRealmRef.current = null;
  };

  /*const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };*/

  /*const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };*/

  useEffect(() => {
    getUser();
  }, []);

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => console.log("takePhotoFromCamera")}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => console.log("choosePhotoFromLibrary")}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  var bsEditProf = useRef(null);
  var fallEditProf = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bsEditProf}
        snapPoints={[330, -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fallEditProf}
        enabledGestureInteraction={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => bsEditProf.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: image
                        ? image
                        : userData
                        ? userData.userImg ||
                          "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                        : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
                    }}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderColor: "#fff",
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
                {usernameRef.current ? usernameRef.current : "Chien"}
              </Text>
              {/* <Text>{user.uid}</Text> */}
            </View>

            <View style={styles.action}>
              <FontAwesome name="user-o" color="#333333" size={20} />
              <TextInput
                placeholder={usernameRef.current}
                placeholderTextColor="#CDCDCD"
                autoCorrect={false}
                autoCapitalize="none"
                /*value={usernameRef.current ? usernameRef.current : "Puto"}
                onChangeText={(txt) => {
                  usernameRef.current = txt;
                  //this.value = txt;
                }}*/
                value={modifUsername}
                onChangeText={(txt) => setModifUsername(txt)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#333333" size={20} />
              {/*<TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                value={userData ? userData.lname : ''}
                onChangeText={txt => setUserData({...userData, lname: txt})}
                autoCorrect={false}
                style={styles.textInput}
              />*/}
            </View>
            <View style={styles.action}>
              <Ionicons
                name="ios-clipboard-outline"
                color="#333333"
                size={20}
              />
              <TextInput
                multiline
                numberOfLines={3}
                placeholder="About Me"
                placeholderTextColor="#666666"
                value={userData ? userData.about : ""}
                onChangeText={(txt) => setUserData({ ...userData, about: txt })}
                autoCorrect={true}
                style={[styles.textInput, { height: 40 }]}
              />
            </View>
            <View style={styles.action}>
              <Feather name="phone" color="#333333" size={20} />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                value={userData ? userData.phone : ""}
                onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
                style={styles.textInput}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome name="globe" color="#333333" size={20} />
              <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.country : ""}
                onChangeText={(txt) =>
                  setUserData({ ...userData, country: txt })
                }
                style={styles.textInput}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                color="#333333"
                size={20}
              />
              <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.city : ""}
                onChangeText={(txt) => setUserData({ ...userData, city: txt })}
                style={styles.textInput}
              />
            </View>
            <FormButton buttonTitle="Update" onPress={handleUpdate} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;
