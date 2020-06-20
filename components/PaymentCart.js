import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { WebView } from 'react-native-webview';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class PaymentCart extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        auth_id:'',
        token:'token',
        amount: this.props.cartDetails.payable_amount.payable_amount,
        branch_id: this.props.cartDetails.branch_id.branch_id,
        cart_date: this.props.cartDetails.cart_date.cart_date,
        cart_amount: this.props.cartDetails.cart_amount.cart_amount,
        user_name:'',
        user_mobile_number:''
      }
    }

    
  async componentDidMount(){
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    this.setState({auth_id:AuthoKey});
    const params = new URLSearchParams();
    params.append('auth_id', AuthoKey);
    axios.post('http://studieo7.wssdemozone.in/api/getUserDetails',params)
      .then(response => {
        let resVal=response.data;
        if(resVal.status=='success'){
          this.setState({user_name:resVal.user_name,user_mobile_number:resVal.user_mobile_number});
        }
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }

  onNavigationStateChange = navState => {
    if (navState.url.indexOf('http://studieo7.wssdemozone.in/api/paymentCartupdate') === 0) {
      Actions.wallet({type: 'reset'});
    }
  };

  render() {
     if(this.state.serviceCheck==false)
            return null;
    const url = 'http://studieo7.wssdemozone.in/api/paymentCart/'+this.state.auth_id+'/'+this.state.token+'/'+this.state.amount+'/'+this.state.cart_amount+'/'+this.state.user_name+'/'+this.state.user_mobile_number+'/'+this.state.branch_id+'/'+this.state.cart_date;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Payment"}/>
                <WebView
                source={{
                  uri: url,
                }}
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={styles.paymentPopup}
              />
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
  paymentPopup:{
    width:'100%',
    height:'100%',
  },
  aboutText:{
    color:'#000',
    fontSize:RFValue(16),
    textAlign:'justify',
    marginTop:5,
    marginBottom:10,
  }
});
