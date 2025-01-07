import axios from "axios";

export const baseUrl = 'http://localhost:5000/api/data'

export const axiosPrivate = axios.create({
    baseURL:baseUrl
})