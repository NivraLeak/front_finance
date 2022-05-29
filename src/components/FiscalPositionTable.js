import React, {useEffect, useState} from 'react';
import {Table,TableContainer, TableHead, TableCell,TableBody, TableRow, Modal, Button,TextField} from '@material-ui/core';
import {Edit,Delete} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';
import {FiscalPositionController} from "../api/FiscalPositionController";


const useStyles = makeStyles((theme) =>({
    categoryContainer:{
        padding:"1em",
        flex:2,
        width:"100%",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        flexDirection:"column"
    },
    modal: {
        position:'absolute',
        width:"50%",
        backgroundColor: "white",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)'
    },
    icons:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width:"100%"
    },
    buttonAdd:{
        borderStyle:"solid",
        borderRadius:"25%",
        backgroundColor:"black",
        color:"white",
        margin:"1em",
        padding:"1em"
    }
}));

function FiscalPositionTable(props) {
    const [detectChange, setDetectChange] = useState(true);
    const [addModalState, setAddModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);
    const [addDataModal,setAddDataModal] = useState({
        amount: 0,
        categoryId: 0,
        gdp: 0,
        item: '',
        state: '',
        yearBalance: 0,
        fiscalPositionId: 0,
    });
    const {fiscalPositionData,loadFiscalPosition} = props;
    const fiscalPositionController = new FiscalPositionController();
    const styles = useStyles();

    useEffect(() => {
        (async ()=>{
            await loadFiscalPosition();
        })()
    },[detectChange]);

    return (
        <>
            <div className={styles.categoryContainer}>
                <Button className={styles.buttonAdd} onClick={()=>{setDetectChange(!detectChange)}}>Insertar</Button>
                <TableContainer style={{backgroundColor:"gray", borderStyle:"solid", width:"90%"}}>
                    <Table>
                        <TableHead style={{width:"100px"}}>
                            <TableRow>
                                <TableCell align={"center"}>Amount</TableCell>
                                <TableCell align={"center"}>GDP</TableCell>
                                <TableCell align={"center"}>Item</TableCell>
                                <TableCell align={"center"}>State</TableCell>
                                <TableCell align={"center"}>Year Balance</TableCell>
                                <TableCell align={"center"}>Category </TableCell>
                                <TableCell align={"center"}>Edit/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                fiscalPositionData.map(data => (
                                <TableRow key={data.fiscalPositionId}>
                                    <TableCell align={"center"}> {data.amount} </TableCell>
                                    <TableCell align={"center"}> {data.gdp} </TableCell>
                                    <TableCell align={"center"}> {data.item} </TableCell>
                                    <TableCell align={"center"}> {data.state} </TableCell>
                                    <TableCell align={"center"}> {data.yearBalance} </TableCell>
                                    <TableCell align={"center"}> {data.category} </TableCell>
                                    <TableCell align={"center"}>
                                        <Edit className={styles.icons}></Edit>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Delete className={styles.icons}></Delete>
                                    </TableCell>
                                </TableRow>
                            ) )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default FiscalPositionTable;
