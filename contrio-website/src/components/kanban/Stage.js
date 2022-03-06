import React, { useState } from "react";
import { Paper, Box, Typography, Divider, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Droppable } from "react-beautiful-dnd";
import StageCard from "./StageCard";
import AddStageCardForm from "./AddStageCardForm";

function Stage({ id, title, taskIds, tasks, handleAddCard, handleSaveCard, handleDeleteCard}) {
    const [openAddForm, setOpenAddForm] = useState(false);
    const handleOpenAddForm = () => {
        setOpenAddForm(true);
    }
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
    }
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <Paper style={{ marginTop: '1rem'}}>
                    <Box style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                        <Typography style={{marginLeft: '2rem', fontSize: '18px', fontWeight: 'bold'}}>
                            {title}
                        </Typography>
                        <AddStageCardForm stageId={id} open={openAddForm} handleClose={handleCloseAddForm} handleAddCard={handleAddCard}/>
                        <Button style={{ marginLeft: '0.5rem', marginRight: '0.5rem', width: '0.5rem', height: '1.5rem'}} onClick={handleOpenAddForm}>
                            <AddIcon/>
                        </Button>
                    </Box>

                    <Divider />
                    <Box style={{
                        width: '18em',
                        height: '50em',
                        overflow: 'scroll'
                    }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {taskIds.map((taskId, index) => (
                            <StageCard id={taskId} key={taskId} stageId={id} index={index} title={tasks[taskId].title} description={tasks[taskId].description} tag={tasks[taskId].tag} handleSaveCard={handleSaveCard} handleDeleteCard={handleDeleteCard}/>
                        ))}
                        {provided.placeholder}
                    </Box>
                </Paper>
            )}
        </Droppable>
    )
}

export default Stage;