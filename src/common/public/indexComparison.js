import * as Cesium from 'cesium'
import { viewer } from "../Map/init3dMap"
// import { Lmap } from "../Map/init2dMap"
export const AbilityCompareState = (JCNL_Data, obj, movement, mapType) => {
    console.log(obj)
    if (mapType == "3dmap") {
        JCNL_Data.forEach((row) => {
            let ellipsoid = viewer.scene.globe.ellipsoid;
            let cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
            //将笛卡尔坐标转换为地理坐标
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            //将弧度转为度的十进制度表示
            let longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            //星地距离
            let distance = (42164.6 * Math.sqrt(1.023 - 0.302 * Math.cos((longitude - row.satPosition) * Math.PI / 180) * Math.cos(latitude * Math.PI / 180))).toFixed(4);
            //仰角
            let elevation = (Math.atan(Math.cos((longitude - row.satPosition) * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) - 0.1512695 / Math.sqrt(1 - Math.pow(Math.cos((longitude - row.satPosition) * Math.PI / 180) * Math.cos(latitude * Math.PI / 180), 2))) * 180 / Math.PI).toFixed(4);
            //方位角
            let azimuth = (Math.atan(Math.tan((longitude - row.satPosition) * Math.PI / 180) / Math.sin(latitude)) * 180 / Math.PI).toFixed(4);
            row.yj = elevation;
            row.fwj = azimuth;
            row.xdjl = distance;
        })

        obj.activeNameWXLB = "first"
        obj.$nextTick(() => {
            obj.activeNameWXLB = "second"
        })
    } else if (mapType == "2dmap") {
        // Lmap.on('mousemove', e => {
        //     document.getElementById("distanceSpan").innerText = (42164.6 * Math.sqrt(1.023 - 0.302 * Math.cos((e.latlng.lng - row.satPosition) * Math.PI / 180) * Math.cos(e.latlng.lat * Math.PI / 180))).toFixed(4)
        //     document.getElementById("evationSpan").innerText = (Math.atan(Math.cos((e.latlng.lng - row.satPosition) * Math.PI / 180) * Math.cos(e.latlng.lat * Math.PI / 180) - 0.1512695 / Math.sqrt(1 - Math.pow(Math.cos((e.latlng.lng - row.satPosition) * Math.PI / 180) * Math.cos(e.latlng.lat * Math.PI / 180), 2))) * 180 / Math.PI).toFixed(4)
        //     document.getElementById("azimuthSpan").innerText = (Math.atan(Math.tan((e.latlng.lng - row.satPosition) * Math.PI / 180) / Math.sin(e.latlng.lat)) * 180 / Math.PI).toFixed(4)
        // })
    }
}