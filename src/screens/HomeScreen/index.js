import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
  FlatList,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
//import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
//import Video from "react-native-video";
//import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
/*import Bitmoji from '../Bitmoji';*/
import Stories from "../../components/Stories";
import styles from "./styles";
import Post from "./Post";
import postsData from "../../assets/data/posts";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /*const fetchPost = async () => {
     // fetch all the posts
     try {
       const response = await API.graphql(graphqlOperation(listPosts));
       setPosts(response.data.listPosts.items);
     } catch (e) {
       console.error(e);
     }
   };*/
    setPosts(postsData);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />

      <View style={{ height: "100%", width: "100%" }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Post post={item} uri={item.videoUri} />}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").height - 50}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
        />
      </View>
    </>
  );
};

export default HomeScreen;
