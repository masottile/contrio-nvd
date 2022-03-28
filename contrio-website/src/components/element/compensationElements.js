// {
//     id:             // unique id of the component
//     status:         // active/disabled/conditional
//     name:           // the name
//     desc:           // give a brief desc of what this component is (hover to view) 
//     type:           // e.g. textbox (short), textbox (long), button, toggle, etc.  
//     enf:            // any enforcement of datatype? (e.g. $ should be a number only)
//     canDelete:      // flag to indicate whether the element is removable by user
// },
import { Type } from "../Type";
import { Status } from "../Status";
import { Enforce } from "../Enforce"

export const feCompensationElements = {
    'fe-amount' : {
        id: 'fe-amount',
        status: Status.active,
        name: 'Payment Amount',
        desc: 'Total project payment amount in CAD',
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    "fe-payment-buffer" : {
        id: 'fe-payment-buffer',
        status: Status.active,
        name: "Invoice Payment Buffer",
        desc: "Payment will be made [X] days after invoice is submitted",
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    notes: {
        id: "comp_notes",
        status: Status.active,
        name: "Notes",
        desc: "Additional Notes",
        type: Type.tbl,
        enf: Enforce.none,
        canDelete: false
    }
}

export const hwCompensationElements = {
    "hw-amount" : {
        id: 'hw-amount',
        status: Status.active,
        name: "Hourly Wage",
        desc: "Freelancer hourly wage in CAD",
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    "hw-pay-interval": {
        id: 'hw-pay-interval',
        status: Status.active,
        name: "Pay Schedule Interval",
        desc: "e.g. pick weekly, biweekly, or monthly",
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    "hw-pay-scheduled-date": {
        id: 'hw-pay-scheduled-date',
        status: Status.active,
        name: "Pay Schedule Date",
        desc: "pick date or day. e.g. Saturday or 1st",
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    // "hw-invoice-scheduled-date" : {
    //     id: 'hw-invoice-scheduled-date',
    //     status: Status.active,
    //     name: "Invoice Schedule Interval",
    //     desc: "e.g. Will Invoice weekly/bi-weekly/month",
    //     type: Type.tbs,
    //     enf: Enforce.none,
    //     canDelete: false,
    // },
    "hw-payment-buffer" : {
        id: 'hw-payment-buffer',
        status: Status.active,
        name: "Invoice Payment Buffer",
        desc: "e.g. Independent Contract will be paid with in [X] Days after an invoice is submitted.",
        type: Type.tbs,
        enf: Enforce.none,
        canDelete: false,
    },
    notes: {
        id: "comp_notes",
        status: Status.active,
        name: "Notes",
        desc: "Additional Notes",
        type: Type.tbl,
        enf: Enforce.none,
        canDelete: false
    }
}