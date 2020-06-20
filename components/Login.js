import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TextInput, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AndroidBack from './AndroidBack';
// import Toast from 'react-native-simple-toast';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
    }
  }


  loginProcess = async () =>{
        const { TextInputValue }  = this.state ;

        if(TextInputValue.length < 10) {
          // Toast.showWithGravity('Enter valid mobile number', Toast.LONG, Toast.TOP);
        }else{

          AsyncStorage.setItem('mobile_number',TextInputValue);  
          let DeviceId = await AsyncStorage.getItem('DeviceId');  
          const params = new URLSearchParams();
          params.append('mobile_number', TextInputValue);
          params.append('device_id', DeviceId);
          let baseURL = await AsyncStorage.getItem('baseURL');  
          debugger
          axios.post(baseURL+'api/register',params)
            .then(response => {
              Actions.loginotp();
            })
            .catch(errorMsg => {
                console.log(errorMsg);
            })
            
        }
  }


  render() {
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
          <View style={styles.logoBox}>

            <View style={styles.topLogo}>
              <Image source={require('../assets/logo.png')} style={{ width:'100%', height:'100%'}}/>
            </View>

            <Text style={[styles.loginText, styles.loginTextParent]}>Your favourite salon</Text>
            <Text style={styles.loginText}>now at your finger tip</Text>

              <View>
                <Text style={styles.mobilenumberText}>Enter your mobile number</Text>
                <View style={styles.mobilenumberParentBox}>
                  <View style={styles.mobilenumberParentBoxInner}>
                    <TextInput keyboardType='numeric' style={styles.mobileBoxCountryCode} maxLength={3} defaultValue='+91' editable={false} />
                    <TextInput  placeholder="Mobile Number" keyboardType='numeric' style={styles.mobileBox} maxLength={10}  onChangeText={TextInputValue => this.setState({TextInputValue})}/>
                  </View>
                </View>
              
                <TouchableHighlight style={styles.loginButton}  onPress={this.loginProcess}>
                  <Image style={styles.loginButtonImage} source={require('../assets/login-button.png')} />
                </TouchableHighlight>
   
              </View>
          </View>
          <AndroidBack/>
              
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: 320,
    height: '80%',
    marginTop:'20%',
    position:'absolute', 
    alignSelf:'center',
    padding:'5%',
    flex:1,
  },
  loginTextParent:{
    marginTop:50,
  },
  topLogo:{
    width: 280,
    height: 70,
    alignSelf:'center',
  },
  loginText:{
    color:'#FFF',
    fontSize:24,
    textAlign:'center',
  },
  mobilenumberText:{
    color:'#FFF',
    fontSize:24,
    textAlign:'center',
    marginTop:50,
  },
  mobilenumberParentBox:{
    marginTop:10,
    width:'100%',
    height:50,
  },
  mobilenumberParentBoxInner:{
    flex:2,
    flexDirection: 'row',
  },
  mobileBoxCountryCode:{
    height: 50,
    fontSize:24,
    padding:5,
    textAlign:'center',
    borderColor: '#FFF', 
    backgroundColor:'#FFF',
    borderWidth: 1,
    width:'20%',
  },
  mobileBox:{
    height: 50,
    fontSize:24,
    padding:5,
    textAlign:'center',
    borderColor: '#FFF', 
    backgroundColor:'#FFF',
    borderWidth: 1,
    width:'80%',
  },
  loginButton:{
    height:'auto',
    width:'100%',
    marginTop:20,
    backgroundColor:'#FFF',
    borderWidth: 1,
  },
  loginButtonImage:{
    width:'100%',
    height:50,
  },
});
