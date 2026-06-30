// src/js/api.js
export const API = "http://localhost:5080/api";

export function getToken() {
    return localStorage.getItem("token");
}

export function requireLogin() {

    if (!getToken()) {
        location.href = "index.html";
        throw new Error("Usuario no autenticado");
    }

}

export function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}
