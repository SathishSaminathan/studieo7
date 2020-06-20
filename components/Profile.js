import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, TouchableHighlight  } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';

import Header from './Header.js';
import Footer from './Footer.js';

import { Actions } from 'react-native-router-flux';


export default class Profile extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        full_name: '',
        email_id:'',
        mobile_number:'',
        serviceCheck:false
      }
    }

  async componentDidMount(){
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      axios.post('http://studieo7.wssdemozone.in/api/getAuthDetails',params)
        .then(response => {
          let resVal=response.data;
          if(resVal.status=='success'){
           this.setState({full_name:resVal.full_name,email_id:resVal.email_id,mobile_number:resVal.mobile_number});
          }
          this.setState({serviceCheck:true});
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
  }

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { full_name,email_id,mobile_number }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.detailsBox}>
                <View style={styles.detailsBoxInner}>
                    <View style={styles.detailsBoxDetails}>
                        <Text style={styles.detailsBoxDetailsItem}>{full_name}</Text> 
                        <Text style={styles.detailsBoxDetailsItem}>{email_id}</Text>
                        <Text style={styles.detailsBoxDetailsItem}>+91 {mobile_number}</Text>
                    </View>
                    <TouchableHighlight style={styles.detailsBoxIcons} onPress={() => Actions.profileedit()}>
                            <Image source={require('../assets/icons/edit.png')} style={styles.editIcon}/> 
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.profileMenu}>
                <TouchableHighlight style={styles.profileMenuItem}  onPress={() => Actions.faq()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/question.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>Help Center</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.aboutus()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/woman-with-long-hair.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>About Studieo'7</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.wallet()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/wallet.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>My Wallet</Text>
                      </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.profileMenuItem} onPress={() => Actions.logout()}>
                    <View style={styles.profileMenuItemInner}>
                      <View style={styles.profileMenuItemIcon}>
                          <Image source={require('../assets/icons/logout.png')} style={styles.profileItemIcon}/>
                      </View>
                      <View style={styles.profileMenuItemText}>
                          <Text style={styles.profileMenuItemTextItem}>Logout</Text>
                      </View>
                    </View>
                </TouchableHighlight>
            </View>
            <Footer/>
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
  detailsBox:{
    width:'100%',
    height:'20%',
  },
  detailsBoxInner:{
    flex:2,
    flexDirection: 'row',
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  detailsBoxDetails:{
    width:'80%',
    padding:10,
  },
  detailsBoxIcons:{
    width:'20%',
    alignItems:'center',
  },
  editIcon:{
    width:40,
    height:40,
    marginTop:'50%',
  },
  detailsBoxDetailsItem:{
    color:'#000',
    fontSize:RFPercentage(2.3),
    marginTop:'5%',
    paddingLeft:5,
  },
  profileMenu:{
    width:'100%',
    height:'50%',
    marginTop:10,
  },
  profileMenuItem:{
    width:'100%',
    height:70,
    padding:10,
    backgroundColor:'#FFF',
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    opacity:0.9,
    marginBottom:2,
  },
  profileMenuItemInner:{
    flex:2,
    flexDirection: 'row',
  },
  profileMenuItemIcon:{
    width:'15%',
  },
  profileMenuItemText:{
    width:'85%',
  },
  profileMenuItemTextItem:{
    color:'#333',
    fontSize:RFPercentage(2.3),
    padding:10,
  },
  profileItemIcon:{
    width:40,
    height:40,
    alignSelf:'center',
  }
});
