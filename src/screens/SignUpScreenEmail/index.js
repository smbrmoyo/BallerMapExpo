import React, { useContext, useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useHeaderHeight } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { hsize, wsize } from "../../utils/Dimensions";
import { useAuth } from "../../components/navigation/Providers/AuthProvider";
import { useTheme } from "react-native-paper";
import styles from "./styles";

const SignUpScreenEmail = ({ navigation }) => {
  const { user, setUser, signUp, signUpTrigger } = useAuth();

  const headerHeight = useHeaderHeight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { colors } = useTheme();

  const isUserSignedUp = () => {
    if (signUpTrigger) {
      signUpTrigger ? navigation.navigate("SignInEmail") : null;
    }
  };

  useEffect(() => {
    isUserSignedUp();
  }, [signUpTrigger]);

  /*if (error) {
    Alert.alert("Error signing up. Try again");
  }

  if (data) {
    // save token
    AsyncStorage.setItem("token", data.signUp.token).then(() => {
      // redirect home
      //navigation.navigate("Home");
      setUser(data.signUp.user);
      console.log(data);
    });
  }*/

  const [dataSignUp, setdataSignUp] = useState({
    email: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setdataSignUp({
        ...dataSignUp,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setdataSignUp({
        ...dataSignUp,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setdataSignUp({
        ...dataSignUp,
        password: val,
        isValidPassword: true,
      });
    } else {
      setdataSignUp({
        ...dataSignUp,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    console.log(dataSignUp.password.length + dataSignUp.password);
    if (
      val.length === dataSignUp.password.length &&
      val === dataSignUp.password
    ) {
      setdataSignUp({
        ...dataSignUp,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setdataSignUp({
        ...dataSignUp,
        isValidConfirmPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setdataSignUp({
      ...dataSignUp,
      secureTextEntry: !dataSignUp.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setdataSignUp({
      ...dataSignUp,
      confirm_secureTextEntry: !dataSignUp.confirm_secureTextEntry,
    });
  };

  return (
    <LinearGradient colors={["#743cff", "#bb006e"]} style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Sign up Email</Text>
          </View>
        </TouchableWithoutFeedback>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: hsize(15),
                },
              ]}
            >
              Email
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
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
                onChangeText={(userEmail) => textInputChange(userEmail)}
              />
              {dataSignUp.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {/* Add verification */}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: hsize(35),
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={dataSignUp.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(userPassword) =>
                  handlePasswordChange(userPassword)
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateSecureTextEntry}
              >
                {dataSignUp.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {dataSignUp.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: hsize(35),
                },
              ]}
            >
              Confirm Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Confirm Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={
                  dataSignUp.confirm_secureTextEntry ? true : false
                }
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(userPassword) =>
                  handleConfirmPasswordChange(userPassword)
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateConfirmSecureTextEntry}
              >
                {dataSignUp.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {dataSignUp.isValidConfirmPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Not matching password.</Text>
              </Animatable.View>
            )}
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.signIn}
                onPress={() => {
                  if (
                    dataSignUp.password &&
                    dataSignUp.isValidConfirmPassword
                  ) {
                    signUp(dataSignUp.email, dataSignUp.password);
                  }
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
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("SignInSocial")}
                style={[styles.signIn]}
              >
                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                    Already have an account?
                  </Text>
                  <Text
                    style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                  >
                    {" "}
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUpScreenEmail;
