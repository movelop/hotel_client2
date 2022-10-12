import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Existing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

    const handleDelete = async (info) => {
        const {startDate, endDate, selectedRooms, _id} = info;
        const getDatesInRange = (startDate, endDate) => {
            const start = new Date(startDate);
            const end = new Date(endDate);
        
            const date = new Date(start.toString());
        
            const dates = [];
        
            while (date <= end) {
                dates.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
        
            return dates;
        };
  
        const alldates = getDatesInRange(startDate, endDate);
  
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                console.log(roomId);
                const res = axios.put(`/api/rooms/reservation/${roomId}`, {
                    dates: alldates,
                });
                return res.data;
                })
            );
            await axios.delete(`/api/bookings/${_id}`);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='Existing'>
             <header
                className="header-main"
                style={{
                background: `no-repeat center/cover url("/img/booking/existing_header.jpg")`,
                }}
            >
                <div className="header-content">
                    <h2 className="alt-font">Manage Your Reservations</h2>
                </div>
            </header>
            {data.length > 0 ? (
                data.map((info) => (
                    <div className="card" key={info._id}>
                        <div className="info">
                            <h1>Confirmation Number:</h1>
                            <h1>{info.confirmation}</h1>
                            <div>
                                <h3>Room:</h3>
                                <h3>{info.roomNumbers.length >1 ? info.roomNumbers.map((roomNumber) => `${roomNumber}, `): info.roomNumbers.map((roomNumber) => `${roomNumber}`)}</h3>
                            </div>
                            <div>
                                <h3>Name:</h3>
                                <h3>
                                {`${info.firstname} ${info.lastname}`}
                                </h3>
                            </div>
                            <div>
                                <h3>Email:</h3>
                                <h3>{info.email}</h3>
                            </div>
                            <div>
                                <h3>Phone:</h3>
                                <h3>{info.phone}</h3>
                            </div>
                            <div>
                                <h3>Check-in Date:</h3>
                                <h3>
                                {new Date(info.startDate).toLocaleString("en-uk", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                                </h3>
                            </div>
                            <div>
                                <h3>Check-out Date:</h3>
                                <h3>
                                {new Date(info.endDate).toLocaleString("en-uk", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                                </h3>
                            </div>
                        </div>
                        <div className="actions">
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(info)}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <section className="desc">
                    <h1>No Booking was Found...</h1>
                    <button className="notExistingButton" onClick={() => navigate("/booking")}>
                        Go Back
                    </button>
                </section>
            )}
        </div>
    )
}

export default Existing