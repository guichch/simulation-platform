import axios from 'axios'

export function requestGet(config) {
    const instance = axios.create({
        method: 'get',
        // timeout: 5000,
        
    });

    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    return instance(config);
}