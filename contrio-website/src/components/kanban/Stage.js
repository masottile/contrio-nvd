import React from "react";
import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Droppable } from "react-beautiful-dnd";
import StageCard from "./StageCard";

function Stage({ id, title, taskIds, tasks }) {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <Paper style={{marginTop: '1rem'}}>
                    <Typography style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '0.25rem', alignContent: 'flex-end' }}>
                        {title}
                        <Button variant='contained' size='small' style={{ marginLeft: '2rem' }}>
                            <AddIcon size='small' />
                        </Button>
                    </Typography>

                    <Divider />
                    <Box style={{
                    width: '18em',
                    height: '50em',
                    overflow: 'scroll'
                }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                        {taskIds.map((id, index) => (
                            <StageCard id={id} key={id} index={index} title={tasks[id].title} description={tasks[id].description} category={tasks[id].category} />
                        ))}
                        {provided.placeholder}
                    </Box>
                </Paper>
            )}
        </Droppable>
    )
}

export default Stage;