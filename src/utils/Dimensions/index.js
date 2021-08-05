import { Dimensions } from "react-native";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const wsize = (size) => (size / 375) * windowWidth;
export const hsize = (size) => (size / 812) * windowHeight;
