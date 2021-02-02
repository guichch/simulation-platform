import {request} from './request'
import store from '@/store'

export function getSatResource() {
  return request({
    method: "post",
    url: store.state.API_SERVER_URL + "/getSatInfo"
  })
}