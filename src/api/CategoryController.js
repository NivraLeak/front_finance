import {API_HOST} from '../utils/Constants';

export class CategoryController{
    constructor() {
        this.name = "categories";
        this.getAllCategories = this.getAllCategories.bind(this);
    }

    getAllCategories = async () =>{
        try {
            const url = `${API_HOST+this.name}/getAll/`;
            const response = await fetch(url);
            return response.json();
        }catch (e){
            throw e;
        }
    }

    addCategory = async (category) =>{
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const url = `${API_HOST+this.name}/create`;
            const raw = JSON.stringify(category);

            const  response = await fetch(url,{
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            })
            return response.json();
        }catch (e){
            throw e;
        }
    }

    updateCategory = async (category, categoryId) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const url = `${API_HOST+this.name}/update/${categoryId}`;
            const raw = JSON.stringify(category);

            const  response = await fetch(url,{
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            })
            return response.json();
        }catch (e){
            throw e;
        }
    }

}
