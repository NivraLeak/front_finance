import './App.css';
import React, {useEffect, useState} from "react";
import {CategoryController} from "./api/CategoryController";
import CategoryTable from "./components/CategoryTable";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableContainer:{
    margin:'1em',
  }
}))
function App() {
  const [categoryData,setCategoryData] = useState([]);
  const categoryController = new CategoryController();
  const styles = useStyles();
  const loadCategories = async () =>{
    try {
      const response = await categoryController.getAllCategories();
      const categories = [];
      for await (const category of response.data){
        categories.push(category);
        console.log("Categoria: ",category)
      }
      setCategoryData(categories);
    }catch (e){
      console.log("Error: ", e);
    }
  }


  useEffect(() => {
    (async ()=>{
      await loadCategories();
    })()
  },[]);

  return (
    <div className={styles.tableContainer}>
        <CategoryTable  categoryData={categoryData} categoryController={categoryController}/>
    </div>
  );
}



export default App;
