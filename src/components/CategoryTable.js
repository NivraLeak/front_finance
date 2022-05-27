import React from 'react';
import {Table,TableContainer, TableHead, TableCell,TableBody, TableRow} from '@material-ui/core';
import {Edit,Delete} from "@material-ui/icons"


function CategoryTable(props) {
    const {categoryData} = props;
    return (
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
    );
}

export default CategoryTable;
