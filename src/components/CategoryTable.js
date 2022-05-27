import React from 'react';
import {Table,TableContainer, TableHead, TableCell,TableBody, TableRow} from '@material-ui/core';
import ReactDOM from 'react-dom';
function CategoryTable(props) {
    const {categoryData} = props;
    return (
            <TableContainer style={{backgroundColor:"gray", borderStyle:"solid", width:"15%"}}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                        </TableRow>
                        <TableBody>
                            {categoryData.map(consola => (
                                <TableRow style={{backgroundColor:"red"}} key={consola.categoryId}>
                                    <TableCell align={"center"} >{consola.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableHead>
                </Table>
            </TableContainer>
    );
}

export default CategoryTable;
