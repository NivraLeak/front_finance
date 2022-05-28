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
  const [detectChange, setDetectChange] = useState(true);
  const categoryController = new CategoryController();
  const styles = useStyles();
  const loadCategories = async () =>{
    try {
      const response = await categoryController.getAllCategories();
      const categories = [];
      for await (const category of response.data){
        categories.push(category);
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
  },[detectChange]);

  return (
    <div className={styles.tableContainer}>
        <CategoryTable  categoryData={categoryData}
                        categoryController={categoryController}
                        detectChange={detectChange}
                        setDetectChange={setDetectChange}/>
    </div>
  );
}



export default App;
