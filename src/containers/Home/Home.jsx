import React from 'react'
import { Link } from 'react-router-dom';
import { BookWidget } from '../../components';

import './Home.scss';

const Home = () => {
  return (
    <div className='Home'>
      <header
        className="header-main"
        style={{
          background: ' no-repeat center/cover url("/img/home/home.jpg")',
        }}
      >
        <BookWidget />
      </header>

      <section className="desc">
        <h1 className="alt-font">Welcome to the beautiful D’Czars Hotel </h1>
        <p>
          D’Czars hotel also boasts high-class services like: uninterrupted electricity,
          an event hall, adequate car parking garage, a reliable security complimented 
          by the use of CCTV cameras, a gym and a swimming pool.
        </p>
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
          <h2>RESORT OPEN</h2>
          <Link to="/rooms">
            <button className="btn contrast">Discover More</button>
          </Link>
        </article>
        <div className="descRight">
          <img src="/img/home/home_resort.jpg" alt="home_resort" />
        </div>
      </section>
      <section className="spotlight">
        <h1 className="alt-font">Spotlight</h1>
        <div className="card-row">
          <div className="card">
            <div>
              <img src="/img/home/home_food.jpg" alt="home_food" />
            </div>
            <article>
              <h2 className="alt-font">Delicious Cuisine</h2>
              <p>
                The essence of Nigerian food is all about balance – achieving the
                perfect harmony between sweet, sour, hot and salty. Pungent
                fresh herbs, such as lemongrass and galangal, tone down
                overpowering spices, while salty sauces are tempered with sugars
                and offset by acids, such as lemon and lime.
              </p>
              <Link to="/dining">
                <button className="btn contrast">Discover More</button>
              </Link>
            </article>
          </div>
          <div className="card">
            <div>
              <img src="/img/home/home_room.jpg" alt="home_room" />
            </div>
            <article>
              <h2 className="alt-font">Luxury Rooms</h2>
              <p>
                The rooms at D’Czars Hotel are quite spacious and come with great services and facilities such as luxurious beds,
                wardrobe, flat-screen television sets with access to cable channels, free wireless internet access, en-suite bathrooms 
                with stand-in showers and complimentary toiletries, telephone luggage storage, tables and armchairs, refrigerators plus in-room sofas.
              </p>
              <Link to="/rooms">
                <button className="btn contrast">Discover More</button>
              </Link>
            </article>
          </div>
          <div className="card">
            <div>
              <img src="/img/home/home_tour.jpg" alt="home_food" />
            </div>
            <article>
              <h2 className="alt-font">Amazing Hall</h2>
              <p>
                From lush mountains of the central and northern areas of the
                country to weirdly shaped limestone formations of southern
                Thailand, the country owes part of its fame to its wealth of
                natural wonders. Follow us through these breathtaking natural
                sights that you shouldn’t miss if you come to Thailand – all of
                them will make you stare wide-eyed in front of the outstanding
                beauty of Mother Nature.
              </p>
              <Link to="/hall">
                <button className="btn contrast">Discover More</button>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;