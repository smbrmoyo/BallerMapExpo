import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import Bitmoji from "../../components/Bitmoji";
import { Video, AVPlaybackStatus } from "expo-av";
//import Video from "react-native-video";
//import Stories from '../Stories';
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
//import Animated from 'react-native-reanimated';
//import BottomSheet from 'reanimated-bottom-sheet';
import { useNavigation } from "@react-navigation/native";

const Post = (props) => {
  const video = useRef();
  const [post, setPost] = useState(props.post);
  const [status, setStatus] = useState({});
  const [paused, setPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState("");

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const getVideoUri = async () => {
    if (post.videoUri.startsWith("http")) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(post.videoUri);
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View style={{ height: "100%", width: "100%" }}>
          <Video
            ref={video}
            source={{ uri: videoUri }}
            style={styles.video}
            onError={(e) => console.log(e)}
            //useNativeControls
            resizeMode="cover"
            isLooping={true}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            //repeat={true}
            //paused={paused}
          />

          <View style={styles.uiContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  status.isPlaying
                    ? video.current.pauseAsync()
                    : video.current.playAsync()
                }
              >
                <Text>{status.isPlaying ? "Pause" : "Play"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@post.usr.usrnm</Text>
                <Text style={styles.description}>post.descrip</Text>

                <View style={styles.songRow}>
                  <Entypo name={"beamed-note"} size={16} color="white" />
                  <Text style={styles.songName}>post.song.name</Text>
                </View>
              </View>

              <Image
                style={styles.songImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
