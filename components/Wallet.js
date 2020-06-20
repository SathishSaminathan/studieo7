import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
// import { WebView } from 'react-native-webview';

import BackButton from './BackButtonCart.js';

import { Actions } from 'react-native-router-flux';
// import RazorpayCheckout from 'react-native-razorpay';

export default class Wallet extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        TextInputValue: ''
      }
    }


    async componentDidMount(){
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      axios.post('http://studieo7.wssdemozone.in/api/getWallet',params)
        .then(response => {
          let resVal=response.data;
          if(resVal.status=='success'){
           this.setState({walletBalance:resVal.data.walletBalance,walletHistory:resVal.data.walletHistory});
          }
          this.setState({serviceCheck:true});
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
  }

  getWalletHistory() {

    if(this.state.walletHistory.length>0){
        return this.state.walletHistory.map((data,index) => {
          let resAmountPosCr=0;
          let resAmountPosDr=0;
          let serialNo=index+1;
          if(data.wallet_type=='C'){
            resAmountPosCr=data.amount;
          }else{
            resAmountPosDr=data.amount;
          }

          return (
            <View key={index} style={styles.walletActivity}>
                <View style={[styles.walletActivityBox1,styles.walletActivityItem]}>
                      <Text style={styles.walletActivityText}>{serialNo}</Text>
                </View>
                <View style={[styles.walletActivityBox2,styles.walletActivityItem]}>
                      <Text style={styles.walletActivityText}>{data.description}</Text>
                </View>
                <View style={[styles.walletActivityBox3,styles.walletActivityItem]}>
                      <Text style={styles.walletActivityText}>{data.created_on}</Text>
                </View>
                <View style={[styles.walletActivityBox4,styles.walletActivityItem]}>
                      <Text style={styles.walletActivityText}>{resAmountPosCr}</Text>
                </View>
                <View style={[styles.walletActivityBox5,styles.walletActivityItem]}>
                      <Text style={styles.walletActivityText}>{resAmountPosDr}</Text>
                </View>
            </View>
          )
        })
    }else{
      return (  
        <View><Text style={{textAlign:'center', padding:5}}>No activity fount</Text></View>
      )
    }
  }


  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { walletBalance,walletHistory }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Wallet"}/>
            <View style={styles.containerBox}>
                <View style={styles.walletBox}>
                    <View style={styles.walletBoxInner}>
                        <View style={styles.walletBoxIcon}>
                            <Image source={require('../assets/icons/wallet.png')} style={styles.walletIcon}/> 
                        </View>
                        <View style={styles.walletBoxBalance}>
                            <Text style={styles.walletBoxBalanceText}>Wallet Cash</Text>
                            <Text style={styles.walletBoxBalanceAmount}>{'\u20B9'} {walletBalance}</Text>
                        </View>
                        <View style={styles.walletBoxButton}>
                            <TouchableHighlight style={styles.walletBoxButtonItem} onPress={() => Actions.walletcashadd()}>
                                <Text style={styles.walletBoxButtonText}>Add Cash</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.walletHistoryBox}>
                    <Text style={styles.walletHistoryBoxTitle}>Wallet Activity</Text>

                    {/* <WebView source={{ uri: 'http://www.wssdemozone.in/payment.php' }} /> */}

                   
                    <View style={styles.walletActivityBox}>
                        <View style={styles.walletActivity}>
                            <View style={[styles.walletActivityBox1,styles.walletActivityBoxStyle]}>
                                  <Text style={styles.walletActivityText}>#</Text>
                            </View>
                            <View style={[styles.walletActivityBox2,styles.walletActivityBoxStyle]}>
                                  <Text style={styles.walletActivityText}>Description</Text>
                            </View>
                            <View style={[styles.walletActivityBox3,styles.walletActivityBoxStyle]}>
                                  <Text style={styles.walletActivityText}>Date</Text>
                            </View>
                            <View style={[styles.walletActivityBox4,styles.walletActivityBoxStyle]}>
                                  <Text style={styles.walletActivityText}>Credit</Text>
                            </View>
                            <View style={[styles.walletActivityBox5,styles.walletActivityBoxStyle]}>
                                  <Text style={styles.walletActivityText}>Debit</Text>
                            </View>
                        </View>

                        {this.getWalletHistory()}
                    </View>
                </ScrollView> 
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
  walletBox:{
    padding:10,
    width:'100%',
    height:110,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  walletBoxInner:{
    width:'100%',
    flex:3,
    flexDirection: 'row',
  },
  walletBoxIcon:{
    width:'20%',
    height:'100%',
    padding:5,
    alignSelf:'center',
  },
  walletBoxBalance:{
    width:'40%',
    height:'100%',
    padding:5,
  },
  walletBoxButton:{
    width:'40%',
    height:'100%',
    padding:10,
  },
  walletBoxBalanceText:{
    color:'#000',
    fontSize:RFValue(22),
    alignSelf:'center',
  },
  walletBoxBalanceAmount:{
    color:'#000',
    fontSize:RFValue(26),
    alignSelf:'center',
  },
  walletBoxButtonItem:{
    width:120,
    padding:5,
    borderColor:'#000',
    borderWidth:0.5,
    borderRadius:20,
    alignSelf:'center',
    backgroundColor:'#d1a440',
    marginTop:10,
  },
  walletBoxButtonText:{
    color:'#000',
    fontSize:RFValue(16),
    alignSelf:'center',
  },
  walletIcon:{
    height:70,
    width:70,
  },
  walletHistoryBox:{
    padding:10,
    marginTop:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  walletHistoryBoxTitle:{
    color:'#d1a440',
    fontSize:RFValue(18),
    alignSelf:'center',
    marginBottom:5,
  },
  walletActivity:{
    width:'100%',
    flex:5,
    flexDirection: 'row',
  },
  walletActivityBox1:{
    width:'10%',
  },
  walletActivityBox2:{
    width:'30%',
  },
  walletActivityBox3:{
    width:'30%',
  },
  walletActivityBox4:{
    width:'15%',
  },
  walletActivityBox5:{
    width:'15%',
  },
  walletActivityBoxStyle:{
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
    borderTopColor:'#333',
    borderTopWidth:0.5,
    padding:2,
  },
  walletActivityItem:{
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
    padding:2,
  },
  walletActivityText:{
    color:'#333',
    fontSize:RFValue(16),
  }
});
