import { request } from './default'

// import Axios from 'axios'

// const axios = Axios.create({
//     baseURL: import.meta.env.BALOON_API_URL,
//     timeout: 1000,
//     // headers: {'X-Custom-Header': 'foobar'}
//   });

export function fetchGarageRequest(){
    return request({
        url: 'api/admin/garages',
    })

}