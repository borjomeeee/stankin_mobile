import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const CommonLogoComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoTitle}>Станкин</Text>
      <View style={styles.logoTypeContainer}>
        <Text style={styles.logoTypeText}>Расписание</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  logoTitle: {
    fontFamily: 'Inter-Bold',

    fontSize: 20,
    textTransform: 'uppercase',

    color: '#000',
  },
  logoTypeContainer: {
    borderColor: '#9E9E9E',
    borderWidth: 1,

    paddingVertical: 4,
    paddingHorizontal: 8,

    marginLeft: 14,
  },
  logoTypeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,

    color: '#9E9E9E',
  },
});

export default CommonLogoComponent;
