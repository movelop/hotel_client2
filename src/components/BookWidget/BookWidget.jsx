import React, { useState, useEffect, useRef, useContext } from 'react';
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Box } from '@mui/material';

import { SearchContext } from '../../context/searchContext';
import './BookWidget.scss';

const BookWidget = () => {
    const { search, dates, options } = useContext(SearchContext);
    const [showInfo, setShowInfo] = useState(false);
    const [searchDate,setSearchDate] = useState(dates)
    const [searchOptions, setSearchOptions] = useState(options);
    const [open, setOpen] = useState(false);
    const refOne = useRef(null)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
      }, [])
    
      // hide dropdown on ESC press
      const hideOnEscape = (e) => {
        // console.log(e.key)
        if( e.key === "Escape" ) {
          setOpen(false)
        }
      }
    
      // Hide on outside click
      const hideOnClickOutside = (e) => {
        // console.log(refOne.current)
        // console.log(e.target)
        if( refOne.current && !refOne.current.contains(e.target) ) {
          setOpen(false)
        }
      }

    const toggleMobileDisplay = () => {
        setShowInfo(!showInfo);
    };

    const updateAdultQuantity = (val) => {
        if (searchOptions.adults === 1 && val === -1) return;
        if (searchOptions.adults === 5 && val === 1) return;
        setSearchOptions({ ...searchOptions, adults: searchOptions.adults + val });
    };
    const updateRoomsQuantity = (val) => {
        if (searchOptions.rooms === 1 && val === -1) return;
        if (searchOptions.rooms === 5 && val === 1) return;
        setSearchOptions({ ...searchOptions, rooms: searchOptions.rooms + val });
    };
    const updateChildrenQuantity = (val) => {
        if (searchOptions.children === 0 && val === -1) return;
        if (searchOptions.children === 5 && val === 1) return;
        setSearchOptions({ ...searchOptions, children: searchOptions.children + val });
    };

    const handleSubmit = () => {
        if(location.pathname !== '/booking') {
            navigate('/booking', { state: { searchDate, searchOptions } });
        }
        search( searchDate, searchOptions);
    };

    return (
        <div className={`BookWidget ${showInfo ? "active" : ""}`}>
            <form onSubmit={handleSubmit}>
                <div className="date">
                    <div className="select-date">
                        <TextField
                            value={`${format(dates[0].startDate, "MM/dd/yyyy")}`}
                            readOnly
                            className="inputBox"
                            label="Check-in"
                            onClick={ () => setOpen(open => !open) }
                        />
                    </div>
                    <Box>to</Box>
                    <div className="select-date">
                        <TextField
                            value={`${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            readOnly
                            className="inputBox"
                            label="Check-out"
                            onClick={ () => setOpen(open => !open) }
                        />  
                    </div>
                    <div ref={refOne} className="calenderElement">
                        {open && 
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setSearchDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={searchDate}
                                minDate={new Date()}
                            />
                        }
                    </div>
                </div>
                <div className="guest">
                    <div className="adults">
                        <label>Adults</label>
                        <div className="guest-select">
                            <div
                                className="btn-sm contrast"
                                name="adults"
                                onClick={() => updateAdultQuantity(1)}
                            >
                                <AiOutlinePlus />
                            </div>
                            <span>{searchOptions.adults}</span>
                            <div
                                className="btn-sm contrast"
                                name="adults"
                                onClick={() => {
                                updateAdultQuantity(-1);
                                }}
                            >
                                <AiOutlineMinus />
                            </div>
                        </div>
                    </div>
                    <div className="children">
                        <label>Children</label>
                        <div className="guest-select">
                            <div
                                className="btn-sm contrast"
                                name="children"
                                onClick={() => {
                                updateChildrenQuantity(1);
                                }}
                            >
                                <AiOutlinePlus/>
                            </div>
                            <span>{searchOptions.children}</span>
                            <div
                                className="btn-sm contrast"
                                name="children"
                                onClick={() => {
                                updateChildrenQuantity(-1);
                                }}
                            >
                                <AiOutlineMinus />
                            </div>
                        </div>
                    </div>
                    <div className="rooms">
                        <label>Rooms</label>
                        <div className="guest-select">
                            <div
                                className="btn-sm contrast"
                                name="adults"
                                onClick={() => updateRoomsQuantity(1)}
                            >
                                <AiOutlinePlus />
                            </div>
                            <span>{searchOptions.rooms}</span>
                            <div
                                className="btn-sm contrast"
                                name="adults"
                                onClick={() => {
                                updateRoomsQuantity(-1);
                                }}
                            >
                                <AiOutlineMinus />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn">Check Availability</button>
                {showInfo ?<IoIosArrowUp className="mobile-toggle" onClick={toggleMobileDisplay} size={32} /> : <IoIosArrowDown className="mobile-toggle" size={32} onClick={toggleMobileDisplay}/>}
            </form>
        </div>
    )
}

export default BookWidget;