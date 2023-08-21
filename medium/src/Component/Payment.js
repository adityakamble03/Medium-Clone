import React from 'react';
import './Payment.css';

const Payment = () => {
    const plans=['₹5/day','₹10/day','₹15/day']
    function handlePayment() {
        localStorage.setItem('payment', 'premium' );
        const revisionHistory = `User is a premium member now`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
    }

    return (
        <div className="payment-container">
            <div className="payment-details">
                <p>Get unlimited access to everything on Medium</p>
                <p>Plans starting at less than $1/week. Cancel anytime.</p>
                <ul>
                    <li><i class="bi bi-check"></i> No ads</li>
                    <li> <i class="bi bi-check"></i>Listen to any story</li>
                    <li><i class="bi bi-check"></i>Support quality writing</li>
                    <li><i class="bi bi-check"></i>Access on any device</li>
                    <li><i class="bi bi-check"></i>Read offline with the Medium app</li>
                    <li><i class="bi bi-check"></i>Create your own publications</li>
                    <li><i class="bi bi-check"></i>Mastodon account</li>
                </ul>
            </div>
            <div className='card-pay'>
            <div className="payment-card">
                <h2 className="payment-card-title">1 Post per Day</h2>
                <p className="payment-amount">{plans[0]}</p>
                <a href="https://buy.stripe.com/test_28odSngqI3Z56HuaEF">
                <button onClick={handlePayment} className="pay-button">Pay Now</button>
                </a>
                
            </div>
            <div className="payment-card" >
                <h2 className="payment-card-title">3 Posts per Day</h2>
                <p className="payment-amount">{plans[1]}</p>
                <a href='https://buy.stripe.com/test_5kAg0v1vO8flc1OaEE'>
                <button onClick={handlePayment} className="pay-button">Pay Now</button>
                </a>
                
            </div>
            <div className="payment-card" >
                <h2 className="payment-card-title">5 Posts per Day</h2>
                <p className="payment-amount">{plans[2]}</p>
                <a href='https://buy.stripe.com/test_3cs7tZ5M4gLR8PC8wy'>
                <button onClick={handlePayment} className="pay-button">Pay Now</button>
                </a>
            </div>
            </div>
        </div>
    );
};

export default Payment;
