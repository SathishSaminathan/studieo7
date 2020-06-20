import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './Login.js';
 
const AppNatigator = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "login" component = {Login} title = "Login" initial = {true} />
         {/* <Scene key = "about" component = {About} title = "About" /> */}
      </Scene>
   </Router>
)
export default AppNatigator;