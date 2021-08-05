import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
} from "react-native";

import { Video } from "expo-av";

import { NavigationStackScreenProps } from "react-navigation-stack";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { AppState } from "../redux/reducers";
import { IMedia } from "../redux/types/mediaTypes";
import { AVPlaybackStatus } from "expo-av/build/AV";

type MediaDescriptionProps = NavigationStackScreenProps & ILinkStateProps;

const MediaDescription: React.FC<MediaDescriptionProps> = (props) => {
  const { colors, dark } = useTheme();
  const [text, setText] = useState("");
  const media = props.media;
  const onFinish = props.navigation.getParam(
    "onFinish",
    () => null
  ) as () => void;

  const returnToMessages = () => {
    onFinish();
    props.navigation.goBack();
  };

  const onStatusChange = (video: AVPlaybackStatus) => {
    if (video.isLoaded) {
      if (video.didJustFinish) {
        returnToMessages();
      }
    }
  };

  const onChangeText = (text) => {
    setText(text);
  };
  const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });

  /*useEffect(() => {
    props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: false });

    if (media.type === "image") {
      setTimeout(() => {
        returnToMessages();
      }, 5000);
    }

    return () => {
      clearInterval();
      props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: true });
    };
  }, []);*/

  return (
    <TouchableWithoutFeedback >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", width: "100%", padding: 10 }}>
          <TextInput
            //autoFocus
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
        </View>
        <View
          style={{
            height: "20%",
            width: "10%",
            backgroundColor: "grey",
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center" }}>HERE</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "grey",
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center" }}>Caption</Text>
        </View>
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
            height: "30%",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text> All confirmed users</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
  },
  inputBox: {
    flex: 1,
    margin: 3,
    padding: 10,
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 20,
  },
});

interface ILinkStateProps {
  media: IMedia;
}

const mapStateToProps = (state: AppState) => {
  return {
    media: state.media,
  };
};

export default connect(mapStateToProps)(MediaDescription);
