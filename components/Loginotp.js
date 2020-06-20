import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableHighlight  } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Actions } from 'react-native-router-flux';
import BackButton from './LoginBackButton.js';
import axios from 'axios';
// import Toast from 'react-native-simple-toast';

export default class Loginotp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      otpCode:''
    }
  }

  
  async componentWillMount(){
    let mobile_number = await AsyncStorage.getItem('mobile_number');  
    this.setState({ TextInputValue: mobile_number });
    // Toast.showWithGravity('OTP send successfully', Toast.LONG, Toast.TOP);
  }

  resendOTP = async() =>{

      let mobile_number = await AsyncStorage.getItem('mobile_number');  
      const params = new URLSearchParams();
      params.append('mobile_number', mobile_number);
      let baseURL = await AsyncStorage.getItem('baseURL');  
      axios.post(baseURL+'api/resendOTP',params)
      .then(response => {
        // Toast.showWithGravity('OTP re-send successfully', Toast.LONG, Toast.TOP);
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
      
  }

  verifyOTP = async() =>{

        const { otpCode }  = this.state ;
        let mobile_number = await AsyncStorage.getItem('mobile_number');  
        const params = new URLSearchParams();
        params.append('mobile_number', mobile_number);
        params.append('otp', otpCode);
        let baseURL = await AsyncStorage.getItem('baseURL');  
        axios.post(baseURL+'api/verifyOTP',params)
          .then(response => {
            let resVal=response.data;
            if(resVal.status=='success'){
              // Toast.showWithGravity('OTP verified successfully', Toast.LONG, Toast.TOP);
              AsyncStorage.setItem('AuthoKey',resVal.user_id); 
              Actions.dashboard();
            }else{
              // Toast.showWithGravity('Invalid OTP', Toast.LONG, Toast.TOP);
            }

          })
          .catch(errorMsg => {
              console.log(errorMsg);
          })

  }

  render() {
    const { TextInputValue }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
          
        <View style={styles.logoBoxMain}>

            <View style={styles.topSpace}></View>
            <BackButton backtext={'OTP Verification'}/>


            <View style={styles.logoBox}>
            
                <View style={styles.containerBox}>
                    <Text style={[styles.loginText, styles.loginTextParent, styles.marginBottom30]}>Enter verification code</Text>
                    <Text style={[styles.loginText, styles.marginBottom30]}>We have sent you a 4 digit verification code on</Text>
                    <Text style={styles.loginText}>+91 {TextInputValue}</Text>

                      <View>
                      
                        <OTPInputView
                          style={{width: '100%', height: 100}}
                          pinCount={4}
                          autoFocusOnLoad
                          codeInputFieldStyle={styles.underlineStyleBase}
                          codeInputHighlightStyle={styles.underlineStyleHighLighted}
                          onCodeFilled = {otpCode => this.setState({otpCode})}
                      />

                        <View style={styles.otpActionBox}>
                          <TouchableHighlight style={styles.resendOTP}  onPress={this.resendOTP}>
                            <Text style={styles.resendOTPText}> Resend OTP </Text> 
                          </TouchableHighlight>

                          <TouchableHighlight style={styles.verifyOTP}  onPress={this.verifyOTP}>
                            <Text style={styles.verifyOTPText}> Verify OTP </Text> 
                          </TouchableHighlight>
                        </View>
                        
                        
                      </View>
              </View> 
          </View>
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  resendOTP:{
    borderColor:'#D1A440',
    borderWidth:1,
    backgroundColor:'#333',
    width:'48%',
    height:40,
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  resendOTPText:{
    fontSize:18,
    padding:5,
    color:'#FFF',
    textAlign:'center',
  },
  verifyOTP:{
    borderColor:'#D1A440',
    borderWidth:1,
    backgroundColor:'#D1A440',
    width:'48%',
    height:40,
    marginLeft:'4%',
    // textAlign:'right',
  },
  verifyOTPText:{
    fontSize:18,
    padding:5,
    color:'#333',
    textAlign:'center',
  },
  otpActionBox:{
    height:50,
    width:'100%',
    flex:2,
    flexDirection: 'row',
  },
  logoBoxMain: {
    width: '100%',
    height: '100%',
    position:'absolute', 
    textAlign:'center',
    flex:2,
    flexDirection: 'column',
  },
  logoBox: {
    width: '80%',
    height: '80%',
    alignSelf:'center',
    flex:1,
  },
  containerBox:{
    marginTop:'5%',
    paddingHorizontal:20,
  },
  loginTextParent:{
    marginTop:50,
  },
  topLogo:{
    width: 250,
    height: 60,
    alignSelf:'center',
  },
  marginBottom30:{
    marginBottom:30,
  },
  loginText:{
    color:'#FFF',
    fontSize:24,
    textAlign:'center',
  },
  mobileBox:{
    marginTop:50,
    height: 50,
    fontSize:24,
    padding:5,
    textAlign:'center',
    borderColor: '#FFF', 
    backgroundColor:'#FFF',
    borderWidth: 1,
    width:'100%',
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
  },
  borderStyleBase: {
    width: '20%',
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    color:'#FFF',
    padding:10,
    fontSize:20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
