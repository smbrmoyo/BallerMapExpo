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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, gql } from "@apollo/client";
import { useTheme } from "react-native-paper";

import { AuthContext } from "../../components/navigation/AuthProvider";

const SignInScreenEmail = ({ navigation, props }) => {
  const headerHeight = useHeaderHeight();
  const { login, user, setUser } = useContext(AuthContext);
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
            <Text style={styles.text_header}>Sign in Email</Text>
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
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              value={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
            />
          </View>
          {/* Add verification */}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              value={password}
              placeholderTextColor="#666666"
              secureTextEntry={datalogin.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={updateSecureTextEntry}
            >
              {datalogin.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("pressed forgot")}
          >
            <Text style={{ color: "#743cff", marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.signIn}
              onPress={() => {
                onSubmit();
                //login(email, password);
              }}
            >
              <LinearGradient
                colors={["#743cff", "#bb006e"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "white",
                    },
                  ]}
                >
                  Log In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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

export default SignInScreenEmail;
