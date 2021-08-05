import React, { useState, useLayoutEffect, createRef, useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { wsize, hsize } from "../../utils/Dimensions";
import Indicator from "./ActivityIndicator";
import styles from "./styles";
import DoubleTapHandler from "./DoubleTapHandler";

const Review = ({ video }) => {
  const [RetakeVideo, setRetakeVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const saveVideo = async () => {
    setLoading(true);

    //const { video } = props;
    console.log("----> save" + video.uri);
    const asset = await MediaLibrary.createAssetAsync(video.uri);
    setLoading(false);
  };

  const { width, height } = Dimensions.get("window");

  if (RetakeVideo) {
    return <VideoRecord />;
  }
  if (loading) {
    return <Indicator />;
  }
  return (
    <View>
      <Video
        source={{
          uri: video.uri,
        }}
        shouldPlay={true}
        resizeMode="cover"
        isLooping
        style={{
          width: "100%",
          height: "100%",
          //marginTop: 20,
          //borderRadius: 3,
          //marginLeft: 20,
        }}
        isMuted={true}
      />

      <TouchableOpacity
        onPress={() => {
          saveVideo();
        }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          //alignItems: "center",
          //justifyContent: "space-evenly",
          position: "absolute",
          left: wsize(25),
          bottom: hsize(25),
          //right: wsize(10),
        }}
      >
        <MaterialIcons name="save-alt" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setRetakeVideo(true);
        }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          //alignItems: "center",
          //justifyContent: "space-evenly",
          position: "absolute",
          //left: wsize(100),
          bottom: hsize(0),
          top: hsize(25),
          right: wsize(25),
        }}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setRetakeVideo(true);
        }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          //alignItems: "center",
          //justifyContent: "space-evenly",
          position: "absolute",
          //bottom: hsize(0),
          bottom: hsize(25),
          right: wsize(25),
        }}
      >
        <Ionicons name="send" size={30} color="#743cff" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loading}>
          <Indicator />
        </View>
      )}
    </View>
  );
};

const VideoRecord = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [video, setVideo] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [ReviewVideo, setReviewVideo] = useState(false);
  const camera = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  // function to take snap || click photo
  const snap = async () => {
    if (camera) {
      let photo = await camera.current.takePictureAsync();
      console.log(photo);
    }
  };

  const StartRecord = async () => {
    console.log("video record started");
    if (camera) {
      setRecording(true);

      const video = await camera.current.recordAsync();
      setVideo(video);
    }
  };

  const StopRecord = async () => {
    setRecording(false);

    await camera.current.stopRecording();
    console.log("done");
  };

  const toogleRecord = () => {
    if (recording) {
      StopRecord();
    } else {
      StartRecord();
    }
  };

  //const { hasCameraPermission } = this.state;
  if (video) {
    return <Review video={video} />;
  } else {
    return (
      <DoubleTapHandler
        useDelta={300}
        onDoubleTap={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={type} ref={camera}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                //alignItems: "center",
                //justifyContent: "space-evenly",
                position: "absolute",
                //left: wsize(100),
                bottom: hsize(0),
                top: hsize(25),
                right: wsize(25),
              }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                left: wsize(10),
                bottom: hsize(5),
                right: wsize(10),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialIcons name="flip-camera-ios" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  toogleRecord();
                }}
              >
                <Ionicons
                  name="radio-button-on"
                  size={100}
                  color={recording ? "red" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("Open Image Picker")}
              >
                <Ionicons name="images-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </DoubleTapHandler>
    );
  }
};

export default VideoRecord;
