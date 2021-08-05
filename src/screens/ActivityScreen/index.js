import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import Bitmoji from '../../components/Bitmoji';
import styles from './styles';

const ActivityScreen = props => {
  return (
    <>
      <StatusBar
        //translucent
        backgroundColor="rgba(0,0,0,0.0)" /*transparent*/
        barStyle="dark-content"
      />
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> ACTIVITY SCREEN </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ActivityScreen;
