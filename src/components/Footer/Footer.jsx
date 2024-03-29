import React from 'react';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer">
        <div>
            <h2 className="alt-font">D'czars Hotel & Suites</h2>
        </div>
        <div>
            <p>{new Date().getFullYear()} © ADE OJO. ALL RIGHTS RESERVED.</p>
        </div>
    </div>
  )
}

export default Footer;