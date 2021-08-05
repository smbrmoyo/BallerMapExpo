import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import ProfilePicture from "../../components/ProfilePicture";
import styles from "./styles";

const MessageRow = ({
  chatName,
  userName,
  messageText,
  messageTime,
  size,
  uri,
  enterChat,
  id,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Story");
        }}
      >
        <ProfilePicture size={50} uri={uri} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          enterChat(id, chatName);
        }}
      >
        <View style={styles.textSection}>
          <View style={styles.info}>
            <Text style={styles.userNameText}>{chatName}</Text>
            <Text style={styles.postTimeText}>{messageTime}</Text>
          </View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {messageText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MessageRow;
