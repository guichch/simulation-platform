import { request } from './request'
import store from '@/store'

export function getSatImg(satName) {
  return request({
    url: store.state.API_SERVER_URL + "/getSatPic",
    params: { satEname: satName }
  })
}