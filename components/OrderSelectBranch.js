import React, { Component }  from 'react';
import {AsyncStorage, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
// import Toast from 'react-native-simple-toast';

var SECTIONS = [];

export default class OrderSelectBranch extends Component {

    constructor(props) {
      super(props)
      this.state = {
        selectedBranchId: '',
        serviceCheck:false,
        activeSections: [],
        branchList:'',
        totalAmount:0,
        baseurl:''
      }
     
    }

    async componentDidMount(){
      this.getBranchList();
      let base_url=await AsyncStorage.getItem('baseURL');  
      this.setState({baseurl:base_url});
    }

    async getBranchList() {

        this.setState({totalAmount:this.props.orderItems.totalAmount.totalAmount});
        let AuthoKey = await AsyncStorage.getItem('AuthoKey'); 
        const params = new URLSearchParams();
        params.append('auth_id', AuthoKey);
        let baseURL = await AsyncStorage.getItem('baseURL');  
        axios.post(baseURL+'api/getBranchList',params)
        .then(response => {
            SECTIONS= response.data.data; 
            this.setState({selectedBranchId:response.data.selectedBranch.branch_id});
            this.setState({serviceCheck:true});
            if(response.data.selectedBranch.branch_id==0){
              this.setState({selectedBranchId:1});
            }
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

    
    changeBranch(data){
      this.setState({selectedBranchId:data});
      this.lapsList();
      // Toast.showWithGravity('Shop location selected', Toast.LONG, Toast.TOP);
    }

  lapsList() {
    return SECTIONS.map((data,index) => {

      let baseURLget=this.state.baseurl;
      let matchId = baseURLget+"assets/img/check-mark-white.png";
      if(this.state.selectedBranchId == data.branch_id){
        matchId = baseURLget+"assets/img/check-mark.png";
      }
      return (
            <TouchableOpacity key={index} style={styles.header} onPress={()=>this.changeBranch(data.branch_id)}>
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
     const { selectedBranchId,totalAmount }  = this.state ;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={" Branch Selection"}/>

                  <View style={styles.containerBox}>
                      <View style={styles.containerBoxInner}>
                            <ScrollView style={styles.containerBoxTop}>
                                <View>
                                {this.lapsList()}
                                </View>
                            </ScrollView> 
                            <View style={styles.containerBoxBottom}>
                                  <TouchableHighlight style={styles.footerButton} onPress={() => Actions.orderselectdate({orderItems:{totalAmount:{totalAmount},branchId:{selectedBranchId}}})}>
                                    <Text  style={styles.footerButtonText}>Continue to Select Date & Time </Text>
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
  },
  headerSelected:{
    backgroundColor:'#333',
  },
  headerUnselected:{
    backgroundColor:'green',
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
  }
});

