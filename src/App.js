import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import {CategoryController} from "./api/CategoryController";

function App() {
  const [categoryData,setCategoryData] = useState([]);
  const categoryController = new CategoryController();

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
