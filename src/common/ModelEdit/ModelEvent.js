import {
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    defined
} from 'cesium'

import {viewer} from '@/assets/js/Map/init3dMap'

import {
    isDownAxios,
    isDownScaleAxios,
    isDownRotateAxios,
    axiosNamesMap
} from './ModelEventType'

import MouseEvent from './ModelMoveEvent'

import { setModel } from './Model'

export default (model,store) => {
    setModel(model)
    const handler = new ScreenSpaceEventHandler(viewer.canvas)

    handler.setInputAction((movement)=>{
        var pick = viewer.scene.pick(movement.position);
        if (defined(pick)) {
            if(axiosNamesMap[pick.id]){
                isDownAxios[axiosNamesMap[pick.id]] = true
                isDownScaleAxios[axiosNamesMap[pick.id]] = true
                isDownRotateAxios[axiosNamesMap[pick.id]] = true
                viewer.scene.screenSpaceCameraController.enableRotate = false
                viewer.scene.screenSpaceCameraController.enableTranslate = false
            }
        }
    },ScreenSpaceEventType.LEFT_DOWN)

    MouseEvent(model,store)

    handler.setInputAction(()=>{
        isDownAxios.tx = false
        isDownAxios.ty = false
        isDownAxios.tz = false
        isDownScaleAxios.sx = false
        isDownScaleAxios.sy = false
        isDownScaleAxios.sz = false
        isDownRotateAxios.rx = false
        isDownRotateAxios.ry = false
        isDownRotateAxios.rz = false
        viewer.scene.screenSpaceCameraController.enableRotate = true
        viewer.scene.screenSpaceCameraController.enableTranslate = true
    },ScreenSpaceEventType.LEFT_UP)
}