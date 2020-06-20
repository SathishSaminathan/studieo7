import React, { Component }  from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.topHeaderBox}>
          <View style={styles.topHeader}>
              <TouchableHighlight style={styles.topHeaderSec1}  onPress={() => Actions.branchselect()}>
                  <Image source={require('../assets/icons/pin.png')} style={styles.mapicon}/>
              </TouchableHighlight>
              <View style={styles.topHeaderSec2}>
                  <Image source={require('../assets/logo.png')} style={styles.topLogo}/>
              </View>
              <TouchableHighlight style={styles.topHeaderSec3} onPress={() => Actions.cart()}>
                  <Image source={require('../assets/icons/add.png')} style={styles.carticon}/>
              </TouchableHighlight>
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  topHeaderBox:{
    width:'100%',
    height:50,
  },
  topHeader:{
    width:'100%',
    height:'100%',
    flex:3,
    flexDirection: 'row',
    backgroundColor:'#000',
  },
  topHeaderSec1:{
    width:'20%',
    alignItems: 'center',
    padding:10,
  },
  topHeaderSec2:{
    width:'60%',
    alignItems: 'center',
    padding:10,
  },
  topHeaderSec3:{
    width:'20%',
    alignItems: 'center',
    padding:10,
  },
  topLogo:{
    width:140,
    height:35,
  },
  mapicon:{
    width:30,
    height:30,
  },
  carticon:{
    width:30,
    height:30,
  }
});
