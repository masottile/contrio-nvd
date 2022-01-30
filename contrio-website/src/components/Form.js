import React from 'react';
import { useState } from "react";
import axios from 'axios';

const Form = ({ type }) => {
    const [freelancerName, setFreelancerName] = useState("");
    const [clientName, setClientName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [contractID, checkContractID] = useState("");

    const handleInputSubmit = (event) => {
        event.preventDefault();
        alert('creating contract for ' + freelancerName + " and " + clientName + " of the amount of: " + paymentAmount);
        axios.post(`api/contracts/create/${event.target[0].value}/${event.target[2].value}`).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
            }
        })
        // would also be good to figure out how to display and returned data (e.g. get backend to return the id of the contract just created)
    }
    const handleOutputSubmit = (event) => {
        event.preventDefault();
        alert('checking values for Contrack' + contractID);
        axios.get(`api/contracts/retrieve/${event.target[0].value}`).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
            }
        })
        // now just need to figure out how to display the response data 
    } 

    if (type === 'input') {
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

                <form onSubmit={handleOutputSubmit}>
                    <input type='submit' value='Submit' />
                    <br></br>
                    <input type='text' style={outputStyle} name='check-Contract' placeholder='Enter Contract Number' onChange={e => checkContractID(e.target.value)} />
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
