import React from 'react'

import './Hall.scss';

const Hall = () => {
  return (
    <div className='Hall'>
        <header className='header-main'
            style={{
            background:
                ' no-repeat center/cover url("/img/hall/hall_header.jpg")',
            }}
        >
            <div className="header-content">
                <h2 className="alt-font">Event Hall</h2>
                <p>Host your functions in our lovely halls</p>
            </div>
        </header>
        <section className="desc">
            <h1 className="alt-font">Authentic African Cuisine</h1>
            <p>
                The essence of African(Nigeria) food is all about balance – achieving the perfect
                harmony between sweet, sour, hot and salty. Pungent fresh herbs, such
                as lemongrass and galangal, tone down overpowering spices, while salty
                sauces are tempered with sugars and offset by acids, such as lemon and
                lime.
            </p>
        </section>
        <section className="desc_photo">
            <div className="descLeft">
                <div>
                    <h1 className="alt-font">Meetings & Seminars</h1>
                <p>
                    The stylish heart of our resort, Vista Bar and Lounge’s eclectic
                    drinks, live entertainment and unfettered mountain views are
                    renowned in Cape Town. Indulge in afternoon tea, and by night, let
                    our expert mixologists personalise your cocktail. Table Mountain
                    forms an irresistible backdrop to your cosmopolitan evening out, as
                    Vista Bar buzzes with a sophisticated crowd.
                </p>
                </div> 
            </div>
            <div className="descRight">
                <img src="/img/hall/hall_meeting.jpg" alt="hall_meeting" />
            </div>
        </section>
        <section className="desc_photo">
            <div className="descLeft">
                <div>
                    <h1 className="alt-font">Ceremonies</h1>
                <p>
                    The stylish heart of our resort, Vista Bar and Lounge’s eclectic
                    drinks, live entertainment and unfettered mountain views are
                    renowned in Cape Town. Indulge in afternoon tea, and by night, let
                    our expert mixologists personalise your cocktail. Table Mountain
                    forms an irresistible backdrop to your cosmopolitan evening out, as
                    Vista Bar buzzes with a sophisticated crowd.
                </p>
                </div> 
            </div>
            <div className="descRight">
                <img src="/img/hall/hall_party.jpg" alt="hall_party" />
            </div>
        </section>
    </div>
  )
}

export default Hall;