import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import './section.css'
import AppContext from '../context/AppContext';
import ContractContext from '../context/ContractContext'

const Section = ({ title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  // todo ----- will need to iterate through the state (javascript object)
  // console.log("title" in contractContext.currentContract);

  debugger;
  const RenderHeader = () => {
    let sectionTitle = title
    console.log(contractContext)
    if ("title" in contractContext.currentContract) {
      sectionTitle = contractContext.currentContract.title
    }
    return <div className='s-subitem' xs={12}>
      <h2 className='s-title'>{sectionTitle}</h2>
      <p>This Freelance Contract (this "Agreement") is made as of {contractContext.currentContract.date} (the "Effective Date") by and between {contractContext.currentContract.client} (Client) and {contractContext.currentContract.freelancer} (Independent Contractor).
      Client and Independent Contractor may each be referred to in this Agreement as a "Party" and collectively as the "Parties".
      </p>
    </div>
  }

  return (
    <Grid item className='s-item' onClick={() => {context.setSection(title)}} xs={12}>
      {title === "HEADER" && (
          <RenderHeader />
      )}
      {title === "AGREEMENT" && (
        <div>
          <h2 className='s-title'>1. Services</h2>
          <p>Independent Contract shall provide the following services to to Client (the "Services"): {}. In addition, Independent Contractor shall perform such other duties and tasks, or changes
            to the Services, as may be agreed upon by the Parties.
          </p>
        </div>
      )}
      {title === "PROJECT_SCOPE" && (
        <div>
          <h2 className='s-title'>2. Project Scope</h2>
          <p>Inconsideration for Independent Contractor's performance of the Services, Client shall pay Independent Contractor:
          </p>
        </div>
      )}
      {title === "COMPENSATION" && (
        <div>
          <h2 className='s-title'>3. Compensation</h2>
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
      )}
    </Grid>

  )
}

export default Section