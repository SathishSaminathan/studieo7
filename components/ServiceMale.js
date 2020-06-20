import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

export default class ServiceMale extends Component {
  render() {
    return (
            <View style={styles.centerMenuBox}>
                <View style={styles.centerMenu}>
                    <View style={styles.centerMenuRow1}>

                        <View style={[styles.centerMenuItem]}>
                            <TouchableHighlight style={[styles.centerMenuItemChild,styles.borderRight,styles.borderBottom]} onPress={() => Actions.services({servicekey:1})}>
                              <View style={{alignItems: 'center'}} >
                                <Image style={styles.centerMenuIcons} source={require('../assets/icons/service-hair-care-m.png')} />
                                <Text style={styles.centerMenuText}>Hair Care</Text>
                              </View>
                            </TouchableHighlight>
                        </View>

                        <View style={[styles.centerMenuItem]}>
                           <TouchableHighlight style={[styles.centerMenuItemChild, styles.borderBottom]} onPress={() => Actions.services({servicekey:2})}>
                                <View style={{alignItems: 'center'}}>
                                  <Image style={styles.centerMenuIcons} source={require('../assets/icons/service-skin-care-m.png')} />
                                  <Text style={styles.centerMenuText}>Skin Care</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>
                    <View style={styles.centerMenuRow2}>

                        <View style={[styles.centerMenuItem]} >
                            <TouchableHighlight style={[styles.centerMenuItemChild,styles.borderRight,styles.borderBottom]} onPress={() => Actions.services({servicekey:3})}>
                                <View style={{alignItems: 'center'}}>
                                  <Image style={styles.centerMenuIcons} source={require('../assets/icons/service-hand-feet-care-m.png')} />
                                  <Text style={styles.centerMenuText}>Hand & Feet Care</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={[styles.centerMenuItem]}>
                            <TouchableHighlight style={[styles.centerMenuItemChild, styles.borderBottom]} onPress={() => Actions.services({servicekey:4})}>
                                <View style={{alignItems: 'center'}}>
                                  <Image style={styles.centerMenuIcons} source={require('../assets/icons/service-body-care-m.png')} />
                                  <Text style={styles.centerMenuText}>Body Care</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    
                    </View>
                    <View style={styles.centerMenuRow2}>
                        <TouchableHighlight style={[styles.centerMenuItem,styles.centerMenuItemLast]} onPress={() => Actions.services({servicekey:5})}>
                              <View style={{alignItems: 'center'}}>
                                <Image style={styles.centerMenuIcons} source={require('../assets/icons/service-Bridal-service-Makeover-m.png')} />
                                <Text style={styles.centerMenuText}>Groom Makeover</Text>
                              </View>
                          </TouchableHighlight>
                    </View>
                </View>
            </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  centerMenuBox:{
    height:'60%',
    alignItems:'center',
  },
  centerMenu:{
    width:'70%',
    flex:2,
    flexDirection: 'column',
  },
  centerMenuRow1:{
    height:'33.3%',
    width:'100%',
    flex:2,
    flexDirection: 'row',
    marginTop:20,
  },
  centerMenuRow2:{
    height:'33.3%',
    width:'100%',
    flex:2,
    flexDirection: 'row',
  },
  centerMenuRow3:{
    height:'33.3%',
    width:'100%',
    flex:1,
    flexDirection: 'row',
  },
  centerMenuItem:{
    width:'50%',
    borderRadius:20,
    overflow:'hidden',
  },
  centerMenuItemLast:{
    width:'50%',
    marginLeft:'25%',
  },
  centerMenuItemChild:{
    padding:'2%',
    minHeight:'100%',
  },
  centerMenuIcons:{
    width:50,
    height:50,
    marginTop:'20%',
  },
  borderTop:{
    borderTopColor:'#edc89e',
    borderTopWidth:0.3,
  },
  borderRight:{
    borderRightColor:'#edc89e',
    borderRightWidth:0.3,
  },
  borderBottom:{
    borderBottomColor:'#edc89e',
    borderBottomWidth:0.3,
  },
  centerMenuText:{
    color:'#eee',
    fontSize:RFPercentage(2),
    marginTop:10,
    textAlign:'center',
  },
});
