import React,{useState, useEffect} from 'react';
import { View,Text,Image , StyleSheet, useWindowDimensions,ScrollView} from 'react-native';
import CustomInput from '../../compoments/CustomInput';
import CustomButton from '../../compoments/CustomButton';
import Logo from '../../assets/icon.png';

const SignupScreen =({ navigation })=>{
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [repassword, setrePassword]=useState('');
    const [email, setEmail]=useState('');
    const [RegPressed, SetRegPressed]=useState(false)
    signup_url= 'http://192.168.43.58:3000/signup';


    // Fetch server 
             //Signup
  useEffect(() => {
    if (RegPressed) {
        if (username && password && repassword===password && email)
      fetch(signup_url, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        })
      })
        .then((res) => res.json())
        .then((data) => {
            if (data.error){
                console.warn(data.error)
                SetRegPressed(false)
            }
            else{
                SetRegPressed(false)
                navigation.navigate('Login')
            }
          
        })
        .catch((err) => alert.error(err));

        else {
            SetRegPressed(false)
            console.warn("Please fill in the form correctly");
            
        }
    }
    }, [RegPressed]);



    const onRegisterPressed =()=>{
        SetRegPressed(true)
    }
    const onSigninPressed =()=>{
        navigation.navigate('Login')
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
  
    const onTermesPressed =()=>{
        console.warn("Termes");
    }
    const onPolicyPressed =()=>{
        console.warn("Policy");
    }
     const {height} =useWindowDimensions();
    return (
        <ScrollView showsVerticalScrollIndicator ={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
            <Image source={Logo} style={[styles.logo,{height: height*0.4}]} resizeMode='contain' />

            <Text style={styles.title} resizeMode='' > Create an account</Text>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomInput placeholder="Password repeat" value={repassword} setValue={setrePassword} secureTextEntry={true}/>
            <CustomButton text="Register" onPress={onRegisterPressed}/>
            <Text style={styles.text}>By clicking the Register button below,
            you agree with our {' '}
            <Text style={styles.link} onPress={onTermesPressed}>termes </Text>
            {' '}of use and {' '}
            <Text style={styles.link} onPress={onPolicyPressed}>privicy policy </Text> 
            </Text>
            <CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#E7EAF4" fgColor="#4765A9"/>
            <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44"/>
            <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor="#e3e3e3" fgColor="#363636"/>
            <CustomButton text="Have an account? Sign in!" onPress={onSigninPressed} type = "TERTIARY"/>
            </View>
        </ScrollView>
    )
}
const styles= StyleSheet.create({
    root :{
        alignItems :"center",
    },
    logo:{
        width : '100%',
        maxWidth : 200,
        maxHeight: 200,
    },
    
    title :{
        
        justifyContent: 'center',
        alignItems: 'center',
        fontSize : 30,
        fontWeight : 'bold',
        color:'#051C60',
       
        margin: 10,
        
    },
    text :{
        color: 'gray',
        marginVertical: 10,
    },
    link :{
        color :'#FDB075',
    },

})
export default SignupScreen;