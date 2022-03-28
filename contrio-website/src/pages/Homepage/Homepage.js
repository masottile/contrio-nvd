import { useEffect, useState } from 'react';
import { autocompleteClasses, LinearProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import CircularProgressWithLabel from "../CircularProgressWithLabel";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react";
import './homepage.css'
import Box from '@mui/material/Box';
import ProjectMenuBar from "./ProjectMenuBar";
import { Projects } from "../../Project/Projects";
import rd3 from 'react-d3-library';
import DonutChartHoursSpent from "./DonutChartHoursSpent";
import BarChart from "./BarChart";
import ProjectSelect from "../../images/select.gif"
import arrow from "../../images/arrow.gif"
import defaultSelect from "../../images/default-select.gif"
import defaultProject from "../../images/default-project.gif"
import defaultSelectProject from "../../images/default-select-project.gif"

function Homepage() {
    const defaultProjectState = -1;
    const [project, setProject] = useState(defaultProjectState);
    const RD3Component = rd3.Component;
    const circularProgressSize = 100;
    const daysUntil = 43;
    const projDeadline0 = '4/14/2022';
    const projDeadline1 = '12/4/2022';

    console.log(project);

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridTemplateRows="repeat(4, 1fr)" gap={5} className='h' alignItems="center" justifyContent="center">
            <Box gridColumn="span 3" className='h-row0'>
                <ProjectMenuBar className={'h-select-project'} project={project} setProject={setProject} />
            </Box>
            {project == -1 ?
                (
                    <>
                        <Box gridColumn="span 9" className='h-row0'>
                            <img src={arrow} style={{
                                width: 55,
                                alignSelf: 'right',
                            }} />
                        </Box>
                        <Box gridColumn="span 7">
                            <img src={ProjectSelect} style={{
                                width: 1000,
                                alignSelf: 'center',
                            }} />
                        </Box>
                        <Box gridColumn="span 5">
                                <img src={defaultSelectProject} style={{
                                    height: 150
                                }}/>
                        </Box>
                    </>

                )
                :
                (<>
                    <Box gridColumn="span 9" className='h-row0'>
                    </Box>
                    <Box gridColumn="span 9">
                        <Card className='h-progress' sx={{ boxShadow: 4 }}>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    fontWeight: 'bold',
                                    paddingTop: 2,
                                    paddingBottom: 2
                                }}>
                                    Project Stage
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className='h-progress-linear'>
                                {project == 0 ?
                                    (<LinearProgress variant='determinate' value={82} bar='' />)
                                    :
                                    (<LinearProgress variant='determinate' value={34} bar='' />)
                                }
                            </Grid>
                            <Grid container className='h-progress-circular-all'>
                                <Grid item xs={3} className='h-progress-circular-individual'>
                                    {project == 0 ? (<CircularProgressWithLabel value={100} size={circularProgressSize} />) : (<CircularProgressWithLabel value={100} size={circularProgressSize} />)}
                                    <h3 className='h-progress-circular-individual-title'>Planning</h3>
                                </Grid>
                                <Grid item xs={3} className='h-progress-circular-individual'>
                                    {project == 0 ? (<CircularProgressWithLabel value={100} size={circularProgressSize} />) : (<CircularProgressWithLabel value={23} size={circularProgressSize} />)}
                                    <h3 className='h-progress-circular-individual-title'>Design</h3>
                                </Grid>
                                <Grid item xs={3} className='h-progress-circular-individual'>
                                    {project == 0 ? (<CircularProgressWithLabel value={100} size={circularProgressSize} />) : (<CircularProgressWithLabel value={0} size={circularProgressSize} />)}
                                    <h3 className='h-progress-circular-individual-title'>Development</h3>
                                </Grid>
                                <Grid item xs={3} className='h-progress-circular-individual'>
                                    {project == 0 ? (<CircularProgressWithLabel value={24} size={circularProgressSize} />) : (<CircularProgressWithLabel value={0} size={circularProgressSize} />)}
                                    <h3 className='h-progress-circular-individual-title'>Verification</h3>
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>
                    <Box gridColumn="span 3">
                        <Card className='h-enddate' sx={{ boxShadow: 4 }}>
                            <CardContent sx={{
                                padding: 6
                            }}>
                                <Typography sx={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    fontWeight: 'bold',
                                }}>
                                    Project Deadline
                                </Typography>
                                <Typography sx={{
                                    fontSize: 60,
                                    textAlign: "center",
                                    fontWeight: 'bold',
                                    color: '#78A2CC'
                                }}>
                                    {project == 0 ? ("43 ") : ("88 ")}
                                    Days
                                </Typography>
                                <Typography sx={{
                                    fontSize: 25,
                                    textAlign: "center",
                                    fontWeight: 'normal',
                                    fontStyle: "italic",
                                }}>
                                    {project == 0 ? (projDeadline0) : (projDeadline1)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box gridColumn="span 4">
                        <Card sx={{ boxShadow: 4 }}>
                            <DonutChartHoursSpent key={project} project={project} setProject={setProject} />

                        </Card>
                    </Box>
                    <Box gridColumn="span 8">
                        <Card sx={{ boxShadow: 4 }}>
                            <BarChart key={project} project={project} setProject={setProject} />
                        </Card>

                    </Box>
                </>)
            }
        </Box >
    );
}

export default Homepage;