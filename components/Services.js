import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, ScrollView, TextInput, Button, TouchableOpacity, TouchableHighlight  } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import ServiceListItem from './ServiceListItem.js';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class Services extends Component {

  constructor(props) {
    super(props)
    this.state = {
      serviceCheck:false,
      bannerImage: '',
      categoryTitle: '',
      serviceList:'',
      serviceListtemp:'',
      cartAddedItems:''
    }
  }
  
  async componentDidMount(){
    this.getServiceList();
  }

  
  async getServiceList(){
    const { serviceListtemp }   = this.state;
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    const params = new URLSearchParams();
    params.append('auth_id', AuthoKey);
    params.append('service_group_id', this.props.servicekey);
    axios.post('http://studieo7.wssdemozone.in/api/getServiceList',params)
    .then(response => {
      this.setState({bannerImage:response.data.data.categoryDetils[0].service_banner});
      this.setState({categoryTitle:response.data.data.categoryDetils[0].service_category_name});
      this.setState({serviceList:response.data.data.serviceDetails});
      this.setState({cartAddedItems:response.data.data.cartItems});
      this.setState({serviceCheck:true});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
  }

  
  addtoCartfunMain = async (data) =>{
    let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
    const params = new URLSearchParams();
    params.append('auth_id', AuthoKey);
    params.append('service_id', data);
    axios.post('http://studieo7.wssdemozone.in/api/addtoCart',params)
      .then(response => {
        this.getServiceList();
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
        this.getServiceList();
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
  }

  lapsList() {
    const { cartAddedItems}   = this.state;
    return this.state.serviceList.map((data,index) => {
      return (
        <ServiceListItem key={index} cartitmslist={cartAddedItems} servicelist={data} removefromCartfunMain={this.removefromCartfunMain} addtoCartfunMain={this.addtoCartfunMain}/>
      )
    })
  }
  
  getCartBox(){
    const cartAdVal = this.state.cartAddedItems;
   if(cartAdVal.length>0){
    return(
      <TouchableOpacity style={styles.serviceCartBox} onPress={() => Actions.cart()}>
        <Image source={require('../assets/icons/add-black.png')} style={styles.serviceCart}/>
      </TouchableOpacity>
      )
   }else{
    return(<View></View>)
   }
    
  }

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { bannerImage, serviceList,serviceListtemp,categoryTitle }   = this.state;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={categoryTitle}/>
            <View style={styles.bannerBox}>
                <View style={styles.bannerItem}>
                   <Image  source={{uri:bannerImage}}  resizeMode = 'cover' style={{ width: '100%', height:'100%',overflow: 'visible'}}/>
                </View> 
                {this.getCartBox()}
            </View>
            <ScrollView style={styles.listBox}>
            {this.lapsList()}
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
    // paddingHorizontal:70,
    textAlign:'center',
    flex:4,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:25,
    backgroundColor:'#000',
  },
  bannerBox:{
    width: '100%',
    height: '25%',
  },
  listBox:{
    width: '100%',
    height: '75%',
    backgroundColor:'#ccc',
  },
  serviceCartBox:{
    width:80,
    height:80,
    position:'absolute',
    bottom:10,
    right:10,
    borderColor:'#d1a440',
    borderWidth:0.5,
    borderRadius:40,
    backgroundColor:'#d1a440',
  },
  serviceCart:{
    height:'60%',
    width:'60%',
    margin:'20%',
  }
});
