import * as React from 'react';
import { useEffect, useState } from 'react';
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

const data0 = [
    { region: 'Stage 1: Planning', val: 32 },
    { region: 'Stage 2: Design', val: 21 },
    { region: 'Stage 3: Development', val: 62 },
    { region: 'Stage 3: Verification', val: 14 },
];

const data1 = [
    { region: 'Stage 1: Planning', val: 23 },
    { region: 'Stage 2: Design', val: 11 },
    { region: 'Stage 3: Development', val: 0 },
    { region: 'Stage 3: Verification', val: 0 },
];

const DonutChartHoursSpent = ({ project, setProject }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        setSelected(project);
    }, [])

    return (
        <Paper>
            {project == 0 ?
                (<Chart
                    data={data0}
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
                </Chart>)
                :
                (<Chart
                    data={data1}
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
                </Chart>)
            }

        </Paper>
    );
}

export default DonutChartHoursSpent;

// export default class Demo extends React.PureComponent {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data,
//         };
//     }

//     render() {
//         const { data: chartData } = this.state;

//         return (
//             <Paper>
//                 <Chart
//                     data={chartData}
//                 >
//                     <PieSeries
//                         valueField="val"
//                         argumentField="region"
//                         innerRadius={0.4}
//                     />
//                     <Title
//                         text="Hours Spent Per Stage"
//                     />
//                     <Animation />
//                     <EventTracker />
//                     <Tooltip />
//                     <Legend
//                         position='bottom'
//                     />
//                 </Chart>
//             </Paper>
//         );
//     }
// }
