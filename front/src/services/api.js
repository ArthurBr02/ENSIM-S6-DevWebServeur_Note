import axios from 'axios'
const API_URL = import.meta.env.VITE_BACKEND_URL

export class Api {
    constructor(secured = false) {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        if (secured) {
            this.api.interceptors.request.use(
                config => {
                    const token = localStorage.getItem('token')
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                    return config
                },
                error => {
                    return Promise.reject(error)
                }
            )
        }
    }

    async get(url) {
        return this.api.get(url)
    }

    async post(url, data = {}, options = {}) {
        return this.api.post(url, data, options)
    }

    async put(url, data = {}, options = {}) {
        return this.api.put(url, data)
    }

    async delete(url) {
        return this.api.delete(url)
    }

}