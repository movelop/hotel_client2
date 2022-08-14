import React, {useEffect} from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import { Footer, Navbar, NavbarMobile } from './components';
import { About, Booking, Checkout, Confirmation, Dining, Existing, Home, NoPage, Room, Rooms } from './containers';

import './App.scss';

const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <>
      <Navbar />
      <NavbarMobile />
      <Routes>
        <Route path="/" element= { <Home/> }/>
        <Route path="/rooms" element= { <Rooms /> }/>
        <Route path="/rooms/:id" element= { <Room /> }/>
        <Route path="/dining" element={ <Dining /> }/>
        <Route path='/about' element= { <About /> }/>
        <Route path='/booking' element={ <Booking /> }/>
        <Route path='booking/existing' element={ <Existing /> }/>
        <Route path='booking/checkout' element={ <Checkout /> }/>
        <Route path='booking/confirmation' element={ <Confirmation /> }/>
        <Route path='*' element= { <NoPage/> }/>
      </Routes>
      <Footer />
    </>
  )
}

export default App