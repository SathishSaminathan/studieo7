import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Constants } from 'expo';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

export default class History extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        historyList: ''
      }
    }


    async componentDidMount(){
      this.getHistoryList();
    }
  
    
    async getHistoryList(){
      const { historyList }   = this.state;
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      axios.post('http://studieo7.wssdemozone.in/api/mybookings',params)
      .then(response => {
        this.setState({historyList:response.data.data});
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
    }
    

  getHistoryBox() {
    if(this.state.historyList.length>0){
      return this.state.historyList.map((data,index) => {
        let statusText='';
        if(data.appointment_status==''){
          statusText='Upcoming';
        }else if(data.appointment_status=='A'){
          statusText='Completed';
        }
        return (
            <TouchableOpacity key={index} style={styles.bookingHistory}>
                <View style={styles.bookingHistoryInner}>
                    <View style={styles.bookingHistoryTop}>
                        <View style={styles.bookingHistoryTopInner}>
                            <View style={styles.historyTextLeft}>
                                <Text style={styles.historyText}>App. Id - {data.appointment_id}</Text>
                            </View>
                            <View style={styles.historyTextRight}>
                                <Text style={styles.historyText}>on {data.appointment_date}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bookingHistoryBottom}>
                        <View style={styles.bookingHistoryTopInner}>
                              <View style={styles.historyTextLeft}>
                                  <Text style={styles.historyText}>{data.branch_name}</Text>
                              </View>
                              <View style={styles.historyTextRight}>
                                  <Text style={styles.historyText}>{statusText}</Text>
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


  render() {
    if(this.state.serviceCheck==false)
    return null;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"History"}/>
               <ScrollView  style={styles.containerBox}>

                    {this.getHistoryBox()}

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
    backgroundColor:'#FFF',
    opacity:0.9,
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
});
