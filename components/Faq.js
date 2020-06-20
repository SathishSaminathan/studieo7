import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';

import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: "About Studieo'7",
    content: "Studie'o 7 bring you best experience with everyone can afford it and enjoy the service provided by us. We bring a wonderful salon and spa experience to your neighbourhood. ",
  },
  {
    title: "How to book a service?",
    content: "Using Android & ios app users can book the appointment.",
  },
];

export default class Faq extends Component {

    state = {
      activeSections: [],
    };
  
    _renderSectionTitle = section => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
  
    _renderHeader = section => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
  
    _renderContent = section => {
      return (
        <View style={styles.content}>
          <Text style={styles.contentText}>{section.content}</Text>
        </View>
      );
    };
  
    _updateSections = activeSections => {
      this.setState({ activeSections });
    };
  

  render() {
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Studie'o7 FAQ"}/>

                <ScrollView  style={styles.containerBox}>
                      <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        // renderSectionTitle={this._renderSectionTitle}
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
    padding:10,
    backgroundColor:'#FFF',
    opacity:0.9,
  },
  aboutText:{
    color:'#000',
    fontSize:RFValue(16),
    textAlign:'justify',
    marginTop:5,
    marginBottom:10,
  },
  header:{
    backgroundColor:'#D1A440',
    padding:10,
    marginBottom:5,
  },
  headerText:{
    color:'#FFF',
    fontSize:RFValue(16),
  },
  content:{
    backgroundColor:'#555',
    padding:10,
    marginBottom:5,
  },
  contentText:{
    color:'#FFF',
    fontSize:RFValue(16),
  }
});
