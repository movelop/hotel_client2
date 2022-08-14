import React from 'react';
import { useLocation } from 'react-router-dom';

import { BookWidget } from '../../../components';
import './Room.scss';

const Room = () => {
    const location = useLocation();
    const { data } = location.state;
    
    return (
        <div className="Room">
            <header
                className="header-main"
                style={{
                background: ` no-repeat center/cover url(${data.images[0]}) `,
                }}
            >
                <div className="header-content">
                    <h2 className="alt-font">{data.title}</h2>
                </div>

                <BookWidget />
            </header>
            <section className="desc">
                <h1 className="alt-font">{data.title}</h1>
                <p>Book a stay over N12,000 at this property and get access to free WIFI</p>
            </section>
            <section className='room-images'>
                {data.images?.map((photo, i) => (
                    <div className="room-image-wrapper" key={i}>
                        <img
                            src={photo}
                            alt=""
                            className="room-image"
                        />
                    </div>
                ))}
            </section>
            <section className="roomInfo">
                <div className="infoLeft">
                    <div className="info">
                        <div>
                            <h3>Price</h3>
                            <p>N{data.price.toLocaleString('en-US')}</p>
                        </div>
                        <div>
                            <h3>SIZE</h3>
                            <p>{data.size}</p>
                        </div>
                        <div>
                            <h3>OCCUPANCY</h3>
                            <p>
                                {data.maxPeople}
                            </p>
                        </div>
                        <div>
                            <h3>BEDDING</h3>
                            <p>{data.bedding}</p>
                        </div>
                    </div>
                </div>
                <div className="infoRight">
                    <h2 className="alt-font">ROOM OVERVIEW</h2>
                    <p>{data.desc}</p>
                </div>
            </section>
            <section className="desc_main">
                <article className="descLeft">
                    <div className="bg-light"></div>
                    <h1 className="alt-font">OTTA IS CALLING</h1>
                    <p>
                        The hotel features a standard sized swimming pool, a restaurant and a bar. 
                        The hotel is a 35 minutes drive from Murtala Mohammed International Airport. 
                        The restaurant serves local and continental dishes. 
                        The bar serves a variety of alcoholic and non alcoholic drinks which can be enjoyed in the lounge. 
                        Guests may also dine outdoors by the balcony overlooking the pool.
                    </p>
                </article>
                <div className="descRight">
                    <img src={`${data.images[2]}`} alt="sub_room" />
                </div>
            </section>
        </div> 
    )
}

export default Room;