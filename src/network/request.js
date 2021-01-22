import axios from 'axios'

export function USER_SERVER(config) {
    const instance = axios.create({
        baseURL: 'http://121.31.6.255:8117/sysman-fast/sys',
        timeout: 5000,
        method: 'post'
    });

    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    return instance(config);
}