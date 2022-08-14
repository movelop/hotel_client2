import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose, IoIosArrowForward } from 'react-icons/io';

import './NavbarMobile.scss';

const NavbarMobile = () => {
  const [header, setHeader] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);

  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setHeader("");
    } else if (window.scrollY > 70) {
      return setHeader("alt-color");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={`NavMobile ${header} ${toggleMenu ? 'menu-active': ''}`}>
      <div className="menu-top">
        <div className="hamburger-menu">
          {!toggleMenu ? <GiHamburgerMenu onClick={() => setToggleMenu(true)} className='icon' /> :<IoMdClose onClick={() => setToggleMenu(false)} className='icon' />}
        </div>
        <div className="brand">
          <Link to="/" onClick={() => setToggleMenu(false)}>
            <h1 className="alt-font">D'CZARS HOTEL & SUITES</h1>
          </Link>
        </div>
        <Link to="/booking">
          <button className="btn">Booking</button>
        </Link>
      </div>
      <div className={`menu-bottom ${toggleMenu && "show-menu"}`}>
        <ul>
          <li>
            <div className="contact">
              <FaPhoneAlt className="icon" />
              <BsFillEnvelopeFill className="icon" />
              <AiFillInstagram className="icon" />
              <AiFillFacebook className="icon" />
            </div>
          </li>
          <li>
            <Link onClick={() => setToggleMenu(false)} to="/rooms">
              Rooms
            </Link>
            <IoIosArrowForward className='icon' />
          </li>
          <li>
            <Link onClick={() => setToggleMenu(false)} to="/dining">
              Restaurant & Bar{" "}
            </Link>
            <IoIosArrowForward className='icon' />
          </li>
          <li>
            <Link onClick={() => setToggleMenu(false)} to="/hall">
              Hall{" "}
            </Link>
            <IoIosArrowForward className='icon' />
          </li>
          <li>
            <Link onClick={() => setToggleMenu(false)} to="/about">
              About
            </Link>
            <IoIosArrowForward className='icon' />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarMobile;