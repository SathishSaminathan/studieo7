import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Actions } from 'react-native-router-flux';


export default class Logout extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
      }
    }


    async componentDidMount(){
      let AuthoKey = await AsyncStorage.getItem('AuthoKey');
      fetch('http://studieo7.wssdemozone.in/api/authlogout', {
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
          this.removeKeys();
        }
        this.setState({serviceCheck:true});
      })
      .catch((error) => {
        console.error(error); 
      }); 
  }

  async removeKeys(){
      await AsyncStorage.removeItem('AuthoKey');
      await AsyncStorage.removeItem('DeviceId');
      Actions.login();
  } 

  render() {
    if(this.state.serviceCheck==false)
            return null;
    return (
      <View>
        <Text>Logout</Text>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({

});
