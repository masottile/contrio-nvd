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
            id: 1,
            status: Status.active,
            name: "Contract Title",
            desc: "The name of this contract",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        client: {
            id: 2,
            status: Status.active,
            name: "Client's Name",
            desc: "Name of the client (e.g. Apple Inc.)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        freelancer: {
            id: 3,
            status: Status.active,
            name: "Freelancer's Name",
            desc: "Name of the freelancer (e.g. John Doe)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        date: {
            id: 4,
            status: Status.active,
            name: "Agreement Date",
            desc: "Date of signing",
            type: Type.tbs,
            enf: Enforce.date,
            canDelete: false
        },
        notes: {
            id: 5,
            status: Status.active,
            name: "Notes",
            desc: "Additional Notes",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: false
        }
    },
    "AGREEMENT": {
        service: {
            id: 6,
            status: Status.active,
            name: "Overview of Services Provided",
            desc: "General description of services provided by the freelancer",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: false
        },
        service_detail: {
            id: 7,
            status: Status.active,
            name: "List of detailed services",
            desc: "A detailed list of all services provided by freelancer",
            type: Type.tbl,
            enf: Enforce.none,
            canDelete: false
        },
    },
}

export const customElements = {}