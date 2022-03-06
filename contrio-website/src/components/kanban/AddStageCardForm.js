import { Dialog, DialogContent, DialogTitle, TextField, Box, Button, Typography, Divider, MenuItem, FormGroup } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useRef, useState } from "react";
import { TAGS } from "./util/Tags";

function AddStageCardForm({ stageId, open, name, handleClose, handleAddCard }) {
    const [tag, setTag] = useState(TAGS[0].value);
    let titleRef = useRef('titleRef')
    let shortDescriptionRef = useRef('shortDescriptionRef');

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleAddButton = () => {

        const newCardData = {
            title: titleRef.current.value,
            description: shortDescriptionRef.current.value,
            tag: tag
        }
        handleAddCard(stageId, newCardData);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box style={{ width: "500px"}}>
                <DialogTitle lable="Title" value={name}>
                    <Typography style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                        Add New Card
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
                        <TextField inputRef={titleRef} label='Title' style={{margin: "1rem"}} required/>
                        <TextField inputRef={shortDescriptionRef} label='Short Description' style={{margin: "1rem"}} multiline rows={5} minRows={5} required/>
                        <TextField
                            select
                            label="Select Tag"
                            style={{margin: "1rem"}}
                            value={tag}
                            onChange={handleTagChange}
                            helperText="Please select your tag"
                            required={true}
                        >
                            {TAGS.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormGroup>

                    <Box style={{ textAlign: 'center' }}>
                        <Button variant="contained" style={{ marginRight: '1rem' }} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="contained" onClick={handleAddButton}>
                            Add
                        </Button>
                    </Box>
                </DialogContent>
            </Box >
        </Dialog >
    );
}

export default AddStageCardForm;