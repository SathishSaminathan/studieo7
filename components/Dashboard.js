import React, { Component }  from 'react';
import {Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, TouchableHighlight  } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import AndroidBack from './AndroidBack';
import Header from './Header.js';
import Footer from './Footer.js';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = ((Dimensions.get('window').height/100)*35);

export default class Login extends Component {

    constructor(props) {
      super(props)
      this.state = {
        serviceCheck:false,
        bannerList: ''
      }
    }

    async componentDidMount(){
      axios.post('http://studieo7.wssdemozone.in/api/getBannersList',this.state)
        .then(response => {
          this.setState({bannerList:response.data.data});
          this.setState({serviceCheck:true});
        })
        .catch(errorMsg => {
            console.log(errorMsg);
        })
    }

    
    renderPage(image, index) {
      return (
          <View key={index}>
              <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image.ads_file }} />
          </View>
      );
    }

  render() {
    if(this.state.serviceCheck==false)
            return null;
    const { bannerList }   = this.state;
    return (
      <View>
        <Image source={require('../assets/bg.png')} style={{ width: '100%', height: '100%', position:'relative'}}/>
        <View style={styles.logoBox}>
            <View style={styles.topSpace}></View>
            <Header/>
            <View style={styles.carouselBox}>
                <Carousel style={styles.carousel}
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {bannerList.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
            <View style={styles.centerMenuBox}>
                <View style={styles.centerMenuRow1}>
                
                    <TouchableHighlight style={[styles.centerMenuItem,styles.borderRight]} onPress={() => Actions.category()}>
                      <View style={{alignItems: 'center'}} >
                        <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon1.png')} />
                        <Text style={styles.centerMenuText}>BOOK</Text>
                        <Text style={styles.centerMenuText}>APPOINTMENT</Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.centerMenuItem,styles.borderRight]} onPress={() => Actions.branch()}>
                        <View style={{alignItems: 'center'}}>
                          <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon2.png')} />
                          <Text style={styles.centerMenuText}>OUR</Text>
                          <Text style={styles.centerMenuText}>BRANCHES</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.centerMenuItem} onPress={() => Actions.category()}>
                        <View style={{alignItems: 'center'}}>
                            <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon3.png')} />
                            <Text style={styles.centerMenuText}>OUR</Text>
                            <Text style={styles.centerMenuText}>SERVICES</Text>
                          </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.centerMenuRow2} onPress={() => Actions.offers()}>
                    <TouchableHighlight style={[styles.centerMenuItem,styles.borderTop,styles.borderRight]}  onPress={() => Actions.offers()}>
                        <View style={{alignItems: 'center'}}>
                          <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon4.png')} />
                          <Text style={styles.centerMenuText}>OFFERS</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.centerMenuItem,styles.borderTop,styles.borderRight]} onPress={() => Actions.testimonial()}>
                        <View style={{alignItems: 'center'}}>
                          <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon5.png')} />
                          <Text style={styles.centerMenuText}>TESTIMONIAL</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.centerMenuItem,styles.borderTop]} onPress={() => Actions.wallet()}>
                        <View style={{alignItems: 'center'}}>
                          <Image style={styles.centerMenuIcons} source={require('../assets/icons/icon6.png')} />
                          <Text style={styles.centerMenuText}>WALLET</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
            <Footer/>
        </View>
        <AndroidBack/>
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
  },
  carouselBox:{
  },
  carousel:{
    width:'100%',
  },
  centerMenuBox:{
    height:'50%',
  },
  centerMenuRow1:{
    width:'100%',
    flex:3,
    flexDirection: 'row',
    backgroundColor:'#000',
    opacity:0.8,
  },
  centerMenuRow2:{
    width:'100%',
    flex:3,
    flexDirection: 'row',
    backgroundColor:'#000',
    opacity:0.8,
  },
  centerMenuItem:{
    padding:'3%',
    paddingTop:'8%',
    width:'33.3%',
  },
  centerMenuIcons:{
    width:40,
    height:40,
    marginTop:'12%',
  },
  borderTop:{
    borderTopColor:'#6f6c5e',
    borderTopWidth:0.3,
  },
  borderRight:{
    borderRightColor:'#6f6c5e',
    borderRightWidth:0.3,
  },
  centerMenuText:{
    color:'#eee',
    fontSize:RFPercentage(2),
    marginTop:3,
    textAlign:'center',
  },
});
