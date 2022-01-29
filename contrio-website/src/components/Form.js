import React from 'react';
import { useState } from "react";

const Form = ({ type }) => {
    const [freelancerName, setFreelancerName] = useState("");
    const [clientName, setClientName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");

    const handleInputSubmit = (event) => {
        event.preventDefault();
        alert('creating contract for ' + freelancerName + " and " + clientName + " of the amount of: " + paymentAmount);
    } 

    if (type == 'input') {
        return (
            <div style={containerStyle}>
                <h1 style={{ textAlign: 'center' }}>Input new Contract Details</h1>
                <br></br>

                <form onSubmit={handleInputSubmit}>
                    <input type='text' style={inputStyle} name='input-FreelancerName' placeholder='Enter Freelancer Name' onChange={e => setFreelancerName(e.target.value)} />
                    <br></br>
                    <input type='text' style={inputStyle} name='input-ClientName' placeholder='Enter Client Name'
                    onChange={e => setClientName(e.target.value)}/>
                    <br></br>
                    <input type='text' style={inputStyle} name='input-PaymentAmount' placeholder='Enter Total Payment Amount'
                    onChange={e=> setPaymentAmount(e.target.value)} />
                    <br></br>
                    <input type='submit' value='Submit' />
                </form>

                <br></br>
                <br></br>
            </div>
        )
    }
    else {
        return (
            <div style={containerStyle}>
                <h1 style={{ textAlign: 'center' }}>View Existing Contract</h1>
                <br></br>

                <form>
                    <input type='submit' value='Submit' />
                    <br></br>
                    <input type='text' style={outputStyle} name='' />
                </form>

            </div>
        )
    }
};

const containerStyle = {
    margin: '20px',
}

const inputStyle = {
    textAlign: 'center',
    fontSize: '20px',
    width: '50%',
    height: '50px',
    margin: '5px',
    padding: '10px, 10px',
}

const outputStyle = {
    textAlign: 'center',
    fontSize: '20px',
    width: '100%',
    height: '50px',
    margin: '10px',
    padding: '10px, 10px',
}

export default Form;
