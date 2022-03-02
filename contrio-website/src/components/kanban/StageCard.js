import React from "react";
import { Card, Typography, CardContent, Divider, Chip, Box} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";


function StageCard({id, index, title, description, category}) {

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Box 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                    <Card style={{
                    textAlign: 'center',
                    alignContent: 'center',
                    width: '95%',
                    display: 'flex',
                    maxHeight: '100%',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    marginLeft: '8px',
                    marginRight: '8px',
                    marginBottom: '0.5rem',
                    paddingRight: '5px',
                    borderLeft: '5px solid red'}}
                    >
                    <CardContent>
                        <Typography>
                            {title}
                        </Typography>
                        <Divider style={{marginBottom: '0.5rem'}}/>
                        <Typography> 
                            {description}
                        </Typography>
                        <Chip size='small' label={category} style={{marginTop: '0.5rem',backgroundColor: 'red', color: '#FFF'}}/>
                    </CardContent>
                </Card>
                </Box>
            )}
        </Draggable>
    );
}

export default StageCard;