import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';


export default class WalletCashAdd extends Component {

    constructor(props) {
      super(props)
      this.state = {
        wallet_amount: '',
        serviceCheck:false
      }
    }


  walletRenewal = async () =>{
    const { wallet_amount }  = this.state ;
    Actions.payment({walletDetails:{wallet_amount:{wallet_amount}}});
  }

  render() {
    // if(this.state.serviceCheck==false)
    //         return null;
    const { wallet_amount }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Add Cash to Wallet"}/>
                <ScrollView  style={styles.containerBox}>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>Amount:</Text>
                    <TextInput keyboardType='numeric' style={styles.inputBox} maxLength={10} onChangeText={wallet_amount => this.setState({wallet_amount})}></TextInput>
                </View>
                   
                <TouchableHighlight style={styles.profileButton}  onPress={()=>this.walletRenewal()}>
                  <Text style={styles.buttonText}> Add Cash </Text> 
                </TouchableHighlight>

              </ScrollView> 
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  logoBox: {
    width: '100%',
    height: '100%',
    position:'absolute', 
    textAlign:'center',
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  containerBox:{
    padding:'8%',
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  profileItem:{
    marginBottom:20,
  },
  labelText:{
    color:'#000',
    width:'50%',
    alignSelf:'center',
    fontSize:RFValue(16),
    marginBottom:5,
  },
  inputBox:{
    height: 50,
    fontSize:24,
    padding:5,
    borderColor: '#333', 
    borderWidth: 1,
    width:'50%',
    alignSelf:'center',
    color:'#333',
    fontSize:RFValue(18),
  },
  profileButton:{
    borderColor:'#D1A440',
    borderWidth:1,
    backgroundColor:'#D1A440',
    width:'50%',
    height:50,
    alignSelf:'center',
  },
  buttonText:{
    fontSize:RFValue(22),
    padding:10,
    color:'#333',
    textAlign:'center',
  },
});
