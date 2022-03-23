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
        let sectionTitle = ("title" in contractContext.currentContract ? contractContext.currentContract.title: "Header Section");
        let client = ("client" in contractContext.currentContract ? contractContext.currentContract.client: shortBlank);
        let freelancer = ("freelancer" in contractContext.currentContract ? contractContext.currentContract.freelancer: shortBlank);
        let date = ("date" in contractContext.currentContract ? contractContext.currentContract.date: shortBlank);
        let notes = ("notes" in contractContext.currentContract ? contractContext.currentContract.notes: "");
    
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
        return (
            <div>
              <h2 className='s-title'>Compensation</h2>
              <p>Inconsideration for Independent Contractor's performance of the Services, Client shall pay Independent Contractor:
                {/* Fixed Contract Output */}
                { (contractContext.currentContract["fe-amount"] !== undefined && contractContext.currentContract["fe-amount"] !== undefined) &&
                  <p>A Set Fee. The Client shall pay the Independent Contract ${contractContext.currentContract["fe-amount"] + " "} 
                  after the Independent Contractor completes the Services. After the Independent Contractor sends Client an invoice. 
                  Client shall pay Independent Contractor within {contractContext.currentContract["fe-payment-buffer"]} days.
                  </p>
                }
                {/* Hourly Wage Contract Output */}
                { (contractContext.currentContract["hw-amount"] !== undefined || contractContext.currentContract["hw-pay-interval"] !== undefined) && 
                <p>
                    A Fixed Wage. The Client shall pay the Independent Contract ${contractContext.currentContract["hw-amount"]} per hour. The Independent 
                    Contractor will be paid {contractContext.currentContract["hw-pay-interval"]}. Independent Contractor will be paid on 
                    {(contractContext.currentContract["hw-pay-interval"] === ("weekly") ? `${contractContext.currentContract["hw-pay-schduled-date"]} of every week.` : 
                  (contractContext.currentContract["hw-pay-interval"] === ("biweekly") ? `${contractContext.currentContract["hw-pay-schduled-date"]} of every two weeks.` :
                  (contractContext.currentContract["hw-pay-interval"] === ("monthly") ? `${contractContext.currentContract["hw-pay-schduled-date"]} of every month.` : "")
                  ))} After the Independent Contractor sends Client an invoice. Client shall pay Independent Contractor 
                  within {contractContext.currentContract["hw-payment-buffer"]} days.
                </p>
                }
              </p>
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