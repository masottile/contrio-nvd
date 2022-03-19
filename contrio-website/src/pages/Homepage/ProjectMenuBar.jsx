import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Projects } from '../../Project/Projects';
import { Status } from '../../components/Status';

const ProjectMenuBar = (props) => {
    const menuItemList = [];
    const [project, setProject] = React.useState('');

    // console.log(project); // returns the index of the project

    const handleChange = (event) => {
        setProject(event.target.value);
    };

    const renderMenuItems = () => {
        // console.log({Projects}[0]);
        Projects.forEach(p => {
            if (p.status !== Status.project_terminated && p.status !== Status.project_closed) {
                menuItemList.push(
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)
            }
        });
    }

    // console.log(menuItemList);

    return (
        <FormControl fullWidth className={props.className}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
                displayEmpty
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                label="Project"
                onChange={handleChange}
            >
                {renderMenuItems()}
                {menuItemList}
            </Select>
        </FormControl>
    )
}

export default ProjectMenuBar