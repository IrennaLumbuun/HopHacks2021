import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { windowHeight, windowWidth } from '../utils/Data';
import firebase from '../firebase'


export default function LoginPage({ navigation }) {

  const redirect1 = () => {
    navigation.navigate('one');
  }
  const redirect3 = () => {
    navigation.navigate('three');
  }
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image
        source={require('../assets/logo-Donte_Instant.png')}
        style={styles.logo}
      />
       <Text style={styles.text}> Waste Fighters </Text>

     
      <Text ></Text>
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
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
        iconType="lock"
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
            navigation.navigate('Upload');
          })
          .catch(error => {
            console.error(error);
          })
        }}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>



      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.navButtonText}>
          New to WasteFighters? Create here!
        </Text>
      </TouchableOpacity>

      <Text>

      </Text>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#9e66c6',
    height: '100%'
  },
  logo: {
    height: 150,
    width: 200,
    resizeMode: 'cover',
    padding: 20 ,
  },
  text: {
    fontFamily: 'Gill Sans',
    fontSize: 52,
    marginBottom: 20,
    paddingTop:10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 20,
  },
  forgotButton: {
    marginVertical: 50,
  },
  signupButton: {
    marginVertical: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});