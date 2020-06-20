import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import Accordion from 'react-native-collapsible/Accordion';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

var SECTIONS = [];

export default class Branch extends Component {

    constructor(props) {
      super(props)
      this.state = {
        TextInputValue: '',
        serviceCheck:false,
        activeSections: [],
        branchList:''
      }
     
    }


    async componentDidMount(){

        let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
        const params = new URLSearchParams();
        params.append('auth_id', AuthoKey);

        axios.post('http://studieo7.wssdemozone.in/api/getBranchList',params)
        .then(response => {
             SECTIONS= response.data.data;
            this.setState({serviceCheck:true});
            // arr.forEach(function(entry) {
            //   console.log(entry.branch_location);
            // });
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }


  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.branchName}>{section.branch_name}</Text>
        <Text style={styles.branchLocation}>Location: {section.branch_location}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text style={styles.branchAddress}>Address: {section.branch_address}</Text>
        <Text style={styles.branchContactno}>Contact No.: {section.branch_contact_no_1}, {section.branch_contact_no_2} </Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const {branchList1}  = this.state.branchList;
    const { testingg }   = this.state;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Studie'o7 Branches"}/>

                <ScrollView  style={styles.containerBox}>
                        <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                      />
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
    paddingTop:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  header:{
    backgroundColor:'#FFF',
    padding:10,
    marginBottom:5,
    borderColor:'#333',
    borderWidth:0.5
  },
  branchName:{
    color:'#333',
    fontSize:RFValue(22),
  },
  branchLocation:{
    color:'#333',
    fontSize:RFValue(18),
  },
  content:{
    backgroundColor:'#555',
    padding:10,
    marginBottom:5,
  },
  branchAddress:{
    color:'#FFF',
    fontSize:RFValue(18),
  },
  branchContactno:{
    color:'#FFF',
    fontSize:RFValue(18),
  }
});

