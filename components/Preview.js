import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class Preview extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        cart_amount: this.props.cartDetails.cart_amount.cart_amount,
        cart_date: this.props.cartDetails.date.date,
        branch_id:this.props.cartDetails.cart_branch.cart_branch,
        branch_details:'',
        payment_type:'',
        payable_amount:'',
        wallet_balance:''
      }
    }

    async componentDidMount(){
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('branch_id', this.props.cartDetails.cart_branch.cart_branch);
      params.append('amount', this.props.cartDetails.cart_amount.cart_amount);
      axios.post('http://studieo7.wssdemozone.in/api/getWalletStatus',params)
      .then(response => {
        let resVal=response.data;
        if(resVal.status=='success'){
          this.setState({branch_details:resVal.branch_details});
          this.setState({payment_type:resVal.payment_type});
          this.setState({payable_amount:resVal.amount});
          this.setState({wallet_balance:resVal.wallet_balance});
         }
         this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }


  async payviaWallet(){
    const { branch_id, payment_type, cart_amount, cart_date }  = this.state ;
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    const params = new URLSearchParams();
    params.append('auth_id', AuthoKey);
    params.append('payment_type', payment_type);
    params.append('amount', cart_amount);
    params.append('branch_id', branch_id);
    params.append('app_date', cart_date);
    axios.post('http://studieo7.wssdemozone.in/api/processWalletPayment',params)
    .then(response => {
      console.log(response.data);
      let resVal=response.data;
      if(resVal.status=='success'){
          Actions.wallet();
       }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })

  }

  async payviaOnline(){
    const { branch_id, payment_type, payable_amount, cart_date, cart_amount }  = this.state ;
     Actions.paymentcart({cartDetails:{branch_id:{branch_id},payment_type:{payment_type},cart_amount:{cart_amount},payable_amount:{payable_amount},cart_date:{cart_date}}});
  }


  loadPreviewButton(){
    if(this.state.payment_type=='wallet'){
        return (
          <TouchableHighlight style={styles.footerButton} onPress={()=>this.payviaWallet()}>
            <Text  style={styles.footerButtonText}> Pay from Wallet</Text>
          </TouchableHighlight>
          )
    }else{
      return (
        <TouchableHighlight style={styles.footerButton} onPress={()=>this.payviaOnline()}>
            <Text  style={styles.footerButtonText}>Pay via Online</Text>
        </TouchableHighlight>
        )
    }
   
  }
    

  render() {
    if(this.state.serviceCheck==false)
    return null;

    const { branch_details, payment_type, payable_amount, wallet_balance, cart_amount, cart_date }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Appointment Preview"}/>


            <View style={styles.containerBox}>
                <View style={styles.containerBoxInner}>
                      <ScrollView style={styles.containerBoxTop}>
                                <View style={styles.previewBox}>
                                    <View style={styles.previewBoxInner}>
                                        <View style={styles.previewBoxTitle}>
                                            <Text style={styles.generalText}>Total Amount:</Text>
                                        </View>
                                        <View style={styles.previewBoxContent}>
                                            <Text style={styles.generalText}>{'\u20B9'} {cart_amount}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.previewBox}>
                                    <View style={styles.previewBoxInner}>
                                        <View style={styles.previewBoxTitle}>
                                            <Text style={styles.generalText}>Branch:</Text>
                                        </View>
                                        <View style={styles.previewBoxContent}>
                                            <Text style={styles.generalText}>{branch_details}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.previewBox}>
                                    <View style={styles.previewBoxInner}>
                                        <View style={styles.previewBoxTitle}>
                                            <Text style={styles.generalText}>Date:</Text>
                                        </View>
                                        <View style={styles.previewBoxContent}>
                                            <Text style={styles.generalText}>{cart_date}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.previewBox}>
                                    <View style={styles.previewBoxInner}>
                                        <View style={styles.previewBoxTitle}>
                                            <Text style={styles.generalText}>Wallet Balance:</Text>
                                        </View>
                                        <View style={styles.previewBoxContent}>
                                            <Text style={[styles.generalText, styles.paymentDesign1]}>{'\u20B9'} {wallet_balance}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.previewBox}>
                                    <View style={styles.previewBoxInner}>
                                        <View style={styles.previewBoxTitle}>
                                            <Text style={styles.generalText}>Pay Online:</Text>
                                        </View>
                                        <View style={styles.previewBoxContent}>
                                            <Text style={[styles.generalText, styles.paymentDesign2]}>{'\u20B9'} {payable_amount}</Text>
                                        </View>
                                    </View>
                                </View>
                      </ScrollView> 
                      <View style={styles.containerBoxBottom}>

                            {this.loadPreviewButton()}
                            
                      </View>
                </View>
            </View>

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
    height:'100%',
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  containerBoxInner:{
    flex:2,
    flexDirection: 'column',
  },
  containerBoxBottom:{
    height:125,
  },
  previewBox:{
    width:'100%',
    marginBottom:5,
    marginTop:5,
  },
  previewBoxInner:{
    flex:2,
    flexDirection: 'row',
  },
  previewBoxTitle:{
    width:'40%',
  },
  previewBoxContent:{
    width:'60%',
  },
  generalText:{
    color:'#000',
    fontSize:RFValue(16),
    padding:10,
  },
  paymentDesign1:{
    color:'green',
    fontSize:RFValue(28),
  },
  paymentDesign2:{
    color:'blue',
    fontSize:RFValue(28),
  },
  footerButton:{
    borderColor:'#d1a440',
    borderWidth:0.5,
    padding:10,
    alignSelf:'center',
    backgroundColor:'#d1a440',
    bottom:0,
    width:'100%',
  },
  footerButtonText:{
    padding:5,
    width:'100%',
    fontSize:RFValue(18),
    textAlign:'center',
  },
});
