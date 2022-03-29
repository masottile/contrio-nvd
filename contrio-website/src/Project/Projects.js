// list of all projects associated with the user:
// project attributes:
// 1. id:           unique id of the project 
// 2. name:         name of project
// 3. client:       name of client
// 4. status:       signed / ongoing / complete / closed / terminated
import { Status } from "../components/Status"

export var Projects = [
    {
        id: 0,
        name: "B3nd3r Customer Data Collection Design Proposal",
        client: "Richard Wolfe",
        status: Status.project_ongoing,
    },
    {
        id: 1,
        name: "Stream19 Medical Pre-Survey Project",
        client: "John Smith",
        status: Status.project_ongoing,      
    },
    {
        id: 2,
        name: "Google Website",
        client: "Google",
        status: Status.project_closed,      
    }
]