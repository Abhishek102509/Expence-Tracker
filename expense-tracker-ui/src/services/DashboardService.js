import axios from "axios";
import { getToken } from "./UserService";

export function getFinancialSummary(){
    return axios.get("http://localhost:9700/dashboard",{
        headers:{'Authorization':`Bearer ${getToken()}`}
    });
}