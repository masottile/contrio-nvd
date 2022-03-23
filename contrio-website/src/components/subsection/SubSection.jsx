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
import DeleteIcon from '@mui/icons-material/Delete';
import { Type } from '../Type';
import { getID } from '../idGenerator/getID'
import { Enforce } from '../Enforce';
import newID from '../idGenerator/getID';
import ElementContext from '../context/ElementContext';

const SubSection = ({ sectionName, sectionTitle, currContext }) => {
    const elementContext = useContext(ElementContext);
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

        const addToSubsectionArray = (elementType) => {
            const newid = newID();

            setAnchorEl(null);

            // const el = <Element className='c-element' key={newid} name={default_ComponentName} desc={default_ComponentDesc} type={elementType} enf={Enforce.none} />
            const newObj = {...elementContext.currentElements};
            const newElement = {
                id: newid,
                status: Status.active,
                name: default_ComponentName,
                desc: default_ComponentDesc,
                type: elementType,
                enf: Enforce.none,
                canDelete: true,
            };
            console.log(newObj[sectionName]);
            newObj[sectionName][newid] = newElement

            elementContext.setElements(elements => ({ ...newObj}));
        }

        return (
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
                    <MenuItem onClick={() => addToSubsectionArray(Type.tbs)}>Short Term</MenuItem>
                    <MenuItem onClick={() => addToSubsectionArray(Type.tbl)}>Long Term</MenuItem>
                    <MenuItem onClick={() => addToSubsectionArray(Type.blp)}>Bullet Points</MenuItem>
                </Menu>
            </>
        )
    }

    // function to create components from current state:
    const printElements = () => {
        const arr = [];

        Object.entries(elementContext.currentElements).map(item => {
            console.log(elementContext);
            if (item[0] === currContext.currSelectedSection) {
                Object.entries(item[1]).map(e => {
                    const dbKey = e[0];
                    const element = e[1];
                    if (element.status === Status.active) {
                        arr.push(
                            <Element className='c-element' key={element.id} id={element.id} dbKey={dbKey} section={sectionName} name={element.name} desc={element.desc} type={element.type} enf={element.enf} deletable={element.canDelete} />
                        )
                    }
                });
            }
        })

        return arr
    }

    return <Grid item className='c-item' xs={12}>
        <h2 className='c-title'>{sectionTitle}</h2>
        {/* {subsectionArray} */}
        {printElements()}
        {/* {elements} */}
        <CustomElementCreationButton />
    </Grid>
};

export default SubSection;
