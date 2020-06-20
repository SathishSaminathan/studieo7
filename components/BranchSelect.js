import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import Accordion from 'react-native-collapsible/Accordion';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

var SECTIONS = [];

export default class BranchSelect extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selectedBranchId: '',
        serviceCheck:false,
        activeSections: [],
        branchList:''
      }
     
    }

    async componentDidMount(){
      this.getBranchList();
    }

    async getBranchList() {
        let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
        const params = new URLSearchParams();
        params.append('auth_id', AuthoKey);
        axios.post('http://studieo7.wssdemozone.in/api/getBranchList',params)
        .then(response => {
            SECTIONS= response.data.data;
            this.setState({serviceCheck:true});
            this.setState({selectedBranchId:response.data.selectedBranch.branch_id});
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

    makeStar = async (data) =>{
      let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
      const params = new URLSearchParams();
      params.append('auth_id', AuthoKey);
      params.append('branch_id', data);
      axios.post('http://studieo7.wssdemozone.in/api/makeStar',params)
        .then(response => {
          console.log(response.data);
          this.getBranchList();
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

  lapsList() {
    return SECTIONS.map((data,index) => {

      let matchId = "http://studieo7.wssdemozone.in/assets/img/star.png";
      if(this.state.selectedBranchId == data.branch_id){
        matchId = "http://studieo7.wssdemozone.in/assets/img/star_ok.png";
      }
      return (
            <TouchableOpacity key={index} style={styles.header}  onPress={()=>this.makeStar(data.branch_id)}>
              <View style={styles.headerInner}>
                <View style={styles.headerLeft}>
                    <Text style={styles.branchName}>{data.branch_name}</Text>
                    <Text style={styles.branchLocation}>Location: {data.branch_location}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Image source={{ uri:matchId}} style={styles.starBox}/>
                </View>
              </View>
            </TouchableOpacity>
      )
    })
  }



  render() {
    if(this.state.serviceCheck==false)
            return null;
    const {branchList1}  = this.state.branchList;
    const { testingg, selectedBranchId }   = this.state;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Studie'o7 Branches"}/>

                <ScrollView  style={styles.containerBox}>
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
  headerInner:{
    flex:2,
    flexDirection: 'row',
  },
  headerLeft:{
    width:'80%',
    height:'100%',
  },
  headerRight:{
    width:'20%',
    height:'100%',
    padding:'5%',
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
  },
  starBox:{
    width:30,
    height:30,
  }
});

