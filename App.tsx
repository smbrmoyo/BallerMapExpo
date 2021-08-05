/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import "react-native-gesture-handler";

import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import Providers from "./src/components/navigation";
import AddScreen from "./src/screens/AddScreen";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Realm from "realm";
import * as Font from "expo-font";

export default function App() {
  const [loaded] = Font.useFonts({
    Comfortaa: require("./src/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
    ComfortaaBold: require("./src/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
    TimeBurner: require("./src/assets/fonts/timeburner.regular.ttf"),
    TimeBurnerBold: require("./src/assets/fonts/timeburner.bold.ttf"),
    VaguelyFatal: require("./src/assets/fonts/Vaguely_Fatal.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ApolloProvider client={client}>
        <Providers />
      </ApolloProvider>
      {/*<ReduxProvider store={store}>
        <SnapClone />
      </ReduxProvider>*/}
    </>
  );
}
