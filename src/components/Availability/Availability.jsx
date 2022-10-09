import React, {Fragment, useContext} from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import './Availability.scss';
import { SearchContext } from '../../context/searchContext';
import { useEffect } from 'react';
import { useState } from 'react';

const Availability = ({ room }) => {
    const { dates, options } = useContext(SearchContext);
    const [availableRooms, setAvailableRooms] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        let a = [];
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
        const isAvailable = () => {
            room?.roomNumbers.forEach((item) => {
                const isFound = item.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()))
                const update = (obj) => {
                    const roomFound = a.includes(obj)

                    if (roomFound) {
                        return a
                    } else {
                        a = [...a, obj]
                    }
                }

                if(!isFound) {
                    update(item);
                }
                return setAvailableRooms(a);
            })
        }
      isAvailable()
    }, [room, dates])
    

    console.log(room.title, availableRooms)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
        const daydiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return daydiff;
    }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const totalPrice =(room) => {
    const price = days* options.rooms * room.price
    return price
  } 

  const handleBooking = (room) => {
    navigate('/booking/checkout', { state: { dates, options, days, room, totalPrice:totalPrice(room) }});
  }

  


    return (
        <div className='availability-container'>
            <Fragment>
                <div className="room-card">
                    <div className="card-img">
                        <img src={room.images[0]} alt={room.title} />
                    </div>
                    <div className="card-info">
                        <h2 className="alt-font">{room.title}</h2>
                        <span className="location">
                            <HiLocationMarker /> D'czars, Ota.
                        </span>
                        <div className="details">
                            <div>
                                <label>Size:</label>
                                <p>{room.size}</p>
                            </div>
                            <div>
                                <label>Occupancy:</label>
                                <p>{room.maxPeople}</p>
                            </div>
                            <div>
                                <label>Bedding:</label>
                                <p>{room.bedding}</p>
                            </div>
                            <div>
                                <label>Room(s) Available:</label>
                                <p>{availableRooms.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-price">
                        <div>
                            <label>Daily Price</label>
                            <h4>N{room.price.toLocaleString("en-US")}</h4>
                        </div>
                        <div>
                            <label>Total ({`${days} Night(s) for ${options.rooms} room(s)`})</label>
                            <h4 className='totalPrice'>N{totalPrice(room).toLocaleString("en-US")}</h4>
                        </div>
                        {availableRooms.length > 0 ? (
                            <button
                            className="btn contrast"
                            onClick={() => handleBooking(room)}
                            >
                                Book
                            </button>
                        ):  <button
                                className="btn contrast"
                                style={{ color: "white", backgroundColor: "black" }}
                            >
                                Unavailable
                            </button>
                        }
                        
                    </div>
                </div>
            </Fragment>
        </div>
    )
}

export default Availability;