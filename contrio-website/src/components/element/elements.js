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
        employer_name: {
            id: 2,
            status: Status.active,
            name: "Employer Name",
            desc: "Name of the employee (e.g. client's name)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        employee_name: {
            id: 3,
            status: Status.active,
            name: "Employee Name",
            desc: "Name of the employee (e.g. freelancer's name)",
            type: Type.tbs,
            enf: Enforce.none,
            canDelete: false
        },
        contract_date: {
            id: 4,
            status: Status.active,
            name: "Contract Date",
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
        
    }
}

export const customElements = {}