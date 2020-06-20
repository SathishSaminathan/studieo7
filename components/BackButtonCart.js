import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class BackButtonCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BackButtonText : ''
    }
  }
  render() {
    return (
      <View style={styles.backtoBox} >
          <View style={styles.backtoLogin} >
              <TouchableOpacity style={styles.backArrow}  onPress={() => Actions.pop()}>
                  <Image source={require('../assets/icons/left.png')} style={styles.backArrowImage}/> 
              </TouchableOpacity>
              <Text style={styles.backText}> {this.props.backtext}</Text>  
              <TouchableOpacity style={styles.backArrow}  onPress={() => Actions.dashboard()}>
                  <Image source={require('../assets/icons/home.png')} style={styles.backArrowImage}/> 
              </TouchableOpacity>
          </View>
      </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  backtoBox:{
    width: '100%',
    height: 50,
    backgroundColor:'#D1A440',
  },
  backtoLogin:{
    textAlign:'center',
    padding:5,
    flex:2,
    flexDirection: 'row',
  },
  backArrowImage:{
    height:40,
    width:40,
  },
  backText:{
    color:'#333',
    width:'80%',
    fontSize:24,
    textAlign:'center',
    marginLeft:'-10%',
  },
  backArrow:{
    height:'100%',
    width:'20%',
  },
});
