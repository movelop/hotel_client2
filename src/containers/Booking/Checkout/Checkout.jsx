import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../../components';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography  } from '@mui/material';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';

import './Checkout.scss';

const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: 1,
      width: "25ch",
    },
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
    const [pay, setPay] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const [selectedRooms, setSelectedRooms] = useState([])
    const [selectedRoomNumbers, setSelectedRoomNumbers] = useState([]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        confirmEmail: "",
        phone: "",
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { dates, options, days, totalPrice, room } = location.state;
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const name = e.target.name;

        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );

        setSelectedRoomNumbers(
            checked ? [...selectedRoomNumbers, name]
            : selectedRoomNumbers.filter((item) => item !== name)
        )
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        for (let val in formData) {
            if (formData[val] === "") {
              setMsg("You must Fill Out Every Field");
              return setError(true);
            }
        }
      
        if (isNaN(Number(formData.phone))) {
            setMsg("Phone number must only contain numbers");
            return setError(true);
        }
      
        if (formData.email !== formData.confirmEmail) {
            setMsg("Emails must match");
            return setError(true);
        }
      
        if (/.+@.+\..+/.test(formData.email) === false) {
            setMsg("Must be a valid email");
            return setError(true);
        }
        
        if(selectedRooms.length > options.rooms || selectedRooms.length < options.rooms) {
            setMsg(`you must select only ${options.rooms} rooms`);
            return setError(true);
        }

        setPay(true);
        setError(false);
    }

    const handleSuccess = async(reference) => {
      const newBooking = {
          ...formData,
          roomTitle: room.title,
          adults: options.adult,
          children: options.children,
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
          numberOfRooms: options.rooms,
          selectedRooms: selectedRooms,
          roomNumbers: selectedRoomNumbers,
          price: totalPrice,
          paymentReference: reference,
      }
      setLoading(true);
      try {
          const verifyRes = await axios.get(`https://heritage-resorts.herokuapp.com/api/bookings/verify-payment/${reference}`);

          if (verifyRes.data.data.status === 'success') {
              try {
                  await Promise.all(
                      selectedRooms.map((roomId) => {
                        const res = axios.put(`https://heritage-resorts.herokuapp.com/api/rooms/availability/${roomId}`, {
                          dates: alldates,
                        });
                        return res.data;
                      })
                  );
                   const bookingRes = await axios.post('https://heritage-resorts.herokuapp.com/api/bookings/create', newBooking);
                   setLoading(false);
                   navigate('/booking/confirmation', { state: { confirmation: bookingRes.data } });
              } catch (error) {
                  setLoading(false)
                  navigate('/booking/confirmation', { state: { error: error.response.data }});
              }
          }
      } catch (error) {
          setLoading(false);
          navigate('/booking/confirmation', { state: { error: error.response.data }});
      } 
  }

  const componentProps = {
      email: formData.email,
      amount: totalPrice * 100,
      metadata: {
          name: `${formData.firstname} ${formData.lastname}`,
          phone: formData.phone,
      },
      publicKey: publicKey,
      text: "Pay Now",
      onSuccess: (reference) =>{
          handleSuccess(reference.reference);
      },   
      onClose: () => alert("Wait! Don't leave :("),
  }

  return (
    <div className="Checkout">
      <header
        className="header-main"
        style={{
          background: `no-repeat center/cover url("/img/booking/checkout_header.jpg")`,
        }}
      >
        <div className="header-content">
          <h2 className="alt-font">Finish Your Reservation</h2>
        </div>
      </header>
      { loading ? (<Loader text={'Please wait ...'} />):(
        <>
          <section className="desc">
            <h1 className="alt-font">YOUR DETAILS</h1>
          </section>
          <section className="room-info">
          { room && 
            (
              <>
                <h1>BOOKING SUMMARY</h1>
                <div>
                    <h4>Room:</h4> <span>{room.title}</span>
                </div>
                <div>
                    <h4>Check-in Date:</h4>
                    <span>
                    {new Date(dates[0].startDate).toLocaleString("en-uk", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                    </span>
                </div>
                <div>
                    <h4>Check-out Date:</h4>
                    <span>
                    {new Date(dates[0].endDate).toLocaleString("en-uk", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })}
                    </span>
                </div>
                <div>
                    <h4>Number of Night(s):</h4>
                    <span>{days}</span>
                </div>
                <div>
                    <h4>Guest(s)</h4>
                    <span>
                        {options.adult} Adults{" "}
                        {options.children > 0 &&
                        `${options.children} Children`}
                    </span>
                </div>
                <div>
                    <h4>Number of Room(s):</h4>
                    <span>{options.rooms}</span>
                </div>
                <div>
                    <h4>Total</h4>
                    <span style={{ fontWeight: "bold" }}>N{totalPrice.toLocaleString("en-US")}</span>
                </div>
            </>
            )}
          </section>
          <section className="details">
            <h1 className="alt-font">Enter Your Information</h1>
            {error && <span className="error-msg">{msg}</span>}
            <form className={classes.root} autoComplete="off">
              <TextField
                onChange={handleChange}
                required
                className="outlined-basic"
                name="firstname"
                label="First Name"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                required
                className="outlined-basic"
                name="lastname"
                label="Last Name"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                required
                className="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                required
                className="outlined-basic"
                name="confirmEmail"
                label="Confirm Email"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                required
                className="outlined-basic"
                name="phone"
                label="Phone Number"
                variant="outlined"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
              <div className="select-preferred-room outlined-basic">
                <Typography>Select your preferred room number(s)</Typography>
                <Box className='select-room'>
                  {room.roomNumbers.map((roomNumber) => (
                    <FormControlLabel key={roomNumber._id} 
                      
                      disabled={!isAvailable(roomNumber)}
                      control={ <Checkbox
                        value={roomNumber._id}
                        name= {roomNumber.number?.toString()}
                        onChange={handleSelect}
                      />} 
                      label={roomNumber.number}
                    />
                  ))}
                </Box>
              </div>
            </form>
            <div className="btn-container">
                {pay ? <PaystackButton {...componentProps} className='btn contrast' /> 
                  :
                  <Button onClick={handleSubmit} variant="outlined">
                    Continue to Pay
                  </Button>
                }
              </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Checkout;