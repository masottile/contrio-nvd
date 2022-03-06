import { Dialog, DialogContent, DialogTitle, TextField, Box, Button, Typography, Divider, MenuItem, FormGroup, cardActionAreaClasses } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { TAGS } from "./util/Tags";

function DetailedStageCard({ id, stageId, open, title, description, tag, handleClose, handleSaveCard, handleDeleteCard }) {
    const [titleState, setTitleState] = useState(title);
    const [descriptionState, setDescriptionState] = useState(description);
    const [tagState, setTagState] = useState(tag.label);

    const handleTitleChange = (event) => {
        setTitleState(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescriptionState(event.target.value);
    }

    const handleTagChange = (event) => {
        setTagState(event.target.value);
    }

    const handleSaveButton = () => {
        const tag = TAGS.find(element => element.label === tagState);
        const newCard = {
            title: titleState,
            description: descriptionState,
            tag: tag.value
        }
        handleSaveCard(stageId, id, newCard);
        handleClose();
    }

    const handleDeleteButton = () => {
        handleDeleteCard(stageId, id);
        handleClose();
    }
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <Box style={{ width: "500px"}}>
                <DialogTitle lable="Title" value={title}>
                    <Typography style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                        Edit Card
                    </Typography>
                    <Button style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '0.5rem',
                    }} onClick={handleClose}>
                        <CloseIcon />
                    </Button>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <FormGroup>
                        <TextField label='Title' value={titleState} onChange={handleTitleChange} style={{margin: "1rem"}} required={true}/>
                        <TextField label='Short Description' value={descriptionState} onChange={handleDescriptionChange} style={{margin: "1rem"}} multiline rows={5} minRows={5} required={true}/>
                        <TextField
                            select
                            label="Tag"
                            style={{margin: "1rem"}}
                            value={tagState}
                            onChange={handleTagChange}
                        >
                            {TAGS.map((option) => (
                                <MenuItem key={option.label} value={option.value.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormGroup>

                    <Box style={{ textAlign: 'center' }}>
                        <Button variant="contained" style={{ marginRight: '1rem' }} onClick={handleDeleteButton}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={handleSaveButton}>
                            Save
                        </Button>
                    </Box>
                </DialogContent>
            </Box >
        </Dialog >
    );
}

export default DetailedStageCard;