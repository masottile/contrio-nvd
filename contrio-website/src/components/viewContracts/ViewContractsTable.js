import React, { useState, useContext } from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import PreviewIcon from '@mui/icons-material/Preview';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Chip, TableHead, TableBody, Table, TableContainer, TableCell, TableRow, TablePagination } from "@mui/material";

import { CONTRACT_STATES } from "./util";
import ViewContext from '../ViewContext';


const testData = () => {
    let retArr = [];
    for (let i = 0; i < 11; i++) {
        retArr.push({
            id: i,
            contract: {
                title: "Contract " + i.toString(),
                client: "Smith Inc " + i.toString(),
                date: new Date().toISOString().toString().split("T")[0],
                totalValue: "$100000 CAD"
            },
            state: CONTRACT_STATES[i % 6]
        })
    }
    return retArr;
}


function ViewContractsTable() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const viewContext = useContext(ViewContext);
    // const contracts = testData();
    const contracts = viewContext.listContracts;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event);
        console.log(event.target)
        // console.log(rowid)
    };
    const handleClose = () => {
        setAnchorEl(null);
        // setContractID("");
    };
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    // console.log(allContracts)
    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Client</TableCell>
                            <TableCell align="center">Agreement Date</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            contracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">{row.contract.title}</TableCell>
                                    <TableCell align="center">{row.contract.client}</TableCell>
                                    <TableCell align="center">{row.contract.date}</TableCell>
                                    <TableCell align="center">
                                        {/* <Chip size='small' label={row.state.label} style={{ marginTop: '0.5rem', backgroundColor: `${row.state.color}`, color: '#FFF' }} /> */}
                                        <Chip size='small' label={CONTRACT_STATES[0].label} style={{ marginTop: '0.5rem', backgroundColor: `${CONTRACT_STATES[0].color}`, color: '#FFF' }} />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            id="customized-button"
                                            // key={row.id}
                                            aria-controls={open ? 'customized-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            variant="contained"
                                            disableElevation
                                            // onClick={handleClick}
                                            onClick={(e) => {setAnchorEl(e.currentTarget);
                                                viewContext.setContractID(row.id);
                                                console.log(e.target)
                                                console.log(row.id)}}
                                            endIcon={<KeyboardArrowDownIcon />}
                                        >
                                            Options
                                        </Button>
                                        <StyledMenu
                                            id="customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'customized-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose} disableRipple>
                                                <PreviewIcon />
                                                View Contract
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} disableRipple>
                                                <AssessmentIcon />
                                                Generate Kanban Board
                                            </MenuItem>
                                            <Divider sx={{ my: 0.5 }} />
                                            <MenuItem onClick={handleClose} disableRipple>
                                                <ArchiveIcon />
                                                Archive
                                            </MenuItem>
                                            <MenuItem onClick={handleClose} disableRipple>
                                                <MoreHorizIcon />
                                                More
                                            </MenuItem>
                                        </StyledMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={contracts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
}

export default ViewContractsTable;