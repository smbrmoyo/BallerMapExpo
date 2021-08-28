import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
//import { getUserFriends, getUserSubs } from "../../services/api/user";
import users from "../../assets/data/people";
import ProfilePicture from "../../components/ProfilePicture";
import { wsize, hsize } from "../../utils/Dimensions";
import debounce from "lodash/debounce";
import { useTheme } from "@react-navigation/native";
import { useProfile } from "../../components/navigation/Providers/ProfileProvider";
import LoadingScreen from "../LoadingScreen";
import {
  MaterialIcons,
  Entypo,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import styles from "./styles";

function SearchBarFollowers(props) {
  return (
    <View style={styles.headerContainer}>
      <TextInput //autoFocus
        onChangeText={props.onChangeTextDebounced}
        value={props.text}
        placeholder="Search"
        placeholderTextColor="grey"
        style={[styles.textInput]}
      />
    </View>
  );
}

function FollowRow({ item }, isFollowing, onFollowPress) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.postHeaderFirst}
      onPress={() => {
        props.navigate("OtherProfile"); /*, {
                  user: {
                    id: item.key,
                    //photo: item.photoURL,
                    userName: item.name,
                  },*/
        /*onPress={() => {
    navigation.navigate("EditProfile", {
    userExtraInfo: {
    fullName: userExtraInfo.fullName,
    photoURL: userExtraInfo.photoURL,
    userName: userExtraInfo.userName,
    status: userExtraInfo.status,
    city: userExtraInfo.city,
    link: userExtraInfo.link,
    description: userExtraInfo.description,
    email: userExtraInfo.email,
    phone: userExtraInfo.phone,
    gender: userExtraInfo.gender,
    },
    });
    }}*/
      }}
    >
      <View style={styles.postHeaderContainer}>
        <View
          style={{
            flexDirection: "row",
            //flex: 1,
            //paddingHorizontal: wsize(5),
            paddingVertical: hsize(5),
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <ProfilePicture size={wsize(50)} />
          <View
            style={{
              flexDirection: "column",
              marginLeft: wsize(20),
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
              }}
            >
              {item.username}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "grey",
              }}
            >
              {item.username}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const FollowersScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { colors, dark } = useTheme();
  const [text, setText] = useState("");
  const [isFollowing, setIsFollowing] = useState(isFollowing);
  const { followers, following } = useProfile();
  const [data, setData] = useState(followers);

  const empty = [{ id: "0" }];
  {
    /* Should receive isFollowing as route.params from previous screen
    Would check if user follows the other one and would update the 
    Button Remove or Follow */
    /* isFollowing should have a prop user */
  }

  const onFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const searchFilter = async (text) => {
    if (text) {
      var newData = followers.filter((item) => {
        var name = item.username.toLowerCase();
        const filter = text.toLowerCase();
        return name.search(filter) !== -1;
      });
      setData(newData);
      console.log(newData);
      setText(text);
    } else {
      setData(followers);
      setText("");
    }
  };
  /*const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });*/

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      //headerTitleAlign: 'left',
      //headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.iconContainer}>
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>
              {/*firebase.auth().currentUser.email*/}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            bsProf.current.snapTo(0);
          }}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    /*getUserFriends().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ key: doc.id, ...doc.data() });
      });
      setData(allData);
      setLoading(false);
    });*/
    setData(followers);
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          refreshing={loading}
          keyExtractor={(item) => item.username}
          ListHeaderComponent={
            <SearchBarFollowers
              colors={colors}
              dark={dark}
              text={text}
              onChangeTextDebounced={(text) => searchFilter(text)}
            />
          }
          renderItem={({ item }) => (
            <FollowRow item={item} isFollowing onFollowPress />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowersScreen;

/* <FollowRow
              isFollowing={isFollowing}
              onFollowPress={onFollowPress}
              item={item}
              navigate={navigation.navigate}
            /> */
