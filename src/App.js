import './App.css';
import Header from "./Header"
import Home from "./Home"
import React, { Component ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,Switch
} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login'
import Payment from './Payment';
import {auth} from './firebase'
import {useStateValue} from './StateProvider'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise=loadStripe('pk_test_51K2rnASIOqXg96XEhWd4znsbgnKK6uxAzb716g6p5fdfBJIcGSRNsqVE17458GdTfQiktsdeXrFpXlZVuUZ8nCdy00z0tBuEzq')


function App() {
  const [{},dispatch]=useStateValue();

  useEffect(()=>{
     auth.onAuthStateChanged(authUser=>{
       console.log('The user id>>>',authUser);
       if(authUser){
         dispatch({
           type:'SET_USER',
           user:authUser
           
         })
       }
       else{
         dispatch({
           type:"SET_USER",
           user:null
         })
       }
     })
  },[])

  return (
    <Router>
     <div className="App">
       <Switch>
         <Route path="/login">
           <Login/>
          </Route>
        
       
         <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>

          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
           
         <Route path="/">
           <Header/>
           <Home/>
          </Route>
         </Switch>
     </div>
    </Router>
  );
}

export default App;
