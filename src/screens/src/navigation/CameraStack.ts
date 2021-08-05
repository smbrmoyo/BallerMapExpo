import { createStackNavigator } from "react-navigation-stack";

import Camera from "../views/Camera";
import MediaDescription from "../views/MediaDescription";
import MediaEditor from "../views/MediaEditor";
import SelectContact from "../views/SelectContact";

const CameraStack = createStackNavigator(
  {
    camera: {
      screen: Camera,
      navigationOptions: {
        headerShown: false,
      },
    },
    media_editor: {
      screen: MediaEditor,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    select_contact: {
      screen: SelectContact,
      navigationOptions: {
        title: "Select a contact",
      },
    },
    media_description: {
      screen: MediaDescription,
      navigationOptions: {
        title: "create a post",
      },
    },
  },
  {
    initialRouteName: "camera",
  }
);

export default CameraStack;
