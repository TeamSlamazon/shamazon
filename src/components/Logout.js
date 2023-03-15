import React from "react";

const Logout = () => {
    return (
        <div className='logout-container'>
        <button className='logout-btn' onClick={ ev => window.localStorage.removeItem('token') }>Logout</button>
    </div>
    )
  }
export default Logout;
