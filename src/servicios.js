import axios from 'axios'
const host = 'http://127.0.0.1:8000/';

export const getArticulos = () => {
    try {
        const url = `${host}api/articulos/`;
        return axios.get(
            url, 
            {headers:{
                "accept": "application/json",
                'content-Type': 'application/json',
            }}
        );
    } catch (error) {
        console.error(error);
    }
}

export const addArticulo = (body) => {
    try {
        const url = `${host}api/articulos/`;
        return axios.post(
            url, 
            body,
            {headers:{
                // "accept": "application/json",
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/json',
            }}
        );
    } catch (error) {
        console.error(error);
    }
}

export const getArticulo = (id) => {
    try {
        const url = `${host}api/articulos/${id}`;
        return axios.get(
            url, 
            {headers:{
                "accept": "application/json",
                'content-Type': 'application/json',
            }}
        );
    } catch (error) {
        console.error(error);
    }
}

export const deleteArticulo = (id) => {
    try {
        const url = `${host}api/articulos/${id}`;
        return axios.delete(
            url, 
            {headers:{
                "accept": "application/json",
                'content-Type': 'application/json',
            }}
        );
    } catch (error) {
        console.error(error);
    }
}

export const deleteArticulos = () => {
    try {
        const url = `${host}api/articulos/delete`;
        return axios.delete(
            url, 
            {headers:{
                "accept": "application/json",
                'content-Type': 'application/json',
            }}
        );
    } catch (error) {
        console.error(error);
    }
}