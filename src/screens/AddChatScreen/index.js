import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import debounce from "lodash/debounce";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { SCText } from "../../components/SCText";
import Entypo from "react-native-vector-icons/Entypo";
import ProfilePicture from "../../components/ProfilePicture";
import styles from "./styles";
//import firebase from "@react-native-firebase/app";
//import firestore from "@react-native-firebase/firestore";

const AddChatScreen = ({ data, size, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Message",
    });
  }, [navigation]);

  const { colors, dark } = useTheme();
  const [text, setText] = useState("");

  const onChangeText = async (text) => {
    setText(text);
  };
  const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });

  const createChat = async () => {
    /*await firebase
      .firestore()
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));*/
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <View>
        <View style={styles.headerContainer}>
          <TextInput
            autoFocus
            onChangeText={onChangeTextDebounced}
            value={text}
            placeholder="Search"
            placeholderTextColor={colors.text}
            style={[
              styles.inputBox,
              {
                color: colors.text,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: dark ? 1 : 0.5,
              },
            ]}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cancelButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SCText>Cancel</SCText>
          </TouchableOpacity>
        </View>

        <View style={styles.searchResultsContainer}>
          <SCText style={styles.searchResultsContainerTitle}>Recent</SCText>
          {/*<FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={results}
            renderItem={({ item }) => {
              return renderChannelRow(item);
            }}
          />*/}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddChatScreen;
