import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePicture from "../ProfilePicture";
import styles from "./styles";

const Story = ({ imageUri, name }) => {
  /*const {
    story: {
      user: {
        id,
        image,
        name
      }
    }
  } = props;*/

  const navigation = useNavigation();

  const goToStory = () => {
    navigation.navigate("Story" /*{ userId: id }*/);
  };

  return (
    <Pressable onPress={goToStory}>
      <View style={styles.container}>
        <ProfilePicture uri={imageUri} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default Story;
