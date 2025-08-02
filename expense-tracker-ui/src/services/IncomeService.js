import axios from "axios";
import { getToken } from "./UserService";

export function saveIncome(formData){
    const token = getToken();
    return axios.post("http://localhost:9700/income",formData,{
        headers:{'Authorization':`Bearer ${token}`}
    });
}

export function getIncomes(){
    const token = getToken();
    return axios.get("http://localhost:9700/income",{
        headers:{'Authorization':`Bearer ${token}`}
    });
}




export function deleteIncome(id) {
    const token = getToken();
    return axios.delete(`http://localhost:9700/income/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}




export function updateIncome(id, formData) {
    const token = getToken();
    return axios.put(`http://localhost:9700/income/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}