import React, { useContext, useState } from "react";
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
import { useAuth } from "../../components/navigation/realmAuthProvider";
import styles from "./styles";

const SignUpScreenEmail = ({ navigation }) => {
  const { user, setUser, signUp } = useAuth();
  //const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);
  const onSubmit = () => {
    signUp({ variables: { email, password } });
  };
  const headerHeight = useHeaderHeight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const [datasignup, setDataSignup] = useState({
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setDataSignup({
        ...datasignup,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setDataSignup({
        ...datasignup,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setDataSignup({
      ...datasignup,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setDataSignup({
      ...datasignup,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setDataSignup({
      ...datasignup,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setDataSignup({
      ...datasignup,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
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
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
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
                  marginTop: 35,
                },
              ]}
            >
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                value={password}
                //secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(userPassword) => setPassword(userPassword)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateSecureTextEntry}
              >
                {datasignup.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Confirm Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Confirm Your Password"
                //secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={(userPassword) =>
                  setConfirmPassword(userPassword)
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={updateConfirmSecureTextEntry}
              >
                {datasignup.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
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
                  signUp(email, password);
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
                onPress={() => navigation.goBack()}
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
                    Log In
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
