import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: windowHeight / 18,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
