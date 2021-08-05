import React from 'react';
import {View, FlatList} from 'react-native';

import Story from '../Story';
import styles from './styles';

const data = [
  {
    name: 'BM',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
  {
    name: 'Dow J',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
  {
    name: '__letch',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
  {
    name: 'Alicia',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
  {
    name: 'JonaKetch',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
  {
    name: 'Tina',
    imageUri:
      'https://preview.bitmoji.com/avatar-builder-v3/preview/body?scale=3&gender=1&style=5&rotation=7&beard=1630&brow=1541&cheek_details=1354&ear=1425&eye=1622&eyelash=2279&eye_details=-1&face_lines=1366&glasses=2441&hair=1719&hat=2555&jaw=1392&mouth=2337&nose=1460&beard_tone=8935738&blush_tone=16299718&brow_tone=13816322&eyeshadow_tone=14725305&hair_tone=4788241&hair_treatment_tone=666890&lipstick_tone=8929692&pupil_tone=11188685&skin_tone=6240025&body=1&face_proportion=4&eye_spacing=1&eye_size=0&outfit=978521',
  },
];

const Stories = () => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={({name}) => name}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <Story imageUri={item.imageUri} name={item.name} />
      )}
    />
  );
};

export default Stories;
