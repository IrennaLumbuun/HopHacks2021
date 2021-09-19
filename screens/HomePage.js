import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomePage({ navigation }) {

  const redirect = () => {
    navigation.navigate('home');
  }

  console.log('home');

  return (
    <View style={styles.container}>
      <Text>screen1text</Text>
      <Button title="go to screen 2" onPress={redirect} />
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
