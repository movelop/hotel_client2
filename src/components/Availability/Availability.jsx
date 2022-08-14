import React, {Fragment, useContext} from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import './Availability.scss';
import { SearchContext } from '../../context/searchContext';

const Availability = ({ data }) => {
    const { dates, options } = useContext(SearchContext);
    const navigate = useNavigate();

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
    <div className='Available'>
        {data.map((room) => (
            <Fragment key={room._id}>
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
                        <button
                            className="btn contrast"
                            onClick={() => handleBooking(room)}
                        >
                            Book
                        </button>
                    </div>
                </div>
            </Fragment>
        ))}
    </div>
  )
}

export default Availability;