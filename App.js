import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './route';
import MapScreen from './screens/MapScreen';
import { useFonts, Anton_400Regular } from '@expo-google-fonts/anton';


export default function App() {
  
  return (
    <MapScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
