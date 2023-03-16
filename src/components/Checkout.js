import React from "react";

const Checkout = () => {
    return (
    <div>
        <div className="checkout container">
            <form>
            <h1>Let's complete your order!</h1>
            
                <p>Credit Card No.</p>
                <input placeholder='credicardnumber' value={credicardnumber} />

                <p>Exp. Date</p>
                <input placeholder='expdate' value={expdate} />

                <p>CCV</p>    
                <input placeholder='ccv' value={ccv} />
            </form>
        </div>
    </div>
    )
}

export default Checkout;