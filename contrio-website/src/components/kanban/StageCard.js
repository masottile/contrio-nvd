import React, { useState } from "react";
import { Card, Typography, CardContent, Divider, Chip, Box} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import DetailedStageCard from "./DetailedStageCard"

function StageCard({id, stageId, index, title, description, tag, handleSaveCard, handleDeleteCard}) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Box 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <DetailedStageCard id={id} stageId={stageId} title={title} description={description} tag={tag} open={open} handleClose={handleClose} handleSaveCard={handleSaveCard} handleDeleteCard={handleDeleteCard}/>
                    <Card style={{
                    textAlign: 'center',
                    alignContent: 'center',
                    width: '16rem',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100%',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    marginLeft: '8px',
                    marginRight: '8px',
                    marginBottom: '0.5rem',
                    paddingRight: '5px',
                    borderLeft: `5px solid ${tag.color}`}}
                    onClick={handleOpen}>
                    <CardContent>
                        <Typography>
                            {title.length > 45 ? title.substring(0,45) + "..." : title}
                        </Typography>
                        <Divider style={{marginBottom: '0.5rem'}}/>
                        <Typography> 
                            {description.length > 55 ? description.substring(0, 55) + "...": description}
                        </Typography>
                        <Chip size='small' label={tag.label} style={{marginTop: '0.5rem',backgroundColor: `${tag.color}`, color: '#FFF'}}/>
                    </CardContent>
                </Card>
                </Box>
            )}
        </Draggable>
    );
}

export default StageCard;