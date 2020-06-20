import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableHighlight  } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Header from './Header.js';
import Footer from './Footer.js';
import ServiceMale from './ServiceMale.js';
import ServiceFemale from './ServiceFemale.js';

export default class Category extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputValue: '',
      render:'1'
    }
  }

  categoryChange(compName){
      this.setState({render:compName});        
  }
  renderSubComp(){
      switch(this.state.render){
          case '1': return <ServiceMale/>
          case '2' : return <ServiceFemale/>
      }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.categoryMenuBox}>
                  <View style={styles.categoryMenu}>
                      <TouchableHighlight style={styles.categoryMenuItem} onPress={() => this.categoryChange('1')}>
                          <View style={{alignItems: 'center'}}>
                            <Image style={styles.categoryMenuIcons} source={require('../assets/icons/service-male.png')} />
                            <Text style={styles.categoryMenuText}>male</Text>
                          </View>
                      </TouchableHighlight>

                      <TouchableHighlight style={styles.categoryMenuItem} onPress={() => this.categoryChange('2')}>
                          <View style={{alignItems: 'center'}}>
                            <Image style={styles.categoryMenuIcons} source={require('../assets/icons/service-female.png')} />
                            <Text style={styles.categoryMenuText}>female</Text>
                          </View>
                      </TouchableHighlight>
                  </View>
            </View>
            <View style={styles.pageTitleBox}>
                  <Text style={styles.pageTitle}>services</Text>
            </View>
            {this.renderSubComp()}
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
    // paddingHorizontal:70,
    textAlign:'center',
    flex:5,
    flexDirection: 'column',
  },
  topSpace:{
    width:'100%',
    height:20,
    backgroundColor:'#000',
  },
  categoryMenuBox:{
    height:'15%',
    alignItems:'center',
  },
  categoryMenu:{
    width:'60%',
    flex:2,
    flexDirection: 'row',
    // backgroundColor:'orange',
  },
  categoryMenuItem:{
    width:'50%',
    padding:15,
  },
  categoryMenuIcons:{
    width:50,
    height:50,
  },
  categoryMenuText:{
    padding:5,
    color:'#eee',
    fontSize:RFPercentage(2.5),
  },
  pageTitleBox:{
    height:'5%',
    backgroundColor:'#edc89e',
    padding:3,
    opacity:0.4,
  },
  pageTitle:{
    color:'#FFF',
    textAlign:'center',
    letterSpacing:10,
    fontSize:RFPercentage(3),
  },
  footerMenuBox:{
    height:'10%',
    position: 'absolute',
    bottom:0,
  }
});
