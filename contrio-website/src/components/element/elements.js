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

export const defaultElements = {
    "HEADER": {
        title: {
            id: 11,
            status: Status.active,
            name: "Contract Title",
            desc: "The name of this contract",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        client: {
            id: 12,
            status: Status.active,
            name: "Client's Name",
            desc: "Name of the client (e.g. Apple Inc.)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        freelancer: {
            id: 13,
            status: Status.active,
            name: "Freelancer's Name",
            desc: "Name of the freelancer (e.g. John Doe)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        date: {
            id: 14,
            status: Status.active,
            name: "Agreement Date",
            desc: "Date of signing",
            type: Type.tbs,
            enf: Enforce.date,
            canDelete: false
        },
        notes: {
            id: 15,
            status: Status.active,
            name: "Notes",
            desc: "Additional Notes",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: true
        }
    },
    "WORK": {
        workDescription: {
            id: 21,
            status: Status.active,
            name: "Work Description",
            desc: "Short description of work or services provided",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: false
        },
        revisions: {
            id: 22,
            status: Status.active,
            name: "Revisions",
            desc: "Number of requested revisions allowed",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        notes: {
            id: 23,
            status: Status.active,
            name: "Notes",
            desc: "Additional Notes",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: true
        }
    },
    "COMPENSATION": {
        paymentAmount: {
            id: 31,
            status: Status.active,
            name: "Payment Amount",
            desc: "Total project payment in CAD",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        revisions: {
            id: 32,
            status: Status.active,
            name: "Payment Schedule",
            desc: "Short description of when payments must be made during the project",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: false
        },
        notes: {
            id: 33,
            status: Status.active,
            name: "Notes",
            desc: "Additional Notes",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: true
        }
    },
    "AGREEMENT": {
        
    }
}

export const customElements = {}