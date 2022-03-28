import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    PieSeries,
    Title,
    Tooltip,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
    { region: 'Stage 1: Planning', val: 32 },
    { region: 'Stage 2: Design', val: 21 },
    { region: 'Stage 3: Development', val: 62 },
    { region: 'Stage 3: Verification', val: 14 },
];

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={chartData}
                >
                    <PieSeries
                        valueField="val"
                        argumentField="region"
                        innerRadius={0.4}
                    />
                    <Title
                        text="Hours Spent Per Stage"
                    />
                    <Animation />
                    <EventTracker />
                    <Tooltip />
                    <Legend 
                        position='bottom'
                    />
                </Chart>
            </Paper>
        );
    }
}
