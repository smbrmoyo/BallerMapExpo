import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
} from "react-native";
import { AsyncStorage } from "react-native";
//import Animated from "react-native-reanimated";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { mapBlueGreyStyle } from "../../styles/MapStyles";
import ProfilePicture from "../ProfilePicture";
import Bitmoji from "../Bitmoji";
import people from "../../assets/data/people";
import places from "../../assets/data/places";
import Stories from "../Stories";
import styles from "./styles";
import store from "../../screens/StoryScreen4/Store";
import BottomSheet from "reanimated-bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

// Constants
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const NewHomeMap = ({ props }) => {
  const route = useRoute();
  const navigation = useNavigation();
  //console.log(Location.getCurrentPositionAsync({}));
  const [location, setLocation] = useState(null);

  /*useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);*/
  const initialMapState = {
    categories: [
      {
        id: "0",
        name: "Ball Court",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
      },
      {
        id: "1",
        name: "Park",
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        id: "2",
        name: "Resto",
        icon: (
          <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      {
        id: "3",
        name: "Park 2",
        icon: (
          <MaterialCommunityIcons
            name="food"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
    ],
    people,
    events: [],
    places,
    region: {
      latitude: 48.873001,
      longitude: 2.3121201,
      latitudeDelta: 0.003,
      longitudeDelta: 0.0021,
    },
    camera: {
      latitude: 48.873001,
      longitude: 2.3121201,
      pitch: 90,
      heading: 90,
      zoom: 18,
      altitude: 18,
    },
  };

  const [state, setState] = useState(initialMapState);
  const [addPressed, setAddPressed] = useState(false);

  let mapIndex = 0;
  const _mapAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    _mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.places.length) {
        index = state.places.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.places[index]; //  Try people and see if the map is initialized on a marker

          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.places.map((person, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = _mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const _map = useRef();

  const addEvent = () => {
    if (route.params.tags) {
      //Alert.alert("exists");
      console.log(route.params.tags);

      initialMapState.places.push({
        id: route.params.description,
        name: route.params.description,
        coordinate: {
          latitude: route.params.address.lat,
          longitude: route.params.address.lng,
        },
        heading: 0,
      });

      setState(initialMapState);

      _map.current.animateToRegion({
        ...coordinate,
        latitudeDelta: state.region.latitudeDelta,
        longitudeDelta: state.region.longitudeDelta,
      });

      //console.log(JSON.stringify(route.params.tags));
    } else {
      return null;
    }
  };

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollToOffset({ x: x, animated: true });
  };

  const _scrollView = useRef();

  const goToAdd = () => {
    setAddPressed(true);
    navigation.navigate("Add");
  };

  const goToFind = () => {
    navigation.navigate("Find");
  };

  const goToStory = () => {
    navigation.navigate("Story");
    //userId
  };

  const goToDescription = () => {
    navigation.navigate("Description");
  };

  return (
    <>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          //opacity: Animated.add(0.05, Animated.multiply(this.fall, 1.0)),
        }}
      >
        <MapView
          ref={_map}
          style={styles.mapContainer}
          provider={PROVIDER_GOOGLE}
          //showsMyLocationButton={true}
          showsUserLocation={true}
          isFromMockProvider={false}
          customMapStyle={mapBlueGreyStyle}
          loadingEnabled={true}
          initialRegion={state.region}
          /*onLayout={() => {
        _map.current.animateCamera({
          //  route.; ? addEvent(); :
          center: {
            latitude: state.camera.latitude,
            longitude: state.camera.longitude,
          },
          heading: 90,
          pitch: 90,
          zoom: 18,
          altitude: 18,
        });
      }}*/
          //initialCamera={state.camera}
        >
          {state.places.map((person, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <Marker
                key={index}
                coordinate={person.coordinate}
                onPress={(e) => onMarkerPress(e)}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={require("../../assets/images/map_marker.png")}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                  {/*<SimpleLineIcons
                    name="location-pin"
                    size={20}
                    //style={[styles.marker, scaleStyle]}
                    color="#743cff"
                  />*/}
                </Animated.View>
              </Marker>
            );
          })}

          {state.people.map((location, index) => (
            <Marker key={index} coordinate={location.coordinate}>
              <Bitmoji />
            </Marker>
          ))}
        </MapView>
        <Animated.FlatList
          ref={_scrollView}
          data={state.places}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          decelerationRate={"fast"}
          style={styles.scrollView}
          contentInset={{
            // IOS Only
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            marginLeft: Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
            marginRight: Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: _mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * CARD_WIDTH,
              index * CARD_WIDTH,
              (index + 1) * CARD_WIDTH,
            ];

            const translateY = _mapAnimation.interpolate({
              inputRange,
              outputRange: [50, 0, 50],
              extrapolate: "clamp",
            });

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ activeOpacity: 0.7 }}
                onPress={goToDescription}
              >
                <Animated.View
                  style={[styles.card, { transform: [{ translateY }] }]}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    activeOpacity={0.7}
                    onPress={setCarousselOpen}
                  >
                    <ProfilePicture />
                  </TouchableOpacity>
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {item.name}
                    </Text>
                    <View style={styles.button}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: "#743cff",
                          },
                        ]}
                      >
                        Go
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={[styles.buttonContainer, { right: 10, bottom: 140 }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            activeOpacity={0.7}
            onPress={goToAdd}
          >
            <View style={styles.buttonAdd}>
              <Feather name="plus" size={40} color="#743cff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer, { left: 10, bottom: 140 }]}>
          <TouchableOpacity activeOpacity={0.5} onPress={goToFind}>
            <View style={styles.buttonFind}>
              <SimpleLineIcons name="location-pin" size={40} color="#743cff" />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default NewHomeMap;
