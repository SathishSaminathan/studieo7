import React, { Component }  from 'react';
import { Dimensions, Animated, AsyncStorage, Platform, BackHandler, Alert, View, Text, TouchableOpacity} from 'react-native';
import { Router, Scene, ActionConst, Actions } from 'react-native-router-flux';
import MyDevice from 'expo-constants';
import axios from 'axios';

import Login from './Login.js';
import Loginotp from './Loginotp.js';
import LoginBackButton from './LoginBackButton.js';
import Dashboard from './Dashboard.js';
import Category from './Category.js';
import MyAppointment from './MyAppointment.js';
import Services from './Services.js';
import Profile from './Profile.js';
import ProfileEdit from './ProfileEdit.js';
import Aboutus from './Aboutus.js';
import Faq from './Faq.js';
import Offers from './Offers.js';
import Testimonial from './Testimonial.js';
import Branch from './Branch.js';
import BranchSelect from './BranchSelect.js';
import Wallet from './Wallet.js';
import WalletCashAdd from './WalletCashAdd.js';
import Payment from './Payment.js';
import PaymentCart from './PaymentCart.js';
import Cart from './Cart.js';
import OrderSelectBranch from './OrderSelectBranch.js';
import OrderSelectDate from './OrderSelectDate.js';
import Preview from './Preview.js';
import History from './History.js';
import Logout from './Logout.js';
// import AndroidBack from './AndroidBack';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deviceCheck:false,
      loggenIn: false
    }

  }

    async componentDidMount(){

      this.setState({DeviceId:MyDevice.deviceId});
      AsyncStorage.setItem('DeviceId',MyDevice.deviceId);  

      const params = new URLSearchParams();
      params.append('device_id', MyDevice.deviceId);
      
        axios.post('http://studieo7.wssdemozone.in/api/checkDeviceStatus',params)
          .then(response => {
            let resVal=response.data;
            if(resVal.status=='success' && resVal.login_status=='Yes'){
              AsyncStorage.setItem('AuthoKey',resVal.user_id);  
              this.setState({loggenIn:true});
            }
    
            this.setState({deviceCheck:true});
          })
          .catch(errorMsg => {
              console.log(errorMsg);
          })
      
  }


  render() {

    if(this.state.deviceCheck==false)
            return null;
    return (
      <Router>
        <Scene key="root" hideNavBar>
              <Scene key={'login'} component={Login} title = "Login" initial={!this.state.loggenIn}/>
              <Scene key={'loginotp'}  component={Loginotp} title = "Loginotp"/>
              <Scene key={'loginbackbutton'}  component={LoginBackButton} title = "LoginBackButton"/>
              <Scene key={'dashboard'} component={Dashboard} title = "Dashboard" type={ActionConst.RESET} initial={this.state.loggenIn}/>
              <Scene key={'category'} component={Category} title = "Category" />
              <Scene key={'myappointment'} component={MyAppointment} title = "MyAppointment" />
              <Scene key={'services'} component={Services} title = "Services" />
              <Scene key={'profile'} component={Profile} title = "Profile" />
              <Scene key={'profileedit'} component={ProfileEdit} title = "ProfileEdit" />
              <Scene key={'aboutus'} component={Aboutus} title = "Aboutus" />
              <Scene key={'faq'} component={Faq} title = "Faq"/>
              <Scene key={'offers'} component={Offers} title = "Offers"/>
              <Scene key={'testimonial'} component={Testimonial} title = "Testimonial"/>
              <Scene key={'branch'} component={Branch} title = "Branch" />
              <Scene key={'branchselect'} component={BranchSelect} title = "BranchSelect" />
              <Scene key={'wallet'} component={Wallet} title = "Wallet"/>
              <Scene key={'walletcashadd'} component={WalletCashAdd} title = "WalletCashAdd"/>
              <Scene key={'payment'} component={Payment} title = "Payment"/>
              <Scene key={'paymentcart'} component={PaymentCart} title = "PaymentCart"/>
              <Scene key={'cart'} component={Cart} title = "Cart" />
              <Scene key={'orderselectbranch'} component={OrderSelectBranch} title = "OrderSelectBranch" />
              <Scene key={'orderselectdate'} component={OrderSelectDate} title = "OrderSelectDate" />
              <Scene key={'preview'} component={Preview} title = "Preview" />
              <Scene key={'history'} component={History} title = "History"/>
               
              <Scene key={'logout'} component={Logout} title = "Logout" type={ActionConst.RESET}/>
              {/* <Scene key={'androidBack'} component={AndroidBack} /> */}
        </Scene>
      </Router>
    )
  }
}

export default App;