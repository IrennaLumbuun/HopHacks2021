import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { windowHeight, windowWidth } from '../utils/Data';
import firebase from '../firebase.js';
export default function SignupPage({ navigation }) {

  const redirect1 = () => {
    navigation.navigate('one');
  }
  const redirect3 = () => {
    navigation.navigate('three');
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, backgroundColor: '#7f39fb', paddingTop: 50, paddingBottom: 20 }} >
        <Text style={styles.text}>Create a new Account</Text>
        <TouchableOpacity style={styles.forgotButton} onPress={() => { navigation.navigate('login') }}>
          <Text style={styles.navButtonText}>Already Registered? Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'white', padding: 20 }}>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          iconType="lock"
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          secureTextEntry={true}
        />
        <FormButton buttonTitle='SignUp' onPress={() => {
          firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
              navigation.navigate('login');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Alert.alert(
                  'You need to...'
               )
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            })
        }} />
      </View>
      <View style={{ flex: 2, backgroundColor: '#7f39fb' }} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  logo: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Futura',
    fontSize: 32,
    paddingTop: 30,
    marginBottom: 10,
    color: 'white',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 20,
  },
  signupButton: {
    marginVertical: 10,
  },
  navButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});