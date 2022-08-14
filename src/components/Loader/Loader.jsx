import React from 'react'

const Loader = ({ text }) => {
  return (
    <div className="loader">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h2>{text ? text : "Loading..."}</h2>
    </div>
  )
}

export default Loader