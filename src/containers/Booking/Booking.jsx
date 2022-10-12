import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Booking.scss';
import { Availability, BookWidget, Loader } from '../../components';
import useFetch from '../../hooks/useFetch';

const Booking = () => {
    const [formData, setFormData] = useState({
        confirmation: '',
        email: '',
      });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch('/api/rooms');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.confirmation === "" && formData.email === "") {
          return setError("Please fill out ONE of these fields.");
        }
        if (formData.confirmation.length > 0 && formData.email.length > 0) {
          return setError("Only Fill out ONE of these fields.");
        }
        try {
          const res = await axios.post('/api/bookings', formData);
          navigate('/booking/existing', { state: { data: res.data }});
        } catch (error) {
          navigate('/booking/existing', { state: { error: error.response.data }});
        }
      };

  return (
    <div className='Booking'>
        <header
            className="header-main"
            style={{
            background:
                ' no-repeat center/cover url("/img/booking/booking_header.jpg")',
            }}
        >
            <div className="header-content">
            <h2 className="alt-font">Make A Reservation</h2>
            </div>
        </header>
        <section className="existing">
            <label>Already have a Booking?</label>
            <form>
                <input
                    maxLength="12"
                    name="confirmation"
                    type="text"
                    placeholder="Enter Confirmation Code"
                    value={formData.confirmation}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="text"
                    placeholder="Or Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit} className="btn contrast">
                    Lookup
                </button>
            </form>
            <span className="disclaimer">
                * expired bookings will automatically be deleted
            </span>
            {error.length > 0 && <span style={{ color: "red" }}>{error}</span>}
        </section>
        <section className="desc">
            <h1 className="alt-font">BOOK A ROOM</h1>
        </section>
        <BookWidget />
        {loading ? (<Loader />) : (
            <>
              <div className='Available'>
                {data.map((room) => (
                  <Availability room = {room} key={room._id}/>
                ))}
              </div>
            </>
          )}
    </div>
  )
}

export default Booking;