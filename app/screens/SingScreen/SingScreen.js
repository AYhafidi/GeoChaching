import React,{useState, useEffect} from 'react';
import { View,Text,Image , StyleSheet, useWindowDimensions,ScrollView} from 'react-native';
import Logo from '../../assets/icon.png';
import CustomInput from '../../compoments/CustomInput';
import CustomButton from '../../compoments/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

const SingScreen =( {navigation})=>{
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [sipressed, setSIPressed]=useState(false);
    signin_url= 'http://192.168.43.58:3000/signin';

    const cookie = new Cookies();
    // Fetch server 
             //Signup
  useEffect(() => {
    if (sipressed) {
        if (username && password)
      fetch(signin_url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
        })
      })
        .then((res) => res.json())
        .then((data) => {
            if (data.error){
                setSIPressed(false)
                console.warn(data.error)
                
            }
            else{
                setSIPressed(false)
                cookie.set('username', username,{path:'/'})
                navigation.navigate('Map', {username})
            }
          
        })
        .catch((err) => alert.error(err));

        else {
            setSIPressed(false)
            console.warn("Please fill in the form correctly");
            
        }
    }
    }, [sipressed]);





    const onSignInPressed =()=>{
        setSIPressed(true)
    }
    const onSignUpPressed =()=>{
        navigation.navigate('Signup')
    }
    const onSignInFacebook =()=>{
        console.warn("Sign in with facebook");
    }
    const onSignInGoogle =()=>{
        console.warn("Sign in with Google");
    }
    const onSignInApple =()=>{
        console.warn("Sign in with Apple");
    }
    const onForgotPasswordPressed =()=>{
        console.warn("Forgot password");
    }
     const {height} =useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator ={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>
           <Image source={Logo} style={[styles.logo,{height: height*0.4}]} resizeMode='contain' />
           <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
           <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
          <CustomButton text="Sign In" onPress={onSignInPressed}/>
          <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type = "TERTIARY"/>
          <CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#E7EAF4" fgColor="#4765A9"/>
          <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44"/>
          <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor="#e3e3e3" fgColor="#363636"/>
          <CustomButton text="Don't have an account? Create one!" onPress={onSignUpPressed} type = "TERTIARY"/>

        </View>
        </ScrollView>
    )
}
const styles= StyleSheet.create({
    root :{
        alignItems :"center",
    },
    logo:{
        flex :1,
        width : '100%',
        maxWidth : 300,
        maxHeight: 250,
    },
})
export default SingScreen