import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import debounce from "lodash/debounce";

import LoadingScreen from "../LoadingScreen";
import styles from "./styles";
import people from "../../assets/data/people";
import places from "../../assets/data/placesJSON";
import PlaceRow from "./PlaceRow";
import { hsize, wsize } from "../../utils/Dimensions";
import {useMap} from "../../components/navigation/Providers/MapProvider"

const PlaceSearchScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const places = useMap().places;
  const { colors, dark } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        backgroundColor: "white",
        //shadowColor: "black",
        //elevation: 5,
      },
      //headerTitleAlign: 'left',
      headerBackTitleVisible: true,
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>Find a location</Text>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={{ flexDirection: "row", margin: hsize(5) }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ justifyContent: "center" }}
          >
            <Entypo name="chevron-thin-left" size={24} color="#743cff" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginHorizontal: wsize(10) }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("UserSearch")} // Should have a userSearchAddScreen
            style={{ justifyContent: "center" }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="people-outline" size={24} color="#743cff" />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    //fetchData();
  }, []);

  const fetchData = async () => {
    const res = places;
    setData(res);
    setHits(res.slice());
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

  const filterNames = (hit) => {
    //console.log(hit);
    let search = query.toLowerCase();
    let hitName = hit.name.toLowerCase();

    if (hitName.startsWith(search)) {
      return hit.address;
    } else {
      hits.splice(hits.indexOf(hit), 1);
      return null;
    }
  };

  const formatNames = (hit) => {
    let hitName = hit.name.charAt(14).toUpperCase() + hit.name.slice(15);
    hitName = hitName.replace(/_/g, " ");
    return hitName;
  };

  const updateQuery = (input) => {
    setHits(data.slice());
    setQuery(input);
  };

  function SearchBarFollowers(props) {
    return (
      <View style={styles.headerContainer}>
        <TextInput //autoFocus
          autoFocus
          onChangeText={updateQuery}
          value={query}
          placeholder="Search"
          placeholderTextColor="#CDCDCD"
          style={[
            styles.inputBox,
            {
              color: props.colors.text,
              backgroundColor: props.colors.background,
              borderColor: props.colors.border,
              borderWidth: props.dark ? 1 : 0.5,
            },
          ]}
        />
      </View>
    );
  }

  /*const onChangeText = async (text) => {
    updateQuery();
  };*/
  const onChangeTextDebounced = debounce(updateQuery, 1000, {
    leading: true,
    trailing: true,
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        keyExtractor={(i) => i.name.toString()}
        refreshing={loading}
        ListHeaderComponent={
          <SearchBarFollowers
            colors={colors}
            dark={dark}
            text={query}
            onChangeTextDebounced={onChangeTextDebounced}
          />
        }
        extraData={query}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Add", { item })}
          >
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Entypo name="location-pin" size={25} color={"#743cff"} />
              </View>
              <Text style={styles.locationText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PlaceSearchScreen;
