import React, {useState} from 'react';
import {Table,TableContainer, TableHead, TableCell,TableBody, TableRow, Modal, Button,TextField} from '@material-ui/core';
import {Edit,Delete} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';
import {FiscalPositionController} from "../api/FiscalPositionController";

const useStyles = makeStyles((theme) =>({
    categoryContainer:{
        padding:"1em",
        display:"flex",
        position:"relative",
        width:"50%",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center"
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
    const [fiscalPositionData] = props;
    const fiscalPositionController = new FiscalPositionController();
    const styles = useStyles();


    return (
        <div></div>
    );
}

export default FiscalPositionTable;
