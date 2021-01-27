import {
    ScreenSpaceEventHandler,
    Math as CesiumMath,
    ScreenSpaceEventType
} from 'cesium'

import { viewer } from './init3dMap'

export default function(Map) {

    //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
    new ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(movement => {

        let ellipsoid = viewer.scene.globe.ellipsoid;
        let cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);

        if (cartesian) {

            //将笛卡尔坐标转换为地理坐标
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);

            //将弧度转为度的十进制度表示
            let longitude = CesiumMath.toDegrees(cartographic.longitude).toFixed(4);
            let latitude = CesiumMath.toDegrees(cartographic.latitude).toFixed(4);

            //南纬是负，北纬是正，东经是正，西经是负(N北纬 S南纬 E东经 W西经)
            if (latitude < 0) {
                latitude = -latitude + "°S"
            } else if (latitude > 0) {
                latitude = latitude + "°N"
            } else {
                latitude = latitude + "°"
            }

            if (longitude < 0) {
                longitude = -longitude + "°W"
            } else if (longitude > 0) {
                longitude = longitude + "°E"
            } else {
                longitude = longitude + "°"
            }

            //获取相机高度
            let height = Math.ceil(viewer.camera.positionCartographic.height);

            Map.$store.commit({
                type: 'SET_FOOT_STATUS',
                showstatus: true,
                longitude,
                latitude,
                height
            })
        }
    }, ScreenSpaceEventType.MOUSE_MOVE);
}