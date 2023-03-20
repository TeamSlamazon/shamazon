import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {

    return (
    <div>
        <div className="checkoutcontainer">
            <form>
            
            <h1>Let's complete your order!</h1>
            
                <p>Credit Card No.</p>
                <input placeholder='creditcardnumber' />

                <p>Exp. Date</p>
                <input  placeholder='expdate' />

                <p>CCV</p>    
                <input  placeholder='ccv' />

                <Link to='/thankyou'>Submit Payment</Link>
            </form>
        </div>
    </div>
    )
}

export default Checkout;