import { request } from './request'
import store from '@/store'

export function getEarthList(operator) {
  return request({
    url: store.state.API_SERVER_URL + "/getSatTeleport",
    params: {
      teleportOperator: JSON.stringify(operator)
    }
  })
}