import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, Picker, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

import { Actions } from 'react-native-router-flux';

export default class OrderSelectDate extends Component {

    constructor(props) {
      super(props)
      this.state = {
        cart_amount:this.props.orderItems.totalAmount.totalAmount,
        cart_branch:this.props.orderItems.branchId.selectedBranchId,
        date:''
      }
    }

    async componentDidMount(){
        axios.post('http://studieo7.wssdemozone.in/api/getCurrentTime',this.state)
        .then(response => {
          let resVal=response.data;
          if(resVal.status=='success'){
            this.setState({date:resVal.dateTime});
           }
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

    appointmentProcess = async () =>{
      const { cart_amount, cart_branch, date }  = this.state ;
      Actions.preview({cartDetails:{cart_amount:{cart_amount},cart_branch:{cart_branch},date:{date}}});
    }

  render() {
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={" Date & Time Selection"}/>

                <View style={styles.containerBox}>
                      <View style={styles.containerBoxInner}>
                            <ScrollView style={styles.containerBoxTop}>


                                    <View style={styles.profileItem}>
                                      <Text style={styles.labelText}>Date & Time:</Text>
                                      <DatePicker
                                        style={styles.inputBox}
                                        date={this.state.date}
                                        mode="datetime"
                                        placeholder="select date time"
                                        format="DD-MM-YYYY hh:mm A"
                                        minDate={this.state.date}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"

                                        onDateChange={(date) => {this.setState({date: date})}}
                                      />
                                    </View>

                                    {/* <View style={styles.profileItem}>
                                      <Text style={styles.labelText}>Staff:</Text>
                                        <Picker style={styles.selectBox}
                                          selectedValue={this.state.language}
                                          onValueChange={(itemValue, itemIndex) =>
                                            this.setState({language: itemValue})
                                          }>
                                          <Picker.Item label="Java" value="java" />
                                          <Picker.Item label="JavaScript" value="js" />
                                        </Picker>
                                     </View> */}
                                    

                            </ScrollView> 
                            <View style={styles.containerBoxBottom}>
                                  <TouchableHighlight style={styles.footerButton} onPress={this.appointmentProcess}>
                                    <Text  style={styles.footerButtonText}>Continue to Payment </Text>
                                  </TouchableHighlight>
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
  profileItem:{
    marginBottom:20,
    marginTop:20,
    width:'80%',
    alignSelf:'center',
  },
  labelText:{
    color:'#000',
    width:'100%',
    alignSelf:'center',
    fontSize:RFValue(16),
    marginBottom:5,
  },
  inputBox:{
    height: 50,
    padding:5,
    width:'100%',
    alignSelf:'center',
  },
  selectBox:{
    borderColor:'#333',
    borderWidth:0.5,
    height: 50,
    padding:5,
    width:'100%',
    alignSelf:'center',
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
  }
});
