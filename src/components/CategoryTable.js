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

function CategoryTable(props) {
    const [addModalState, setAddModalState] = useState(false);
    const [updateModalState, setUpdateModalState] = useState(false);
    const [addDataModal,setAddDataModal] = useState({name:'',categoryId:0});
    const categoryController = new CategoryController();
    const {categoryData, setDetectChange,detectChange} = props;
    const styles = useStyles();

    const postCategory = async () =>{
        try {
            const response = await categoryController.addCategory(addDataModal);
            console.log("Respuesta: ", response);
        }catch (e){
            console.log("Error: ", e);
        }
        openCloseInputModal();
        setDetectChange(!detectChange);
    }
    const updateCategory = async () =>{
        console.log("PUT :"+addDataModal.name)
        try {
            const response = await categoryController.updateCategory(addDataModal,addDataModal.categoryId);
            console.log("Respuesta: ", response);
        }catch (e){
            console.log("Error: ", e);
        }
        openCloseUpdateModal();
        setDetectChange(!detectChange);
    }
    const deleteCategory = async (categoryId) =>{
        try {
            const response = await categoryController.deleteCategory(categoryId);
            console.log("Respuesta: ", response);
        }catch (e){
            console.log("Error: ", e);
        }
        setDetectChange(!detectChange);
    }

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
        console.log(addDataModal);
    }
    const selectCategory = (data, caso) =>{
        console.log("CLick",data);
        setAddDataModal(data);
        (caso === 'Edit')&& setUpdateModalState(true);
    }
    const insertBody = (
        <div className={styles.modal}>
            <h3>Agregar nueva categoria</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre categoria" onChange={handleChange}/>

            <div align="right">
                <Button color="primary" onClick={() => postCategory()}>Add</Button>
                <Button onClick={() => openCloseInputModal()}>Cancelar</Button>
            </div>
        </div>
    )
    const editBody = (
        <div className={styles.modal}>
            <h3>Editar categoria</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre categoria" onChange={handleChange} value={addDataModal&&addDataModal.name}/>

            <div align="right">
                <Button color="primary" onClick={() =>updateCategory()}>Edit</Button>
                <Button onClick={() =>openCloseUpdateModal()}>Cancelar</Button>
            </div>
        </div>
    )

    return (
        <>
            <div className={styles.categoryContainer}>
                <Button className={styles.buttonAdd} onClick={() => openCloseInputModal()}>Insertar</Button>
                <TableContainer style={{backgroundColor:"gray", borderStyle:"solid", width:"50%"}}>
                    <Table >
                        <TableHead style={{width:"100px"}}>
                            <TableRow>
                                <TableCell align={"center"}>Category</TableCell>
                                <TableCell align={"center"}>Edit/Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData.map(data=> (
                                <TableRow  key={data.categoryId}>
                                    <TableCell align={"center"}>{data.name}</TableCell>
                                    <TableCell align={"center"}>
                                        <Edit className={styles.icons} onClick={()=>{selectCategory(data,'Edit')}}></Edit>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Delete className={styles.icons} onClick={()=>{deleteCategory(data.categoryId)}} ></Delete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
            <Modal open={addModalState} onClose={ () => openCloseInputModal()}>
                {insertBody}
            </Modal>
            <Modal open={updateModalState} onClose={ () => openCloseUpdateModal()}>
                {editBody}
            </Modal>
        </>
    );
}

export default CategoryTable;
