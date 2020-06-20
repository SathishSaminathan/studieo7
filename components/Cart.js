import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class Cart extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        cartList: '',
        totalAmount:0
      }
    }

    async componentDidMount(){
      this.getCartList();
    }
  
    
    async getCartList(){
      const { serviceListtemp }   = this.state;
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      axios.post('http://studieo7.wssdemozone.in/api/getCartList',params)
      .then(response => {
        this.setState({cartList:response.data.data, totalAmount:response.data.totalAmount});
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
    }

    removefromCartfunMain = async (data) =>{
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('service_id', data);
      axios.post('http://studieo7.wssdemozone.in/api/removefromCart',params)
        .then(response => {
          this.getCartList();
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
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
                              <View style={styles.serviceItemChildDetailsButton}>
                                  <TouchableHighlight style={styles.serviceItemRemoveButtonCSS} onPress={()=>this.removefromCartfunMain(data.service_id)}>
                                      <Text  style={styles.serviceItemAddCSS}>Remove</Text>
                                  </TouchableHighlight>
                              </View>
                          </View>  
                      </View>
                  </View>    
              </View>
          )
        })
      }else{
        return (
        <View style={styles.noRecordFound}>
          <Text style={styles.noRecordFoundText}>Your cart is empty</Text>
          <TouchableHighlight style={styles.continueShoppingButton} onPress={() => Actions.category()}>
              <Text  style={styles.continueShoppingButtonText}>Continue Shopping </Text>
          </TouchableHighlight>
        </View>
        )
      }
  }

  loadCartButton(){
    const { totalAmount }  = this.state ;
    if(this.state.cartList.length>0){
          return (
                      <TouchableHighlight style={styles.footerButton} onPress={() => Actions.orderselectbranch({orderItems:{totalAmount:{totalAmount}}})}>
                        <Text  style={styles.footerButtonText}>Continue to Select Branch </Text>
                      </TouchableHighlight>
          )
      }
    }

    loadCartTotal(){
      const { totalAmount }  = this.state ;
    if(this.state.cartList.length>0){
          return (
            <Text style={styles.totalAmountBox}>Total Amont: {totalAmount}</Text>
          )
      }
    }

  render() {
    if(this.state.serviceCheck==false)
    return null;
    const { totalAmount }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Cart Items"}/>

            <View style={styles.containerBox}>
                <View style={styles.containerBoxInner}>
                      <ScrollView style={styles.containerBoxTop}>
                          <View>
                            {this.loadCartItems()}
                          </View>
                          <View>
                            {this.loadCartTotal()}
                          </View>
                      </ScrollView> 
                      <View style={styles.containerBoxBottom}>
                            {this.loadCartButton()}
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
  serviceItemChild:{
    height:110,
    backgroundColor:'#FFF',
    opacity:0.9,
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
    paddingBottom:10,
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
    width:120,
    borderRadius:5,
    backgroundColor:'#d1a440',
  },
  serviceItemAddCSS:{
    color:'#000',
    fontSize:RFValue(16),
    alignSelf:'center',
  },
  noRecordFoundText:{
    color:'#000',
    fontSize:RFValue(16),
    margin:'10%',
    alignSelf:'center',
  },
  continueShoppingButton:{
    borderColor:'#d1a440',
    borderWidth:0.5,
    borderRadius:20,
    padding:10,
    alignSelf:'center',
    backgroundColor:'#d1a440',
  },
  continueShoppingButtonText:{
    color:'#000',
  },
  footerButton:{
    borderColor:'#d1a440',
    borderWidth:0.5,
    padding:10,
    alignSelf:'center',
    backgroundColor:'#d1a440',
    bottom:5,
    width:'100%',
  },
  footerButtonText:{
    padding:5,
    width:'100%',
    fontSize:RFValue(18),
    textAlign:'center',
  },
  totalAmountBox:{
    fontSize:RFValue(20),
    textAlign:'center',
    color:'#000',
    padding:10,
  }
});
