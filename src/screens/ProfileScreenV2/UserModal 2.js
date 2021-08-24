import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacityBase,
} from "react-native";
//import { wsize, hsize } from "../entities/constants";
import { BlurView } from "expo-blur";
import { Feather, AntDesign } from "@expo/vector-icons";
import Option from "./Option";
//import { isPrivateUser } from "../services/api/user";
export default React.memo(function UserModal({
  setModalVisible,
  navigation,
  ...props
}) {
  const requests = (
    <Option
      title="Look Requests"
      setModalVisible={setModalVisible}
      navigation={navigation}
      navigateTo="FollowRequests"
    >
      <AntDesign
        name="adduser"
        size={29}
        color="black"
        style={styles.iconStyle}
      />
    </Option>
  );
  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.closeButton}></View>
        </TouchableOpacity>
        <View style={styles.modalView}>
          <Option
            title="Settings"
            setModalVisible={setModalVisible}
            navigation={navigation}
            navigateTo="Settings"
          >
            <Feather
              name="settings"
              size={29}
              color="black"
              style={styles.iconStyle}
            />
          </Option>
          <Option
            title="Add Friends"
            setModalVisible={setModalVisible}
            navigation={navigation}
            navigateTo="AddFriend"
          >
            <AntDesign
              name="adduser"
              size={29}
              color="black"
              style={styles.iconStyle}
            />
          </Option>
          {requests}
        </View>
      </BlurView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    height: 307,
    // marginTop: hsize(307),

    width: 375,
  },
  modalView: {
    width: 375,
    height: 537,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 51,
  },
  modalOptionText: {
    fontSize: 18,
    marginLeft: 19,
  },
  iconStyle: {
    marginRight: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
