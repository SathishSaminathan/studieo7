import React, { Component }  from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import ServiceListItemChild from './ServiceListItemChild.js';

export default class ServiceListItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      serviceCheck:false,
      ServiceListItemTitle:'',
      // serviceList:'',
      serviceListChild:'',
      servicelist : this.props.servicelist
    }
   
  }

  async componentDidMount(){
    // const serviceList=this.props.servicelist;
    // this.setState({serviceList:serviceList}); 
  }

  lapsList() {
    const propsVal = this.props.servicelist;
    const propsValChild = this.props.servicelist.listItems;
      return (
        <View style={styles.listItem}>
            <View style={styles.serviceItemParent}>
                  <Text style={styles.serviceItemParentText}>{propsVal.generalDetails.service_group_name} </Text>  
            </View>
            {this.lapsListChild(propsValChild)}
        </View>
      )
  }
  
  lapsListChild(getpropsValChild) {
    const propscartitmslist = this.props.cartitmslist;
    return getpropsValChild.map((data,index) => {
      return (
        <ServiceListItemChild key={index} cartitmslist={propscartitmslist} serviceListChild={data} removefromCartFunChild={this.props.removefromCartfunMain} addtoCartFunChild={this.props.addtoCartfunMain}/>
      )
    })
  }

  render() {
    const { ServiceListItemTitle,serviceList,serviceListChild }   = this.state;
    return (
          <View>{this.lapsList()}</View>
    ); 
  }
}   

const styles = StyleSheet.create({
  listItem:{
    flex:2,
    flexDirection: 'column',
  },
  serviceItemParent:{
    height:50,
    backgroundColor:'#333',
    padding:10,
  },
  serviceItemParentText:{
    color:'#FFF',
    fontSize:RFValue(16),
  },
});
