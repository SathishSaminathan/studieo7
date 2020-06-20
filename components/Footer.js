import React, { Component }  from 'react';
import {StyleSheet, View, Image, TouchableHighlight, Text} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
    }
  }

  render() {
    return (
      <View style={styles.footerMenuBox}>
          <View style={styles.footerMenu}>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.dashboard()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/home.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>Home</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.history()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/checklist.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>My Bookings</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec}  onPress={() => Actions.faq()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/question.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>Help Center</Text>
                      </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.footerMenuSec} onPress={() => Actions.profile()}>
                      <View style={{alignItems: 'center'}}>
                          <Image source={require('../assets/icons/user.png')} style={styles.footerMenuIcons}/>
                          <Text style={styles.footerMenuText}>Profile</Text>
                      </View>
                  </TouchableHighlight>
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  footerMenuBox:{
    height:'8%',
    position: 'absolute',
    bottom:0,
  },
  footerMenu:{
    flex:4,
    flexDirection: 'row',
    backgroundColor:'#d1a440',
  },
  footerMenuSec:{
    width:'25%',
    alignItems: 'center',
    padding:5,
    paddingTop:5,
  },
  footerMenuIcons:{
    width:30,
    height:30,
  },
  footerMenuText:{
    color:'#333',
    fontSize:RFPercentage(1.5),
    marginTop:3,
    textAlign:'center',
  }
});
