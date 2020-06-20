import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Alert, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
// import Toast from 'react-native-simple-toast';

export default class Preview extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        cart_amount: this.props.cartDetails.cart_amount.cart_amount,
        cart_date: this.props.cartDetails.date.date,
        branch_id:this.props.cartDetails.cart_branch.cart_branch,
        staff_id:this.props.cartDetails.staff && this.props.cartDetails.staff.staff,
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
      let baseURL = await AsyncStorage.getItem('baseURL');  
      axios.post(baseURL+'api/getWalletStatus',params)
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
    const { branch_id, staff_id, payment_type, cart_amount, cart_date }  = this.state ;
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    const params = new URLSearchParams();
    params.append('auth_id', AuthoKey);
    params.append('payment_type', payment_type);
    params.append('amount', cart_amount);
    params.append('branch_id', branch_id);
    params.append('staff_id', staff_id);
    params.append('app_date', cart_date);
    let baseURL = await AsyncStorage.getItem('baseURL');  
    axios.post(baseURL+'api/processWalletPayment',params)
    .then(response => {
      let resVal=response.data;
      if(resVal.status=='success'){
          Actions.wallet();
          // Toast.showWithGravity('Appointment booked successfully', Toast.LONG, Toast.TOP);
       }
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })

  }

  async payviaOnline(){
    const { branch_id, staff_id, payment_type, payable_amount, cart_date, cart_amount }  = this.state ;
     Actions.paymentcart({cartDetails:{branch_id:{branch_id},staff_id:{staff_id},payment_type:{payment_type},cart_amount:{cart_amount},payable_amount:{payable_amount},cart_date:{cart_date}}});
  }

  async payatSalonConfirm(){
      const { branch_id, staff_id, payment_type, cart_amount, cart_date }  = this.state ;

      console.log(staff_id);
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('payment_type', payment_type);
      params.append('amount', cart_amount);
      params.append('branch_id', branch_id);
      params.append('staff_id', staff_id);
      params.append('app_date', cart_date);
      let baseURL = await AsyncStorage.getItem('baseURL');  
      axios.post(baseURL+'api/processSalonPayment',params)
      .then(response => {
        let resVal=response.data;
        if(resVal.status=='success'){
            Actions.history();
            // Toast.showWithGravity('Appointment booked successfully', Toast.LONG, Toast.TOP);
        }
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }

  async payatSalon(){
      Alert.alert(
        'Warning',
        'Are you sure? You will pay at salon?',
        [
          {text: 'Yes', onPress: () => this.payatSalonConfirm()},
          {text: 'No', onPress: () => console.log('No Pressed')},
        ],
        {cancelable: false},
      );
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
          <View style={styles.footerButtonBox}>
              <View style={styles.footerButtonBoxInner}>
                <TouchableHighlight style={styles.footerButtonCustome} onPress={()=>this.payviaOnline()}>
                    <Text  style={styles.footerButtonText}>Pay Online</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.footerButtonCustome} onPress={()=>this.payatSalon()}>
                <Text  style={styles.footerButtonText}>Pay at Salon</Text>
                </TouchableHighlight>
              </View>
          </View>
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
                                            <Text style={styles.generalText}>Balance Amount:</Text>
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
  footerButtonBox:{
    width:'100%',
  },
  footerButtonBoxInner:{
    flex:2,
    flexDirection: 'row',
  },
  footerButtonCustome:{
    borderColor:'#d1a440',
    borderWidth:0.5,
    padding:10,
    alignSelf:'center',
    backgroundColor:'#d1a440',
    bottom:5,
    width:'40%',
    marginLeft:'5%',
    marginRight:'5%',
  },
  footerButtonText:{
    padding:5,
    width:'100%',
    fontSize:RFValue(18),
    textAlign:'center',
  },
});
