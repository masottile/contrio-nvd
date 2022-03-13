import React, { useState } from "react";
import { Paper } from "@mui/material";
import Stage from "../components/kanban/Stage";
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const testData = {
    'project-1': {
        'phases': {
            'backlog-1': {
                'id': 'backlog-1',
                'name': 'Backlog',
                'tasks': {
                    'backlog-task-1': {
                        'title': 'Stream19 Scope Project',
                        'description': 'Discuss project scope proposal and deliverables with John',
                        'tag': {
                            label: "Scope",
                            color: "#ADD8E6",
                        }
                    },
                },
                'taskIds': ['backlog-task-1']
            },
            'design-1': {
                'id': 'design-1',
                'name': 'Design',
                'tasks': {
                    'design-task-1': {
                        'title': 'Maple Gifts System Diagram',
                        'description': 'Plan out system diagram and new services for the project',
                        'tag': {
                            label: "Feature",
                            color: "#0075ca",
                        }
                    },
                    'design-task-2': {
                        'title': 'B3nd3r Database Table Schema',
                        'description': 'Decide on Table Schema for optimal customer data storage',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'design-task-3': {
                        'title': 'B3nd3r Data Entry Portal Mock-Up',
                        'description': 'Sketch mock-up for data entry portal with all fields and different images for the click-through flow',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    }
                },
                'taskIds': ['design-task-1', 'design-task-2', 'design-task-3']
            },
            'build-1': {
                'id': 'build-1',
                'name': 'Build',
                'tasks': {
                    'build-task-1': {
                        'title': 'Maple Gifts Email Forwarding Implementation',
                        'description': 'Backend Forwarding to existing accounts',
                        'tag': {
                            label: "Feature",
                            color: "#0075ca",
                        }
                    },
                    'build-task-2': {
                        'title': 'B3nd3r Database Migration',
                        'description': 'Convert existing stored data into the new DB schema and add it to the DB',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'build-task-3': {
                        'title': 'B3nd3r Data Entry Portal Build',
                        'description': 'Implement Frontend for the new Data Entry Portal',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'build-task-4': {
                        'title': 'B3nd3r Frontend-Backend Connection through APIs',
                        'description': 'Set up the APIs to integrate the Entry Portal frontend with the Database Backend',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                },
                'taskIds': ['build-task-1', 'build-task-2', 'build-task-3', 'build-task-4']
            },
            'test-1': {
                'id': 'test-1',
                'name': 'Test',
                'tasks': {
                    'test-task-1': {
                        'title': 'Maple Gifts Stress and Security test new email connection',
                        'description': 'Test with malformed input and identify attack surface. Make any necessary changes to fix bugs found.',
                        'tag': {
                            label: "Blocked",
                            color: "#e4e669",
                        }
                    },
                    'test-task-2': {
                        'title': 'B3nd3r Data Collection Stress and Security Test',
                        'description': 'Test with malformed input and identify attack surface. Make any necessary changes to fix bugs found.',
                        'tag': {
                            label: "Blocked",
                            color: "#e4e669",
                        }
                    },
                },
                'taskIds': ['test-task-1', 'test-task-2']
            },
            'finished-1': {
                'id': 'finished-1',
                'name': 'Finished',
                'tasks': {
                    'finished-task-1': {
                        'title': 'B3nd3r Data Collection System Diagram',
                        'description': 'Layout all necessary components and how they will be connected for the new Data Collection and Storage System',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff" ,
                        }
                    },
                },
                'taskIds': ['finished-task-1']
            },
        }
    }
}

function ProjectsPage() {
    const projectId = 'project-1';
    const phases = testData[projectId]['phases'];
    const [stages, setStages] = useState(phases);

    const handleAddCard = (stageId, card) => {
        const uuid = uuidv4();
        const newStage = {
            ...stages[stageId]
        }

        newStage['tasks'][uuid] = card;
        newStage['taskIds'].push(uuid);

        const newstages = {
            ...stages,
            [stageId]: newStage,
        }

        setStages(newstages);
    }

    const handleSaveCard = (stageId, cardId, card) => {
        const newStage = {
            ...stages[stageId]
        }

        newStage['tasks'][cardId] = card;

        const newstages = {
            ...stages,
            [stageId]: newStage,
        }

        setStages(newstages);
    }

    const handleDeleteCard = (stageId, cardId) => {
        const newStage = {
            ...stages[stageId]
        }
        const newTaskIds = newStage['taskIds'].filter(taskId => taskId !== cardId);

        delete newStage['tasks'][cardId];
        newStage['taskIds'] = newTaskIds;

        const newstages = {
            ...stages,
            [stageId]: newStage,
        }

        setStages(newstages);
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const task = stages[source.droppableId]['tasks'][draggableId];
        const sourceColumn = stages[source.droppableId];
        const destColumn = stages[destination.droppableId];
        const sourceTaskIds = sourceColumn.taskIds;
        const destTaskIds = destColumn.taskIds;

        sourceTaskIds.splice(source.index, 1);
        delete sourceColumn['tasks'][draggableId]

        destTaskIds.splice(destination.index, 0, draggableId);
        destColumn['tasks'][draggableId] = task;

        const newSourceColumn = {
            ...sourceColumn,
            taskIds: sourceTaskIds,
        };

        const newDestinationColumn = {
            ...destColumn,
            taskIds: destTaskIds,
        }

        const newstages = {
            ...stages,
            [newSourceColumn.id]: newSourceColumn,
            [newDestinationColumn.id]: newDestinationColumn,
        }
        setStages(newstages);
    }
    return (
        <Paper style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        }}>
            <DragDropContext
                onDragEnd={onDragEnd}>
                {Object.values(stages).map((stage) => (
                    <Stage id={stage.id} title={stage.name} tasks={stage.tasks} taskIds={stage.taskIds} handleAddCard={handleAddCard} handleSaveCard={handleSaveCard} handleDeleteCard={handleDeleteCard}/>
                ))
                }
            </DragDropContext>
        </Paper>
    );
}

export default ProjectsPage;