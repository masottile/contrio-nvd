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
import PublishIcon from '@mui/icons-material/Publish';
import StartIcon from '@mui/icons-material/Start';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Chip, TableHead, TableBody, Table, TableContainer, TableCell, TableRow, TablePagination } from "@mui/material";
import ContractComponent from "../contractComponent/ContractComponent";
import { CONTRACT_STATES } from "./util";
import ViewContext from '../context/ViewContext';
import axios from "axios";


function ViewContractsTable({ user }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [openDetailedContract, setOpenDetailedContract] = useState(false);
    const viewContext = useContext(ViewContext);
    const [selectedFile, setSelectedFile] = useState(null);
    let contracts = viewContext.listContracts;
    const handleViewContractClick = () => {
        setOpenDetailedContract(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        viewContext.setContract({});
    };
    const importData = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            setSelectedFile(files)
            handleSubmitContract();
        };
        input.click();
    }

    const handleSignContract = () => {
        axios.put(`http://127.0.0.1:5000/api/contracts/sign/${user.Username}/${viewContext.currContract.id}`).then((response) => {
            if (response.status === 200) {
                updateListedContracts(response);
            }
        })
        handleClose();
    }

    const handleStartContract = () => {
        axios.put(`http://127.0.0.1:5000/api/contracts/start/${user.Username}/${viewContext.currContract.id}`).then((response) => {
            if (response.status === 200) {
                updateListedContracts(response);
            }
        });
        handleClose();
    }
    const handleSubmitContract = () => {
        axios.put(`http://127.0.0.1:5000/api/contracts/submit/${user.Username}/${viewContext.currContract.id}`).then((response) => {
            if (response.status === 200) {
                updateListedContracts(response);
            }
        });
        handleClose();
    }
    const handleApprove = () => {
        axios.put(`http://127.0.0.1:5000/api/contracts/approve/${user.Username}/${viewContext.currContract.id}`).then((response) => {
            if (response.status === 200) {
                updateListedContracts(response);
            }
        });
        handleClose();
    }

    const updateListedContracts = (response) => {
        const newContractsList = viewContext.listContracts.map((contract) => {
            if (contract.id === viewContext.currContract.id) {
                Object.keys(response.data['Attributes']).forEach((key) => {
                    contract[key] = response.data['Attributes'][key]
                });
            }
            return contract
        });
        viewContext.setAllContracts(newContractsList);
        contracts = newContractsList;
    }


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
                            <TableCell align="center">Signature Date</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            contracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                                <TableRow
                                    key={row.id}
                                    value={row.contract}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">{row.contract.title}</TableCell>
                                    <TableCell align="center">{row.contract.client}</TableCell>
                                    <TableCell align="center">{row.contract.date}</TableCell>
                                    <TableCell align="center">
                                        <Chip size='small' label={CONTRACT_STATES[parseInt(row.contract_state)].label} style={{ marginTop: '0.5rem', backgroundColor: `${CONTRACT_STATES[row.contract_state].color}`, color: '#FFF' }} />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            id="customized-button"
                                            value={row}
                                            aria-controls={open ? 'customized-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            variant="contained"
                                            disableElevation
                                            onClick={(e) => {
                                                setAnchorEl(e.currentTarget);
                                                viewContext.setContract(row)
                                            }}
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
                                            {openDetailedContract && <ContractComponent open={openDetailedContract} handleClose={() => { setOpenDetailedContract(false) }} contractObj={viewContext.currContract} />}
                                            <MenuItem onClick={handleViewContractClick} disableRipple>
                                                <PreviewIcon />
                                                {viewContext.currContract.signed ? "View Contract" : "Edit Contract"}
                                            </MenuItem>

                                            {viewContext.currContract.contract_state === '1' && (
                                                <MenuItem onClick={handleStartContract} disableRipple>
                                                    <StartIcon />
                                                    Start Project
                                                </MenuItem>)
                                            }
                                            {viewContext.currContract.contract_state === '2' && (
                                                <MenuItem onClick={importData} disableRipple>
                                                    <PublishIcon />
                                                    Submit Deliverable
                                                </MenuItem>)
                                            }
                                            {viewContext.currContract.contract_state === '3' && (
                                                <MenuItem onClick={handleApprove} disableRipple>
                                                    <CheckCircleIcon />
                                                    Approve
                                                </MenuItem>)
                                            }
                                            {!viewContext.currContract.signed && (
                                                <MenuItem onClick={handleSignContract} disableRipple>
                                                    <EditIcon />
                                                    Sign Contract
                                                </MenuItem>)
                                            }
                                            {viewContext.currContract.signed && (<MenuItem onClick={handleClose} disableRipple>
                                                <AssessmentIcon />
                                                Generate Kanban Board
                                            </MenuItem>)
                                            }
                                            {viewContext.currContract.contract_state === '4' && (
                                                <>
                                                    <Divider sx={{ my: 0.5 }} />
                                                    <MenuItem onClick={handleClose} disableRipple>
                                                        <ArchiveIcon />
                                                        Archive
                                                    </MenuItem>
                                                </>)
                                            }
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