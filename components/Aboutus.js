import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class Aboutus extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: ''
      }
    }

  render() {
    
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"About Studie'o7"}/>

                {/* <WebView
                source={{
                  uri: 'http://www.wssdemozone.in/payment.php',
                }}
                // onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1 }}
              /> */}


               <ScrollView  style={styles.containerBox}>
                    <Text style={styles.aboutText}>Studie'o 7 bring you best experience with everyone can afford it and enjoy the service provided by us. We bring a wonderful salon and spa experience to your neighbourhood. </Text>
                    <Text style={styles.aboutText}>We provide various list of services like hair and skin care, spa and bridal packages to give you a holistic approach to create a heavenly feel.At our salons, you will receive the best in beauty industry. </Text>
                    <Text style={styles.aboutText}>And you’ll find that even our prices treat you comfortable. The wide range of beauty things that will make u feel so good.Finally,the place where you feel that you are going to be really admired by everyone by your beauty.All are customers are valued. </Text>
                    <Text style={styles.aboutText}>We bring you the bridal packages and make-ups in an affordable cost. All of you are welcome. U can drop in any time. </Text>
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
    padding:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  aboutText:{
    color:'#000',
    fontSize:RFValue(16),
    textAlign:'justify',
    marginTop:5,
    marginBottom:10,
  }
});
