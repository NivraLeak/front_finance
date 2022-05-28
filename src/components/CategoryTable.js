import React, {useState} from 'react';
import {Table,TableContainer, TableHead, TableCell,TableBody, TableRow, Modal, Button,TextField} from '@material-ui/core';
import {Edit,Delete} from "@material-ui/icons";
import {makeStyles} from '@material-ui/core/styles';
import {CategoryController} from "../api/CategoryController";
const useStyles = makeStyles((theme) =>({
    categoryContainer:{
        padding:"1em",
        display:"flex",
        position:"relative",
        width:"100%",
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

function CategoryTable(props) {
    const [modalState, setModalState] = useState(false);
    const categoryController = new CategoryController();
    const [dataModal,setDataModal] = useState({
        name:''
    });
    const {categoryData} = props;
    const styles = useStyles();

    const postCategory = async (category) =>{
        try {
            const response = await categoryController.addCategory(category);
            response.then(value =>{
                console.log("Value: " + value)
            })
        }catch (e){
            console.log("Error: ", e);
        }
    }

    const openCloseInputModal= () =>{
        setModalState(!modalState);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataModal(prevState => ({
            ...prevState,
            [name]:value
        }));
        console.log(dataModal);
    }

    const insertBody = (
        <div className={styles.modal}>
            <h3>Agregar nueva categoria</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre categoria" onChange={handleChange}/>

            <div align="right">
                <Button color="primary" onClick={postCategory}>Add</Button>
                <Button onClick={openCloseInputModal}>Cancelar</Button>
            </div>
        </div>
    )
    return (
        <>
            <div className={styles.categoryContainer}>
                <Button className={styles.buttonAdd} onClick={openCloseInputModal}>Insertar</Button>
                <TableContainer style={{backgroundColor:"gray", borderStyle:"solid", width:"20%"}}>
                    <Table >
                        <TableHead style={{width:"100px"}}>
                            <TableRow>
                                <TableCell align={"center"}>Category</TableCell>
                                <TableCell align={"center"}>Edit/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map(consola => (
                                <TableRow  key={consola.categoryId}>
                                    <TableCell align={"center"}>{consola.name}</TableCell>
                                    <TableCell align={"center"}>
                                        <Edit></Edit>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Delete></Delete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
            <Modal open={modalState} onClose={openCloseInputModal}>
                {insertBody}
            </Modal>
        </>
    );
}

export default CategoryTable;
