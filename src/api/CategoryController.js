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

}
