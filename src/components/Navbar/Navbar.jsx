import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';

import './Navbar.scss';

const Navbar = () => {
  const [header, setHeader] = useState('')

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
    <div className={`Navbar ${header}`}>
      <div className="navTop">
        <div className="contact">
          <FaPhoneAlt className="icon" />
          <BsFillEnvelopeFill className="icon" />
          <AiFillInstagram className="icon" />
          <AiFillFacebook className="icon" />
        </div>
        <div>
          <Link to="/">
            <h1 className="alt-font">D'CZARS HOTEL & SUITES</h1>
          </Link>
        </div>
        <Link to="/booking">
          <button className="btn">Booking</button>
        </Link>
      </div>
      <div className="navBottom">
        <Link to="/rooms">
          Rooms <span>&#183;</span>
        </Link>
        <Link to="/dining">
          Restaurant & Bar <span>&#183;</span>{" "}
        </Link>
        <Link to="/hall">
          Hall <span>&#183;</span>{" "}
        </Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}

export default Navbar;