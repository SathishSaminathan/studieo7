import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';


export default class ProfileEdit extends Component {

    constructor(props) {
      super(props)
      this.state = {
        full_name: '',
        email_id:'',
        serviceCheck:false
      }
    }


    async componentDidMount(){
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      fetch('http://studieo7.wssdemozone.in/api/getAuthDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:"auth_id="+AuthoKey,
      })
      .then((response) => response.json())
      .then((responseJson) => {
        const resValue = Object.values(responseJson);
        if(resValue[0]=='success'){
          this.setState({full_name:resValue[1],email_id:resValue[2]});
        }
        this.setState({serviceCheck:true});
      })
      .catch((error) => {
        console.error(error); 
      });
  }


  updateProfile = async () =>{
    const { full_name,email_id }  = this.state ;
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    fetch('http://studieo7.wssdemozone.in/api/updateProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:"full_name="+full_name+"&email_id="+email_id+"&auth_id="+AuthoKey,
          })
      .then((response) => response.json())
      .then((responseJson) => {
        const resValue = Object.values(responseJson);
        if(resValue[0]=='success'){
            Actions.profile();
        }
      })
      .catch((error) => {
        console.error(error); 
      });
}

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { full_name,email_id }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Edit Profile"}/>
                <ScrollView  style={styles.containerBox}>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>Full Name</Text>
                    <TextInput style={styles.inputBox} maxLength={50} onChangeText={full_name => this.setState({full_name})}>{full_name}</TextInput>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>Email Address</Text>
                    <TextInput style={styles.inputBox}  maxLength={100} onChangeText={email_id => this.setState({email_id})}>{email_id}</TextInput>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.labelText}>Mobile Number</Text>
                    <Text style={styles.inputBox}>+91 9790615630</Text>
                </View>
                   
                <TouchableHighlight style={styles.profileButton}  onPress={this.updateProfile}>
                  <Text style={styles.buttonText}> Update Details </Text> 
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
    fontSize:RFValue(16),
    marginBottom:5,
  },
  inputBox:{
    height: 40,
    fontSize:24,
    padding:5,
    borderBottomColor: '#333', 
    borderBottomWidth: 1,
    width:'100%',
    color:'#333',
    fontSize:RFValue(18),
  },
  profileButton:{
    borderColor:'#D1A440',
    borderWidth:1,
    backgroundColor:'#D1A440',
    width:'60%',
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
