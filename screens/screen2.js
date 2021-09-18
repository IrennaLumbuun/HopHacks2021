import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function screen2({ navigation }) {

  const redirect = () => {
    navigation.navigate('one');
  }
  
  return (
    <View style={styles.container}>
      <Text>screen 2 text</Text>
      <Button title="go to screen 1" onPress={redirect} />
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
