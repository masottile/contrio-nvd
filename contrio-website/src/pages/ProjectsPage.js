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
                        'title': 'Backlog Title Task Name',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
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
                        'title': 'Design Title Task Name 1',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'design-task-2': {
                        'title': 'Design Title Task Name 2',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'design-task-3': {
                        'title': 'Design Title Task Name 3',
                        'description': 'Short Description explaining work that needs to be done',
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
                        'title': ' Build Title Task Name 1',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'build-task-2': {
                        'title': 'Build Title Task Name 2',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                    'build-task-3': {
                        'title': 'Build Title Task Name 3',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
                        }
                    },
                },
                'taskIds': ['build-task-1', 'build-task-2', 'build-task-3']
            },
            'test-1': {
                'id': 'test-1',
                'name': 'Test',
                'tasks': {
                    'test-task-1': {
                        'title': 'Title Task Name',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Blocked",
                            color: "#e4e669",
                        }
                    },
                    'test-task-2': {
                        'title': 'Title Task Name',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Blocked",
                            color: "#e4e669",
                        }
                    },
                    'test-task-3': {
                        'title': 'Title Task Name',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Blocked",
                            color: "#e4e669",
                        }
                    },
                },
                'taskIds': ['test-task-1', 'test-task-2', 'test-task-3']
            },
            'finished-1': {
                'id': 'finished-1',
                'name': 'Finished',
                'tasks': {
                    'finished-task-1': {
                        'title': 'Finished Title Task Name',
                        'description': 'Short Description explaining work that needs to be done',
                        'tag': {
                            label: "Feature",
                            color: "#7057ff",
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