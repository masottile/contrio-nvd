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

const BarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(
            [
                { argument: 'Monday', value: 5 },
                { argument: 'Tuesday', value: 12 },
                { argument: 'Wednesday', value: 6 },
                { argument: 'Thursday', value: 7 },
                { argument: 'Friday', value: 8 },
                { argument: 'Saturday', value: 3 },
                { argument: 'Sunday', value: 2 },
            ]
        )
    }, []);

    return (
        <Paper>
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries valueField="value" argumentField="argument" />

                <Title text="Daily Productivity Tracker" style={{fontSize: 200}}/>
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        </Paper>
    );
}

export default BarChart;