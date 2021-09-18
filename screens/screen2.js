import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function screen2({ navigation }) {

  const redirect = () => {
    navigation.navigate('Upload');
  }
  
  return (
    <View style={styles.container}>
      <Text>screen 2 text</Text>
      <Button title="go to screen uploadImg" onPress={redirect} />
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
