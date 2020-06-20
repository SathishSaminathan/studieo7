import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

export default class ServiceListItemChild extends Component {

  constructor(props) {
    super(props)
    this.state = {
      serviceCheck:false,
    }
  }


  searchInCartItem(service_id){
    const propsCartItems = this.props.cartitmslist;
    let returnValue=0;
    if(propsCartItems.length>0){
      propsCartItems.map((data,index) => {
        if(data.service_id==service_id){
          returnValue=1;
        }
      })
    }
    return returnValue;
  }

  loadButtonType(service_id){
      let buttontype=this.searchInCartItem(service_id);
      if(buttontype==1){
        return(
          <TouchableHighlight style={styles.serviceItemRemoveButtonCSS} onPress={()=>this.props.removefromCartFunChild(service_id)}>
          <Text  style={styles.serviceItemAddCSS}>Remove</Text>
          </TouchableHighlight>
        )
      }else{
        return(
          <TouchableHighlight style={styles.serviceItemAddButtonCSS} onPress={()=>this.props.addtoCartFunChild(service_id)}>
          <Text  style={styles.serviceItemAddCSS}>ADD</Text>
          </TouchableHighlight>
        )
      }
  }

  render() {
    const propsVal = this.props.serviceListChild;
    return (
          <View style={styles.serviceItemChild}>
            <View style={styles.serviceItemChildInner}>
                <View style={styles.serviceItemChildTitle}>
                      <Text style={styles.servicetitletextCSS}>{propsVal.service_name} </Text>  
                </View>
                <View style={styles.serviceItemChildDetails}>
                    <View style={styles.serviceItemChildDetailsInner}>
                        <View style={styles.serviceItemChildDetailsPrice}>
                            <Text style={styles.serviceItemPriceCSS}> {'\u20B9'} {propsVal.regular_amount} </Text>  
                        </View>
                        <View style={styles.serviceItemChildDetailsButton}>
                            {this.loadButtonType(propsVal.service_id)}
                        </View>
                    </View>  
                </View>
            </View>    
        </View>
    ); 
  }
}   

const styles = StyleSheet.create({
  serviceItemChild:{
    height:80,
    backgroundColor:'#FFF',
    opacity:0.9,
    borderBottomColor:'#333',
    borderBottomWidth:0.5,
  },
  serviceItemChildInner:{
    flex:2,
    flexDirection: 'column',
  },
  serviceItemChildTitle:{
    width:'100%',
    height:'50%',
    padding:10,
  },
  servicetitletextCSS:{
    color:'#000',
    fontSize:RFValue(14),
  },
  serviceItemChildDetails:{
    width:'100%',
    height:'50%',
    borderBottomColor:'#eee',
  },
  serviceItemChildDetailsInner:{
    flex:2,
    flexDirection: 'row',
  },
  serviceItemChildDetailsPrice:{
    width:'70%',
  },
  serviceItemPriceCSS:{
    padding:5,
    color:'#000',
    fontSize:RFValue(14),
  },
  serviceItemChildDetailsButton:{
    width:'30%',
  },
  serviceItemAddButtonCSS:{
    padding:5,
    borderColor:'#edc89e',
    borderWidth:0.5,
    width:80,
    borderRadius:5,
  },
  serviceItemRemoveButtonCSS:{
    padding:5,
    borderColor:'#edc89e',
    borderWidth:0.5,
    width:80,
    borderRadius:5,
    backgroundColor:'#edc89e',
  },
  serviceItemAddCSS:{
    color:'#000',
    fontSize:RFValue(14),
    alignSelf:'center',
  },
});
