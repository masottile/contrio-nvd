import React, { useContext } from 'react'

import './section.css'
import ContractContext from '../context/ContractContext'

// need variables:
// section name
// contract context
const RenderSection = () =>  {
    const contractContext = useContext(ContractContext);


    const RenderHeader = () => {
        let sectionTitle = "Header Section"
        if ("title" in contractContext.currentContract) {
            sectionTitle = contractContext.currentContract.title
        }
        let client = "___________"
        if ("client" in contractContext.currentContract) {
            client = contractContext.currentContract.client
        }
        let freelancer = "___________"
        if ("employee_name" in contractContext.currentContract) {
            freelancer = contractContext.currentContract.freelancer
        }
        let date = "___________"
        if ("employee_name" in contractContext.currentContract) {
            date = contractContext.currentContract.date
        }
        let notes = ""
        if ("employee_name" in contractContext.currentContract) {
            freelancer = contractContext.currentContract.notes
        }
        return <div className='s-subitem' xs={12}>
            <h2 className='s-title'>{sectionTitle}</h2>
            <p>This Contract, is entered into as of {date}, and outlines the agreement between {client} (hereafter referred to as the "Client") and {freelancer} (hereafter referred to as the "Freelancer"), collectively referred to as the "Parties".</p>
            <p>{notes}</p>
        </div>
    }

    const RenderWork = () => {
        // let deliverable = "___________"
        // if ("paymentAmount" in contractContext.currentContract["RENDER"]) {
        //     paymentAmount = contractContext.currentContract.RENDER.paymentAmount
        // }
        let workDescription = "__________________________________________________________________"
        if ("workDescription" in contractContext.currentContract["WORK"]) {
            workDescription = contractContext.currentContract.WORK.workDescription
        }
        let revisions = "___"
        if ("revisions" in contractContext.currentContract["WORK"]) {
            revisions = contractContext.currentContract.WORK.revisions
        }
        let notes = ""
        if ("notes" in contractContext.currentContract["WORK"]) {
            notes = contractContext.currentContract.WORK.notes
        }


        return <div className='s-subitem' xs={12}>
            <h2 className='s-title'>Work</h2>
            <p>The Freelancer agrees to provide the following service(s) (hereafter referred to a the "Work"):</p>
            <p>{workDescription}</p>
            <p>The Freelancer agrees to perform the Work at the request of the Client for the agreed upon payment and deliver the work the agreed upon deadline. The Freelancer agrees that they will be the sole author the Work, which will be original work by the Freelancer. The Freelancer agrees that the Client has the right to edit the Work after project completion. Both the Client and the Freelancer agree that the Client may request up to {revisions} revisions to the Work before completion.</p>
            <p>{notes}</p>
        </div>
    }

    const RenderCompensation = () => {
        let paymentAmount = "___________"
        if ("paymentAmount" in contractContext.currentContract["RENDER"]) {
            paymentAmount = contractContext.currentContract.RENDER.paymentAmount
        }
        let paymentSchedule = "__________________________________________________________________"
        if ("paymentSchedule" in contractContext.currentContract["RENDER"]) {
            paymentSchedule = contractContext.currentContract.RENDER.paymentSchedule
        }

        return <div className='s-subitem' xs={12}>
            <h2 className='s-title'>Compensation</h2>
            <p>As full compensation for all services provided, the Freelancer will be paid a total of {paymentAmount} CAD. Such payment will be made according to the following payment schedule:</p>
            <p>{paymentSchedule}</p>
            <p>The Freelancer is responsible for the payment of all federal, provincial, and/or local taxes with respect to the services they perform for the Client as an independent contractor. The Client will not treat the Freelancer as an employee for any purpose.</p>
        </div>
    }
}

export default RenderSection