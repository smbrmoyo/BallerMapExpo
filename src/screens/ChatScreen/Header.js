import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfilePicture from '../../components/ProfilePicture';
import Bitmoji from '../../components/Bitmoji';
import styles from './styles';

const Header = props => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="chevron-back" size={40} color="#743cff" />
          </View>
          <ProfilePicture size={40} />
          <Text style={styles.textHeader}>Username</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconContainer}>
            <SimpleLineIcons name="location-pin" size={30} color="#743cff" />
          </View>
          <View style={styles.iconContainer}>
            <SimpleLineIcons name="info" size={30} color="#743cff" />
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
