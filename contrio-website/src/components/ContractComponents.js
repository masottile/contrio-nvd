// {
//     id:             // unique id of the component
//     status:         // active/disabled/conditional
//     icon:           // icon of the component
//     name:           // the name
//     desc:           // give a brief desc of what this component is (hover to view) 
//     type:      // e.g. textbox (short), textbox (long), button, toggle, etc.  
//     enf:            // any enforcement of datatype? (e.g. $ should be a number only)
// },
import { Type } from "./Type";
import { Status } from "./Status";
import { Enforce } from "./Enforce"
import text from "../images/text.png"

export const ContractComponents = [
    {
        id: 1,
        status: Status.active,
        icon: text,
        name: "Contract Title",
        desc: "The name of this contract",
        type: Type.tbs,
        enf: Enforce.none
    },
    {
        id: 2,
        status: Status.active,
        icon: text,
        name: "Employee Name",
        desc: "Name of the employee (e.g. freelancer's name)",
        type: Type.tbs,
        enf: Enforce.string
    }
];