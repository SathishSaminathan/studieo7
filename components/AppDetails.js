import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class AppDetails extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        appId:this.props.appItems.appID.appId,
        cartList: '',
      }
    }

    async componentDidMount(){
      this.getHistoryList();
    }
  
    
    async getHistoryList(){
      const { appId}   = this.state;
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('app_id', appId);
      let baseURL = await AsyncStorage.getItem('baseURL');  
      axios.post(baseURL+'api/app_details',params)
      .then(response => {
        this.setState({historyList:response.data.data.appointmentDetails});
        this.setState({cartList:response.data.data.cartItems});
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
    }


    getHistoryBox() {
      if(this.state.historyList.length>0){
        return this.state.historyList.map((data,index) => {
          return (
           
              <TouchableOpacity key={index} style={styles.bookingHistory}>
                  <View style={styles.bookingHistoryInner}>
                      <View style={styles.bookingHistoryTop}>
                          <View style={styles.bookingHistoryTopInner}>
                              <View style={styles.historyTextLeft}>
                                  <Text style={styles.historyText}>App. Id - {data.appointment_id} - {'\u20B9'} {data.amount}</Text>
                              </View>
                              <View style={styles.historyTextRight}>
                                  <Text style={styles.historyText}>{data.appointment_date}</Text>
                              </View>
                          </View>
                      </View>
                      <View style={styles.bookingHistoryBottom}>
                          <View style={styles.bookingHistoryTopInner}>
                                <View style={styles.historyTextLeft}>
                                    <Text style={styles.historyText}>{data.branch_name}</Text>
                                </View>
                                <View style={styles.historyTextRight}>
                                    <Text style={styles.historyText}>{data.branch_contact_no_1}</Text>
                                </View>
                            </View>
                      </View>
                  </View>
              </TouchableOpacity>
           
          )
        })
      }else{
        return (
          <View><Text style={{alignSelf:'center', margin:10}}>No record found</Text></View>
        )
      }
    }


    loadCartItems(){
      if(this.state.cartList.length>0){
          return this.state.cartList.map((data,index) => {
            return (
              <View key={index} style={styles.serviceItemChild}>
                    <View style={styles.serviceItemChildInner}>
                        <View style={styles.serviceItemChildTitle}>
                              <Text style={styles.servicetitletextCSS}>{data.service_name} </Text>  
                        </View>
                        <View style={styles.serviceItemChildDetails}>
                            <View style={styles.serviceItemChildDetailsInner}>
                                <View style={styles.serviceItemChildDetailsPrice}>
                                    <Text style={styles.serviceItemPriceCSS}> {'\u20B9'} {data.regular_amount} </Text>  
                                </View>
                            </View>  
                        </View>
                    </View>    
                </View>
            )
          })
        }
    }
    
    appointmentStatus(){
      if(this.state.historyList[0].payment_type=='Cash'){
        return(
          <Text  style={styles.appointmentClosedRed}>Cash Payment</Text>
        )
      }else{
        return(
          <Text  style={styles.appointmentClosed}>Wallet Payment</Text>
        )
      }
    }

    completeService = async () =>{
      const { appId}   = this.state;
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('app_id', appId);
      axios.post('http://studieo7.wssdemozone.in/api/branch_closeAppointment',params)
        .then(response => {
            Actions.history();
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

  render() {
    if(this.state.serviceCheck==false)
    return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
          <View style={styles.topSpace}></View>
          <BackButton backtext={"Appointment Details"}/>
          <ScrollView  style={styles.containerBox}>
              
              <View>
                {this.getHistoryBox()}
              </View>
              
              <View>
                {this.appointmentStatus()}
              </View>

              <View style={styles.pageTitleBox}>
                  <Text style={styles.pageTitle}>Services to do</Text>
              </View>

              <View>
                {this.loadCartItems()}
              </View>

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
    color:'#333',
    fontSize:RFValue(16),
    backgroundColor:'#FFF',
    height:'82%',
  },
  bookingHistory:{
    width:'100%',
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
    padding:5,
  },
  bookingHistoryInner:{
    width:'100%',
    flex:2,
    flexDirection: 'column',
  },
  bookingHistoryTop:{
    width:'100%',
  },
  bookingHistoryBottom:{
    width:'100%',
  },
  bookingHistoryTopInner:{
    flex:2,
    flexDirection: 'row',
  },
  historyTextLeft:{
    width:'50%',
  },
  historyTextRight:{
    width:'50%',
  },
  historyText:{
    color:'#000',
    fontSize:RFValue(16),
    padding:5,
  },
  serviceItemChild:{
    height:110,
    backgroundColor:'#FFF',
    opacity:0.9,
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
  },
  serviceItemChildInner:{
    flex:2,
    flexDirection: 'column',
  },
  serviceItemChildTitle:{
    width:'100%',
    height:'50%',
    padding:10,
  },
  servicetitletextCSS:{
    color:'#000',
    fontSize:RFValue(16),
  },
  serviceItemChildDetails:{
    width:'100%',
    height:'50%',
    borderBottomColor:'#eee',
  },
  serviceItemChildDetailsInner:{
    flex:2,
    flexDirection: 'row',
  },
  serviceItemChildDetailsPrice:{
    width:'70%',
  },
  serviceItemPriceCSS:{
    padding:5,
    color:'#000',
    fontSize:RFValue(16),
  },
  serviceItemChildDetailsButton:{
    width:'30%',
  },
  serviceItemAddButtonCSS:{
    padding:5,
    borderColor:'#d1a440',
    borderWidth:0.5,
    width:80,
    borderRadius:5,
  },
  serviceItemRemoveButtonCSS:{
    padding:5,
    borderColor:'#d1a440',
    borderWidth:0.5,
    width:80,
    borderRadius:5,
    backgroundColor:'#d1a440',
  },
  serviceItemAddCSS:{
    color:'#000',
    fontSize:RFValue(16),
    alignSelf:'center',
  },
  pageTitleBox:{
    height:30,
    backgroundColor:'#edc89e',
    padding:3,
    opacity:0.8,
  },
  pageTitle:{
    color:'#000',
    textAlign:'center',
    letterSpacing:10,
    fontSize:RFValue(16),
  },
  footerButton:{
    borderColor:'#d1a440',
    borderWidth:0.5,
    padding:5,
    alignSelf:'center',
    backgroundColor:'#d1a440',
    margin:10,
    width:'50%',
  },
  footerButtonText:{
    width:'100%',
    fontSize:RFValue(18),
    textAlign:'center',
  },
  appointmentClosed:{
    backgroundColor:'green',
    width:'50%',
    margin:10,
    padding:5,
    borderWidth:0.5,
    borderColor:'#d1a440',
    alignSelf:'center',
    fontSize:RFValue(18),
    textAlign:'center',
    color:'#FFF',
  },
  appointmentClosedRed:{
    backgroundColor:'red',
    width:'50%',
    margin:10,
    padding:5,
    borderWidth:0.5,
    borderColor:'#d1a440',
    alignSelf:'center',
    fontSize:RFValue(18),
    textAlign:'center',
    color:'#FFF',
  }
});
