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
    const [addDataModal,setAddDataModal] = useState(null);
    const {fiscalPositionData,loadFiscalPosition} = props;
    const fiscalPositionController = new FiscalPositionController();
    const styles = useStyles();
    const openCloseInputModal= () =>{
        setAddModalState(!addModalState);
    }
    const openCloseUpdateModal= () =>{
        setUpdateModalState(!updateModalState);
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddDataModal(prevState => ({
                ...prevState,
                [name]: value
            }
        ));
    }
    const selectRow = (data, caso) =>{
        setAddDataModal(data);
        (caso === 'Edit')&& setUpdateModalState(true);
    }

    const addFiscalPosition = async () =>{
        try {
            const response = await fiscalPositionController.addFiscalPosition(addDataModal);
            console.log("Respuesta add Fiscal Position: ", response);
            console.log("Add data modal fiscal: ", addDataModal);

        }catch (e){
            console.log("Error: ", e);
        }
        openCloseInputModal();
        setDetectChange(!detectChange);
    }

    useEffect(() => {
        (async ()=>{
            await loadFiscalPosition();
        })()
    },[detectChange]);

    const insertBody = (
        <div className={styles.modal}>
            <h3>Agregar nueva posicion de fiscal</h3>
            <TextField name="amount" className={styles.inputMaterial} label="Amount" onChange={handleChange}/>
            <TextField name="gdp" className={styles.inputMaterial} label="Gdp" onChange={handleChange}/>
            <TextField name="item" className={styles.inputMaterial} label="Item" onChange={handleChange}/>
            <TextField name="state" className={styles.inputMaterial} label="State" onChange={handleChange}/>
            <TextField name="yearBalance" className={styles.inputMaterial} label="YearBalance" onChange={handleChange}/>
            <TextField name="categoryId" className={styles.inputMaterial} label="Category" onChange={handleChange}/>
            <div align="right">
                <Button color="primary" onClick={()=>addFiscalPosition()}>Add</Button>
                <Button onClick={() => openCloseInputModal()}>Cancelar</Button>
            </div>
        </div>
    )

    return (
        <>
            <div className={styles.categoryContainer}>
                <Button className={styles.buttonAdd} onClick={()=>{openCloseInputModal()}}>Insertar</Button>
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
            <Modal open={addModalState} onClose={ () => openCloseInputModal()}>
                {insertBody}
            </Modal>
        </>
    );
}

export default FiscalPositionTable;
