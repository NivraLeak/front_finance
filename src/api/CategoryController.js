import {API_HOST} from '../utils/Constants';

export class CategoryController{
    constructor() {
        this.name = "category";
        this.getAllCategories = this.getAllCategories.bind(this);
    }

    getAllCategories = async () =>{
        try {
            const url = `${API_HOST+this.name}/getAll/`;
            const response = await fetch(url,{method:'GET'});
            const data = response.json();
            return data;
        }catch (e){
            throw e;
        }
    }

}
