import React from 'react';
import {View} from 'react-native';

import styles from '@/styles';

import {DifficultySelector} from '@/components';

export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <DifficultySelector navigation={navigation} />
    </View>
  );
};
