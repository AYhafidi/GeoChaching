// HomeScreen.js
import React, { useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Image, Button } from 'react-native';

import CustomButton from '../compoments/CustomButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Image source={require("../assets/icon.png")} style={[{
        alignItems: 'center',
        justifyContent: 'center',
        }]}/>
        <Text style={styles.text}>GeoCaching</Text>
      </View>
      <CustomButton text = 'Login'  onPress={() => navigation.navigate('Login')}/>

      <CustomButton style={styles.button} bgColor="#E7EAF4" fgColor="#4765A9" type= "TERTIARY" text="Signup" onPress={() => navigation.navigate('Signup')}/>

    </View>
  );
};

const styles = StyleSheet.create({

  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  Logo :{
    width: "60%",
    height:"60%",
    position:'absolute',
    top:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'powderblue',
    flex:1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:"100%",
    width:"100%"
  },

  buttoncontainer:{
    backgroundColor:"red",
    width:"100%",
    alignSelf:"flex-end"
  },
});

export default HomeScreen;