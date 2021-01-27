
import {
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
} from 'cesium'

import {
    isDownAxios,
    isDownScaleAxios,
    isDownRotateAxios
} from './ModelEventType'

import {viewer} from '@/assets/js/Map/init3dMap'


export default (model,store) => {
    const handler = new ScreenSpaceEventHandler(viewer.canvas)
    handler.setInputAction((movement) => {

        let x = movement.startPosition.x - movement.endPosition.x
        let y = movement.startPosition.y - movement.endPosition.y

        if (isDownRotateAxios.rx) {
            let rx = store.state.model.rotate.x
            store.commit('CHANGE_ROTATE_X',rx+=(x + y)*-1)
        }

        if (isDownRotateAxios.ry) {
            let ry = store.state.model.rotate.y
            store.commit('CHANGE_ROTATE_Y',ry+=(x + y))
        }

        if (isDownRotateAxios.rz) {
            let rz = store.state.model.rotate.z
            store.commit('CHANGE_ROTATE_Z',rz+=(x + y))
        }

        if (isDownScaleAxios.sy || isDownScaleAxios.sz) {
            let scalenum = store.state.model.scale.x
            store.commit('CHANGE_SCALE_X', scalenum+= (x + y))
        }

        if(isDownScaleAxios.sx){
            let scalenum = store.state.model.scale.x
            store.commit('CHANGE_SCALE_X', scalenum+= (x + y)*-1)
        }

        if (isDownAxios.tx) {
            let tx = store.state.model.position.x
            store.commit('CHANGE_POSITION_X',tx+=(x + y)*-1)
        }

        if (isDownAxios.ty) {
            let ty = store.state.model.position.y
            store.commit('CHANGE_POSITION_Y',ty+=(x + y))
        }

        if (isDownAxios.tz) {
            let tz = store.state.model.position.z
            store.commit('CHANGE_POSITION_Z',tz+=(x + y)*10000)
        }
    }, ScreenSpaceEventType.MOUSE_MOVE)
}