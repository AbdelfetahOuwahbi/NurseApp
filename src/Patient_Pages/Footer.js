import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Footer() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: screenWidth/10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

