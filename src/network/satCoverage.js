import { requestGet } from './requestGet'
import store from '@/store'

export function getSatCoverage(satName) {
  return requestGet({
    url: store.state.POST_GIS_SERVER_URL + "/satbeammaxpolygon",
    params: {
      satname: satName
    }
  })
}