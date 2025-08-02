import axios from "axios";
import { getToken } from "./UserService";



export function saveExpense(formData){
    const token = getToken();
    return axios.post("http://localhost:9700/expense",formData,{
        headers:{'Authorization':`Bearer ${token}`}
    });
}

export function getExpenses(){
    const token = getToken();
    return axios.get("http://localhost:9700/expense",{
        headers:{'Authorization':`Bearer ${token}`}
    });
}





export function deleteExpense(id) {
    const token = getToken();
    return axios.delete(`http://localhost:9700/expense/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}



export function updateExpense(id, formData) {
    const token = getToken();
    return axios.put(`http://localhost:9700/expense/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}