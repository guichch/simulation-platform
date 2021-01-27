import {
    axisSphereX,
    axisSphereY,
    axisSphereZ,
    axisX,
    axisY,
    axisZ
} from './createAxios'

import {viewer} from '../Map/init3dMap'

export const destroyAxios = () => {
    viewer.scene.primitives.remove(axisSphereX)
    viewer.scene.primitives.remove(axisSphereY)
    viewer.scene.primitives.remove(axisSphereZ)
    viewer.scene.primitives.remove(axisX)
    viewer.scene.primitives.remove(axisY)
    viewer.scene.primitives.remove(axisZ)
}