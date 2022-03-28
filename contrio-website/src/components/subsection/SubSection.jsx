import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import './subsection.css'
import { Status } from '../Status';
import Element from '../element/Element';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Type } from '../Type';
import { v4 as uuidv4 } from 'uuid';
import { Enforce } from '../Enforce';
import CustomContext from '../context/CustomContext';

import {feCompensationElements, hwCompensationElements} from '../element/compensationElements'

const SubSection = ({ sectionID, sectionTitle, currContext, allowCustomInputs }) => {
    const customContext = useContext(CustomContext);
    const default_ComponentName = "Component Name";
    const default_ComponentDesc = "Component Description";

    const CustomElementCreationButton = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const addToSubsectionArray = () => {
            const newid = uuidv4();

            setAnchorEl(null);

            // const el = <Element className='c-element' key={newid} name={default_ComponentName} desc={default_ComponentDesc} type={elementType} enf={Enforce.none} />
            const newObj = { ...customContext.currentElements };
            const newElement = {
                id: newid,
                status: Status.active,
                name: default_ComponentName,
                desc: default_ComponentDesc,
                type: Type.cust,
                enf: Enforce.none,
                canDelete: true,
            };

            if (newObj[sectionID] === undefined || newObj[sectionID] === null) {
                newObj[sectionID] = {};
            }
            newObj[sectionID][newid] = newElement

            customContext.setElements(elements => ({ ...newObj }));
            console.log(customContext.currentElements);
        }

        return (
            allowCustomInputs &&
            <>
                <Tooltip title="Create Custom Elements">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'create-elements-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <AddIcon sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="create-elements-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => addToSubsectionArray()}>New Element</MenuItem>
                </Menu>
            </>
        )
    }

    // function to create components from current state:
    const printElements = () => {
        const arr = [];

        Object.entries(customContext.currentElements).forEach(item => {
            if (item[0] === currContext.currSelectedSection) {
                Object.entries(item[1]).forEach(e => {
                    const dbKey = e[0];
                    const element = e[1];
                    if (element.status === Status.active) {
                        arr.push(
                            <Element className='c-element' key={element.id} id={element.id} dbKey={dbKey} sectionID={sectionID} name={element.name} desc={element.desc} type={element.type} enf={element.enf} deletable={element.canDelete} />
                        )
                    }
                });
            }
        })
        // console.log(arr)

        return arr
    }

    const CompensationOptionAddButton = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const addCompensationOption = (isSetFee) => {
            const newObj = { ...customContext.currentElements };
            newObj[sectionID] = {};
  
            if (isSetFee) {
                newObj[sectionID] = feCompensationElements
            } else {
                newObj[sectionID] = hwCompensationElements
            }
    
            customContext.setElements(() => ({ ...newObj }));
            // console.log(customContext.currentElements);
        }

        return (
            sectionID === 'COMPENSATION' &&
            <>
                <Tooltip title="Select Payment Option">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'create-elements-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <AddIcon sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    id="create-elements-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => addCompensationOption(true)}>Fixed Fee</MenuItem>
                    <MenuItem onClick={() => addCompensationOption(false)}>Hourly Wage</MenuItem>
                </Menu>
            </>
        )
    }

    return <Grid item className='c-item' xs={12}>
        {/* <h2 className='c-title'>{sectionTitle}</h2> */}
        {/* {subsectionArray} */}
        {printElements()}
        {/* {elements} */}
        <CompensationOptionAddButton />

        <CustomElementCreationButton />
    </Grid>
};

export default SubSection;
