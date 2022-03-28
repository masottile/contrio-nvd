import { useState } from "react";
import Paper from '@mui/material/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Title,
    BarSeries,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { useEffect } from "react";
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

// const data = [
//     { argument: 'Monday', value: 30 },
//     { argument: 'Tuesday', value: 20 },
//     { argument: 'Wednesday', value: 10 },
//     { argument: 'Thursday', value: 50 },
//     { argument: 'Friday', value: 60 },
// ];

const BarChart = ( { project, setProject } ) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        setSelected(project);
    }, [])

    const data0 = [
        { argument: 'Monday', value: 5 },
        { argument: 'Tuesday', value: 12 },
        { argument: 'Wednesday', value: 6 },
        { argument: 'Thursday', value: 7 },
        { argument: 'Friday', value: 8 },
        { argument: 'Saturday', value: 3 },
        { argument: 'Sunday', value: 2 },
    ]

    const data1 = [
        { argument: 'Monday', value: 5 },
        { argument: 'Tuesday', value: 6 },
        { argument: 'Wednesday', value: 6 },
        { argument: 'Thursday', value: 2 },
        { argument: 'Friday', value: 0 },
        { argument: 'Saturday', value: 0 },
        { argument: 'Sunday', value: 0 },
    ]

    return (
        <Paper>
            {project == 0 ? (<Chart
                data={data0}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries valueField="value" argumentField="argument" />

                <Title text="Daily Productivity Tracker" />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>) : 
            (<Chart
                data={data1}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries valueField="value" argumentField="argument" />

                <Title text="Daily Productivity Tracker" />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>)}
            
        </Paper>
    );
}

export default BarChart;