import {API_HOST} from '../utils/Constants';

export class FiscalPositionController {
    constructor() {
        this.name = "position";
        this.getAllFiscalPosition = this.getAllFiscalPosition.bind(this);
        this.addFiscalPosition = this.addFiscalPosition.bind(this);
        this.updateFiscalPosition = this.updateFiscalPosition.bind(this);
        this.deleteFiscalPosition = this.deleteFiscalPosition.bind(this);
    }

    getAllFiscalPosition = async () =>{
        try {
            const url = `${API_HOST+this.name}/getAll/`;
            const response = await fetch(url);
            return response.json();
        }catch (e){
            throw e;
        }
    }
    addFiscalPosition = async (fiscalPosition) =>{
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const url = `${API_HOST+this.name}/create`;
            const raw = JSON.stringify(fiscalPosition);

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
    updateFiscalPosition = async (fiscalPosition, fiscalPositionId) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const url = `${API_HOST+this.name}/update/${fiscalPositionId}`;
            const raw = JSON.stringify(fiscalPosition);

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
    deleteFiscalPosition = async (fiscalPositionId) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const url = `${API_HOST+this.name}/delete/${fiscalPositionId}`;

            const  response = await fetch(url,{
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            })
            return response.json();
        }catch (e){
            throw e;
        }
    }
}

