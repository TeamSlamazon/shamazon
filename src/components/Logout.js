import React from "react";

const Logout = ({setUser}) => {
    return (
        <div className='logout-container'>
        <button className='logout-btn' onClick={ () => {window.localStorage.removeItem('token'); setUser({})}}>Logout</button>
    </div>
    )
  }
export default Logout;
