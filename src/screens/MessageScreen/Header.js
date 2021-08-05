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
import MessageRow from './MessageRow';
import Bitmoji from '../../components/Bitmoji';
import styles from './styles';

const Header = props => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Direct Messages</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconContainer}>
            <Ionicons name="search" size={24} color="#743cff" />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="pencil-outline" size={24} color="#743cff" />
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
