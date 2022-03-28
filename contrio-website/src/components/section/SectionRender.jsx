import React, { useContext } from 'react'

import './section.css'
import ContractContext from '../context/ContractContext'

// need variables:
// section name
// contract context

// If the section is a default section, then we know the text we should use to display that data
const SectionRender = ({id}) =>  {
    const contractContext = useContext(ContractContext);
    const shortBlank = "___________"
    const longBlank = "__________________________________________________________________"


    const RenderHeader = () => {
        let inContract = ("HEADER" in contractContext.currentContract)

        let sectionTitle = (inContract && "title" in contractContext.currentContract.HEADER ? contractContext.currentContract.HEADER.title: "Header Section");
        let client = (inContract && "client" in contractContext.currentContract.HEADER ? contractContext.currentContract.HEADER.client: shortBlank);
        let freelancer = (inContract && "freelancer" in contractContext.currentContract.HEADER ? contractContext.currentContract.HEADER.freelancer: shortBlank);
        let date = (inContract && "date" in contractContext.currentContract.HEADER ? contractContext.currentContract.HEADER.date: shortBlank);
        let notes = (inContract && "notes" in contractContext.currentContract.HEADER ? contractContext.currentContract.HEADER.notes: "");
    
        return <div className='s-subitem' xs={12}>
            <h2 className='s-title'>{sectionTitle}</h2>
            <p>This Contract, is entered into as of {date}, and outlines the agreement between {client} (hereafter referred to as the "Client") and {freelancer} (hereafter referred to as the "Freelancer"), collectively referred to as the "Parties".</p>
            <p>{notes}</p>
        </div>
    }

    const RenderWork = () => {
        let inContract = ("WORK" in contractContext.currentContract)

        let workDescription = (inContract && "workDescription" in contractContext.currentContract["WORK"] ? contractContext.currentContract.WORK.workDescription: longBlank);
        let revisions = (inContract && "revisions" in contractContext.currentContract["WORK"] ? contractContext.currentContract.WORK.revisions: shortBlank);
        let notes = (inContract && "notes" in contractContext.currentContract["WORK"] ? contractContext.currentContract.WORK.notes: "");

        return <div className='s-subitem' xs={12}>
            <h2 className='s-title'>Work</h2>
            <p>The Freelancer agrees to provide the following service(s) (hereafter referred to a the "Work"):</p>
            <p>{workDescription}</p>
            <p>The Freelancer agrees to perform the Work at the request of the Client for the agreed upon payment and deliver the work the agreed upon deadline. The Freelancer agrees that they will be the sole author the Work, which will be original work by the Freelancer. The Freelancer agrees that the Client has the right to edit the Work after project completion. Both the Client and the Freelancer agree that the Client may request up to {revisions} revisions to the Work before completion.</p>
            <p>{notes}</p>
        </div>
    }

    // const RenderCompensation = () => {
    //     let inContract = ("COMPENSATION" in contractContext.currentContract)
    //     let paymentAmount = (inContract && "paymentAmount" in contractContext.currentContract["COMPENSATION"] ? contractContext.currentContract.COMPENSATION.paymentAmount: shortBlank);
    //     let paymentSchedule = (inContract && "paymentSchedule" in contractContext.currentContract["COMPENSATION"] ? contractContext.currentContract.COMPENSATION.paymentSchedule: longBlank);

    //     return <div className='s-subitem' xs={12}>
    //         <h2 className='s-title'>Compensation</h2>
    //         <p>As full compensation for all services provided, the Freelancer will be paid a total of {paymentAmount} CAD. Such payment will be made according to the following payment schedule:</p>
    //         <p>{paymentSchedule}</p>
    //         <p>The Freelancer is responsible for the payment of all federal, provincial, and/or local taxes with respect to the services they perform for the Client as an independent contractor. The Client will not treat the Freelancer as an employee for any purpose.</p>
    //     </div>
    // }

    const RenderCompensation = () => {
        let inContract = ("COMPENSATION" in contractContext.currentContract);
        let notes = (inContract && "notes" in contractContext.currentContract["WORK"] ? contractContext.currentContract.WORK.notes: "");

        let fixedFee = (inContract && ("fe-amount" in contractContext.currentContract.COMPENSATION || "fe-payment-buffer" in contractContext.currentContract.COMPENSATION));
        let feAmount = (fixedFee && "fe-amount" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["fe-amount"]: shortBlank);
        let feBuffer = (fixedFee && "fe-payment-buffer" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["fe-payment-buffer"]: shortBlank);
        let paymentSchedule = (fixedFee && "paymentSchedule" in contractContext.currentContract["COMPENSATION"] ? contractContext.currentContract.COMPENSATION.paymentSchedule: longBlank);

        let hourWage = (inContract && ("hw-amount"in contractContext.currentContract.COMPENSATION || "hw-pay-interval" in contractContext.currentContract.COMPENSATION));
        let hwAmount = (hourWage && "hw-amount" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["hw-amount"]: shortBlank);
        let hwPayInt = (hourWage && "hw-pay-interval" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["hw-pay-interval"]: shortBlank);
        let hwPayDay = (hourWage && "hw-pay-schduled-date" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["hw-pay-schduled-date"]: shortBlank);
        let hwBuffer = (hourWage && "hw-payment-buffer" in contractContext.currentContract.COMPENSATION ? contractContext.currentContract.COMPENSATION["hw-payment-buffer"]: shortBlank);
        return (
            <div className='s-subitem' xs={12}>
              <h2 className='s-title'>Compensation</h2>
                {/* Fixed Contract Output */}
                { fixedFee &&
                    <p>As full compensation for all services provided, the Freelancer will be paid a total of {feAmount} CAD. The Client will pay the Freelancer within {feBuffer} days after recieving an invoice. Invoices will be sent to the Client according to the following schedule: {paymentSchedule}</p>
                }
                {/* Hourly Wage Contract Output */}
                { hourWage && 
                    <p> As full compensation for all services provided, the Freelancer will be paid a fixed wage of {hwAmount} CAD per hour. The Client will pay the Freelancer within {hwBuffer} days after recieving an invoice. Invoices will be sent {hwPayInt} by the
                    {hwPayInt === ("weekly") ? `${hwPayDay} of every week.` : 
                    (hwPayInt === ("biweekly") ? `${hwPayDay} of every two weeks.` :
                    (hwPayInt === ("monthly") ? `${hwPayDay} of every month.` : shortBlank+shortBlank)
                    )}
                    </p>
                }
                <p>The Freelancer is responsible for the payment of all federal, provincial, and/or local taxes with respect to the services they perform for the Client as an independent contractor. The Client will not treat the Freelancer as an employee for any purpose.</p>
                <p>{notes}</p>
            </div>
        )
    }

    return (
        <div>
            {id === "HEADER" && (<RenderHeader />)}
            {id === "WORK" && (<RenderWork />)}
            {id === "COMPENSATION" && (<RenderCompensation />)}
        </div>
    )
}

// agreement section: Independent Contract shall provide the following services to to Client (the "Services"): {}. In addition, Independent Contractor shall perform such other duties and tasks, or changes to the Services, as may be agreed upon by the Parties.
// project scope section: Inconsideration for Independent Contractor's performance of the Services, Client shall pay Independent Contractor:

export default SectionRender