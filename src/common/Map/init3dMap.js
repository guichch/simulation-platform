// 这实现里也是为了减少框架的体积，选择使用按需引入，所有地图的操作全部在这里
import {
    Viewer,
    UrlTemplateImageryProvider,
    Cartesian3,
    Color
} from 'cesium'
import { getSatCollection } from "./ElevationLines/satOrbit"
const options = {
    contextOptions: {
        webgl: {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            //通过canvas.toDataURL()实现截图需要将该项设置为true
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
        }
    },
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    // requestRenderMode: true, //启用请求渲染模式
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式
    // shouldAnimate: true,
    //terrainProvider: Cesium.createWorldTerrain(),//地形
    //加载谷歌影像，深蓝
    imageryProvider: new UrlTemplateImageryProvider({
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
    })
}

export let viewer = null

export const initMap = () => {
    viewer = new Viewer('cesium-containter', options);

    viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(105, 26, 100000000),
        duration: 1.5
    })

    viewer.scene.skyBox.show = false;
    viewer.scene.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0);

    // 去掉版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
    getSatCollection('3dmap')
    return viewer
}