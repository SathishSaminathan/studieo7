import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView,  TouchableHighlight, ListView} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

const width = Dimensions.get('window').width

export default class Offers extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        TextInputValue: '',
        dataSource:''
      }
    }

  async componentDidMount(){
      axios.post('http://studieo7.wssdemozone.in/api/getOffersList',this.state)
      .then(response => {
        this.setState({serviceList:response.data.data});
        this.setState({serviceCheck:true});
      })
      .catch(errorMsg => {
          console.log(errorMsg);
      })
    }

  loadOffers() {
      return this.state.serviceList.map((data,index) => {
        return (
          < View key={index} style={{height: 150, width: '46%', margin:'2%'}}>
            <Image source={{uri:data.ads_file}} style={{ width: '100%', height: '100%'}}/>
          </View>
        )
      })
    }

  render() {
    if(this.state.serviceCheck==false)
    return null;
    const { dataSource }   = this.state;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Studie'o7 Offers"}/>

                <ScrollView  style={styles.containerBox}>

                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {this.loadOffers()}
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
    padding:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: 'red',
    width: (width / 2) - 15,
    height: 300,
    marginLeft: 10,
    marginTop: 10
  } 
});
