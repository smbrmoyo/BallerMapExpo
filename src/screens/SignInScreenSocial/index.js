import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import SocialButton from "../../components/SocialButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, gql } from "@apollo/client";
import { useTheme } from "react-native-paper";

import { useAuth } from "../../components/navigation/realmAuthProvider";

const SignInScreenSocial = ({ navigation, props }) => {
  const headerHeight = useHeaderHeight();
  const { login, user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SIGN_IN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(input: { email: $email, password: $password }) {
        token
        user {
          id
          email
        }
      }
    }
  `;

  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert("Invalid credentials, try again");
      console.log(error);
    }
  }, [error]);

  if (data) {
    // save token
    AsyncStorage.setItem("token", data.signIn.token).then(() => {
      // redirect home
      //navigation.navigate("Home");
      setUser(data.signIn.user);
      //console.log(data.signIn.token);
    });
  }

  const onSubmit = () => {
    signIn({ variables: { email, password } });
  };

  const [datalogin, setDataLogin] = useState({
    username: "",
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setDataLogin({
        ...datalogin,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setDataLogin({
        ...datalogin,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setDataLogin({
        ...datalogin,
        password: val,
        isValidPassword: true,
      });
    } else {
      setDataLogin({
        ...datalogin,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setDataLogin({
      ...datalogin,
      secureTextEntry: !datalogin.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setDataLogin({
        ...datalogin,
        isValidUser: true,
      });
    } else {
      setDataLogin({
        ...datalogin,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (datalogin.username.length == 0 || datalogin.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect.", [
        { text: "Okay" },
      ]);
      return;
    }
    login(foundUser);
  };

  return (
    <LinearGradient colors={["#743cff", "#bb006e"]} style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Sign in</Text>
          </View>
        </TouchableWithoutFeedback>

        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <SocialButton
            buttonTitle="Sign in with Google"
            btnType="google"
            color="red"
            backgroundColor="white"
            onPress={() => console.log("google pressed")}
          />
          <SocialButton
            buttonTitle="Sign in with Apple"
            btnType="apple"
            color="black"
            backgroundColor="white"
            onPress={() => console.log("Apple pressed")}
          />
          <SocialButton
            buttonTitle="Sign in with Facebook"
            btnType="facebook"
            color="blue"
            backgroundColor="white"
            onPress={() => console.log("Facebook pressed")}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                marginVertical: 30,
                height: 1,
                width: "40%",
                backgroundColor: "black",
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                marginHorizontal: 10,
                fontSize: 16,
              }}
            >
              or
            </Text>
            <View
              style={{
                marginVertical: 30,
                height: 1,
                width: "40%",
                backgroundColor: "black",
              }}
            />
          </View>
          <View style={styles.button}>
            <SocialButton
              buttonTitle="Sign in with Email"
              btnType="envelope-o"
              color="black"
              backgroundColor="white"
              onPress={() => navigation.navigate("SignInEmail")}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("SignUpSocial")}
              style={[styles.signIn]}
            >
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>New to Around?</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
            {/*<LinearGradient
            colors={["#bb006e", "#743cff"]}
            style={[
              styles.signIn,
              {
                marginTop: 15,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => navigation.navigate("Signup")}
              style={[styles.signIn]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "white",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </LinearGradient>*/}
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignInScreenSocial;
