import { LinearProgress, Typography } from "@mui/material";
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

function Homepage() {
    const RD3Component = rd3.Component;
    const circularProgressSize = 100;
    const daysUntil = 43;
    const projDeadline = '4/14/2022';
    const clientName = Projects[0].client;

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridTemplateRows="repeate(4, 1fr)" gap={5} className='h'>
            <Box gridColumn="span 3" className='h-row0'>
                <ProjectMenuBar className={'h-select-project'} />
            </Box>
            <Box gridColumn="span 9" className='h-row0'>
                <Card className='h-basic-info'>
                    <Typography
                        sx={{
                            fontSize: 25,
                            textAlign: "center",
                            fontWeight: 'bold',
                            paddingTop: 1,
                            paddingBottom: 1
                        }}
                    >Client Name: {clientName}</Typography>
                </Card>
            </Box>
            <Box gridColumn="span 9">
                <Card className='h-progress'>
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
                        <LinearProgress variant='determinate' value={82} bar='' />
                    </Grid>
                    <Grid container className='h-progress-circular-all'>
                        <Grid item xs={3} className='h-progress-circular-individual'>
                            <CircularProgressWithLabel value={100} size={circularProgressSize} />
                            <h3 className='h-progress-circular-individual-title'>Planning</h3>
                        </Grid>
                        <Grid item xs={3} className='h-progress-circular-individual'>
                            <CircularProgressWithLabel value={100} size={circularProgressSize} />
                            <h3 className='h-progress-circular-individual-title'>Design</h3>
                        </Grid>
                        <Grid item xs={3} className='h-progress-circular-individual'>
                            <CircularProgressWithLabel value={100} size={circularProgressSize} />
                            <h3 className='h-progress-circular-individual-title'>Development</h3>
                        </Grid>
                        <Grid item xs={3} className='h-progress-circular-individual'>
                            <CircularProgressWithLabel value={20} size={circularProgressSize} />
                            <h3 className='h-progress-circular-individual-title'>Verification</h3>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
            <Box gridColumn="span 3">
                <Card className='h-enddate'>
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
                            {daysUntil} Days
                        </Typography>
                        <Typography sx={{
                            fontSize: 25,
                            textAlign: "center",
                            fontWeight: 'normal',
                            fontStyle: "italic",
                        }}>
                            {projDeadline}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box gridColumn="span 4">
                <DonutChartHoursSpent />
            </Box>
            <Box gridColumn="span 8">
                <BarChart />
            </Box>
        </Box>
    );
}

export default Homepage;