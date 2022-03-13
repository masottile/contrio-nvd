// {
//     id:             // unique id of the component
//     status:         // active/disabled/conditional
//     name:           // the name
//     desc:           // give a brief desc of what this component is (hover to view) 
//     type:      // e.g. textbox (short), textbox (long), button, toggle, etc.  
//     enf:            // any enforcement of datatype? (e.g. $ should be a number only)
// },
import { Type } from "../Type";
import { Status } from "../Status";
import { Enforce } from "../Enforce"

export const defaultElements = {
    "HEADER": {
        title: {
            id: 1,
            status: Status.active,
            name: "Contract Title",
            desc: "The name of this contract",
            type: Type.tbs,
            enf: Enforce.none
        },
        client: {
            id: 2,
            status: Status.active,
            name: "Client's Name",
            desc: "Name of the client (e.g. Apple Inc.)",
            type: Type.tbs,
            enf: Enforce.none
        },
        freelancer: {
            id: 3,
            status: Status.active,
            name: "Freelancer's Name",
            desc: "Name of the freelancer (e.g. John Doe)",
            type: Type.tbs,
            enf: Enforce.none
        },
        date: {
            id: 4,
            status: Status.active,
            name: "Agreement Date",
            desc: "Date of signing",
            type: Type.tbs,
            enf: Enforce.date
        },
        notes: {
            id: 5,
            status: Status.active,
            name: "Notes",
            desc: "Additional Notes",
            type: Type.tbl,
            enf: Enforce.none
        }
    },
    "AGREEMENT": {
        
    }
}

export const customElements = {

}