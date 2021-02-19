import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        method: 'post',
        // timeout: 5000,
        
    });

    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    return instance(config);
}