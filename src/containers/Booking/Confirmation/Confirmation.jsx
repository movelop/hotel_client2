import React from 'react';
import { BsPrinterFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

import './Confirmation.scss';

const Confirmation = () => {
  const location = useLocation();
  console.log(location.state);
  const  confirmation  = location.state?.confirmation;
  return (
    <div className='Confirm'>
      <header
        className="header-main"
        style={{
          background: `no-repeat center/cover url("/img/booking/confirm_header.jpg")`,
        }}
      >
        <div className="header-content">
          <h2 className="alt-font">Enjoy Your Stay!</h2>
        </div>
      </header>
      <section className="desc">
        {confirmation ? (
          <>
            <h1 className="alt-font">Thank You!</h1>
            <div className="confirm">
              <h1>Your confirmation code is:</h1>
              <h1> {confirmation.confirmation}</h1>
              <div className="btn-container">
                <button className="btn contrast" onClick={() => window.print()}>
                  <BsPrinterFill /> Print
                </button>
              </div>
            </div>
          </>
        ):(
          <h1>Something went wrong...</h1>
        )}
      </section>
    </div>
  )
}

export default Confirmation;