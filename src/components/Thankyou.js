import React from "react";
import { Link } from "react-router-dom";

const Thankyou = () => {
    return (
        <div className="thankyou-container">
            <h1>Thankyou for shopping with us!</h1>
            <Link to='/#/'>Home</Link>
        </div>
    )
}

export default Thankyou;