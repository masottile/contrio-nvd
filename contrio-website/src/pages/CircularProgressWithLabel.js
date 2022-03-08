import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

const CircularProgressWithLabel = (props) => {
    const currPercentage = "" + props.value;

    function Status(p) {
        const status = Math.round(p.status);
        if (status == 100) {
            return <CheckIcon/>;
        }
        else {
            return (
                <Typography variant="caption" component="div" color="text.secondary" style={{fontSize : '20px'}}>
                    {status + "%"}
                </Typography>
            )
        }
    }

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={props.value} size={props.size} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Status status={currPercentage}/>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel