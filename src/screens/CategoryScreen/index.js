import React, { useState, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppLoading } from "expo";
import debounce from "lodash/debounce";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import Bitmoji from "../../components/Bitmoji";
import styles from "./styles";
import PopularTags from "../../assets/data/PopularTags";
import HashTags from "../../assets/data/HashTags";
import CategoryCard from "./CategoryCard";
import PopularCard from "./PopularCard";
import QuickCard from "./QuickCard";
import HashTagCard from "./HashTagCard";
import ProfilePicture from "../../components/ProfilePicture";

const CategoryScreen = ({ props, navigation, size }) => {
  const fl = useRef();
  const { colors, dark } = useTheme();
  const [text, setText] = useState("");
  /* HEADER */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      //headerTitleAlign: 'left',
      //headerBackTitleVisible: false,
      /*headerLeft: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <View style={styles.profilepic}>
            <ProfilePicture size={30} />
          </View>
        </TouchableOpacity>
      ),*/
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconHeaderTitle}>
            <Text style={styles.textHeader}>Categories</Text>
          </TouchableOpacity>
        </View>
      ),
      /*headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log("pressed")}>
          <View style={styles.iconContainer}>
            <Feather name="plus" size={30} color="black" />
          </View>
        </TouchableOpacity>
      ),*/
    });
  }, [navigation]);
  const onChangeText = (text) => {
    setText(text);
  };
  const onChangeTextDebounced = debounce(onChangeText, 1000, {
    leading: true,
    trailing: true,
  });

  return (
    <>
      <StatusBar
        //translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
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
        <View style={styles.tagsView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              //borderColor: "black",
              //borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
                fontFamily: "Comfortaa",
              }}
            >
              Popular
            </Text>
            {/*<Entypo name="chevron-with-circle-right" size={24} color="black" />*/}
          </View>
          <View style={styles.list}>
            <PopularCard />
            <PopularCard />
          </View>
        </View>
        <View style={styles.tagsView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              //borderColor: "black",
              //borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                alignSelf: "center",
                fontFamily: "Comfortaa",
              }}
            >
              Quick adds
            </Text>
            {/*<Entypo name="chevron-with-circle-right" size={24} color="black" />*/}
          </View>
          <View style={styles.list}>
            <QuickCard />
            <QuickCard />
          </View>
        </View>
        <View style={styles.tagsView}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              //borderColor: "black",
              //borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                alignSelf: "center",
                fontFamily: "Comfortaa",
              }}
            >
              Tags
            </Text>
          </View>

          <View style={styles.list}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ height: 100 }}
            >
              <FlatList
                ref={fl}
                data={HashTags}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                numColumns={HashTags.length / 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                //horizontal
                renderItem={({ item, index }) => (
                  <HashTagCard hashtag={item.Tag} />
                )}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CategoryScreen;
