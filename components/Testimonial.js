import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableHighlight} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BackButton from './BackButton.js';
import Carousel from 'react-native-banner-carousel';

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;
const images = [];


export default class Testimonial extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        TextInputValue: '',
        testimonialList:''
      }
    }

    
  async componentDidMount(){
    axios.post('http://studieo7.wssdemozone.in/api/getTestimonialList',this.state)
    .then(response => {
      this.setState({testimonialList:response.data.data});
      this.setState({serviceCheck:true});
    })
    .catch(errorMsg => {
        console.log(errorMsg);
    })
  }

  renderPage(image, index) {
    return (
        <View key={index} style={styles.carouselBox}>
            <View style={styles.carouselBoxInner}>
                <View style={styles.carouselImage}>
                    <Image style={styles.carouselImageItem} source={{ uri:image.testimonial_image}} />
                </View>
                <View style={styles.carouselDescription}>
                    <Text style={styles.textAlignmentDescription}>{image.testimonial_description}</Text>
                </View>
                <View style={styles.carouselTitle}>
                    <Text style={styles.textAlignmentTitle}>{image.testimonial_title}</Text> 
                    <Text style={styles.textAlignmentLocation}>{image.testimonial_location}</Text> 
                </View>
            </View>
        </View>
    );
  }

  render() {
    
    if(this.state.serviceCheck==false)
    return null;
    const { testimonialList }   = this.state;

    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <BackButton backtext={"Studie'o7 Testimonial"}/>
              <Carousel style={styles.carousel}
                  autoplay
                  autoplayTimeout={5000}
                  loop
                  index={0}
                  pageSize={BannerWidth}
              >
                  {testimonialList.map((image, index) => this.renderPage(image, index))}
              </Carousel>
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
    opacity:0.9,
  },
  carouselBox:{
    width:'80%',
    marginLeft:'10%',
    marginTop:'10%',
  },
  carouselImage:{
    width:'100%',
    height:150,
  },
  carouselImageItem:{
    height:150,
    width:150,
    alignSelf:'center',
    borderColor:'#FFF',
    borderWidth:0.5,
    borderRadius:100,
  },
  carouselDescription:{
    marginTop:20,
  },
  textAlignmentDescription:{
    color:'#FFF',
    fontSize:RFValue(16),
    textAlign:'justify',
    alignSelf:'center',
  },
  carouselTitle:{
    marginTop:'10%',
  },
  textAlignmentTitle:{
    color:'#FFF',
    fontSize:RFValue(20),
    textAlign:'justify',
    alignSelf:'center',
  },
  textAlignmentLocation:{
    color:'#FFF',
    fontSize:RFValue(16),
    textAlign:'justify',
    alignSelf:'center',
    marginTop:10,
  }
});
