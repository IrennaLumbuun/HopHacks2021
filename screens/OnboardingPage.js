import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Onboarding from 'react-native-onboarding-swiper';
import firebase from 'firebase';

export default function OnboardingPage({ navigation }) {

  console.log('screen1');


  return (
    <View style={styles.container}>
      <Text>Onboarding Page</Text>
      <Button title="login in" onPress={()=>navigation.navigate('login')} />
    </View>
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
