import React from 'react';
import { Link } from 'react-router-dom';
import { BookWidget, Loader } from '../../components';

import useFetch from '../../hooks/useFetch';
import './Rooms.scss';

const Rooms = () => {
    const { data, loading } = useFetch('/api/rooms');
    return (
        <div className="Rooms">
             <header
                className="header-main"
                style={{
                background:
                    ' no-repeat center/cover url("/img/rooms/room_header.jpg")',
                }}
            >
                <div className="header-content">
                <h2 className="alt-font">Rooms</h2>
                <p>
                    Our generous guest rooms at D'czars hotel & suites boast breathtaking views and
                    exclusive amenities
                </p>
                </div>

                <BookWidget />
            </header>
            <section className="desc">
                <h1 className="alt-font">Be Captivated</h1>
                <p>
                    Choose between spectacular balcony views of The Rooms  from the largest hotel rooms
                    in Otta.
                </p>
            </section>

            <section className="flex-row-lg">
                {loading ? (<Loader />) : (
                    data.map((room) => (
                        <article className="card" key={room._id}>
                            <Link to={`/rooms/${room._id}`} state = {{ data: room}}>
                                <button className="btn-alt ">EXPLORE</button>
                            </Link>
                            <div>
                                <h1 className="alt-font">{room.title}</h1>
                                <p>{room.desc}</p>
                            </div>
                            <div className="img-container">
                                <img src={room.images[0]} alt={room.title} />
                            </div>
                        </article>
                    ))
                )}
            </section>
        </div>
    )
}

export default Rooms