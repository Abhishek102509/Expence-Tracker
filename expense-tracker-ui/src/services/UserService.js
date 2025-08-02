import axios from "axios";

export function signUp(formData){
    return axios.post("http://localhost:9700/user",formData);
}

export function login(formData){
    return axios.post("http://localhost:9700/user/login",formData);
}

export function storeToken(token){
    localStorage.setItem("user-token",token);
}

export function removeToken(){
    localStorage.removeItem("user-token");
}

export function getToken(){
    return localStorage.getItem("user-token");
}