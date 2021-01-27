import * as Cesium from 'cesium'
import { viewer } from "../Map/init3dMap"
import {
    addSurfaceBeamPOINT
} from "../../js/Map/ElevationLines/surfaceBeam3dmap"
import axios from "axios";

/*
三维空间查询
*/
export let circleCadius = 0,
    circleCenterPoint = "",
    circleCenterPointLanLon = [];

let activeShapePoints = [],
    activeShape = [],
    floatingPoint = null,
    boundaryPoints = [],
    returnGraphic = null,
    handler = null;
export let query_Data = [];
let pointStyle = {
    style: constructPoint({
        color: Cesium.Color.RED,
        pixelSize: 10,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 0,
        show: true,
        distanceDisplayCondition: Cesium.DistanceDisplayCondition(0.1, 2500.0)
    })
};

let markerStyle = {
    style: constructBillboard({
        image: 'images/pic.png',
        scale: 0.3,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    })
};

let rectangleStyle = {
    style: constructRectangle({
        material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2)
    })
};

let circleStyle = {
    style: constructEllipse({
        material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2)
    })
};

//绘制
let drawarr = [];

export const draW = (e, WXLB_Data, state, JCNL_Data, obj) => {
    clearRectangle()
    switch (e) {
        case 'point':
            drawGraphic(viewer, 'point', function(_entity) {
                drawarr.push(_entity);
            }, pointStyle);
            break;
        case 'marker':
            drawGraphic(viewer, 'marker', function(_entity) {
                drawarr.push(_entity);
            }, markerStyle);
            break;
        case 'circle':
            drawGraphic(viewer, 'circle', function(_entity) {
                drawarr.push(_entity);
            }, circleStyle, WXLB_Data, state, JCNL_Data, obj);
            break;
        case 'rectangle':
            drawGraphic(viewer, 'rectangle', function(_entity) {
                drawarr.push(_entity);
            }, rectangleStyle, WXLB_Data, state, JCNL_Data, obj);
            break;
    }
}

//构造rectangle属性
function constructRectangle(_param) {
    if (!_param) {
        _param = {};
    }
    let RectangleEntity = {};
    RectangleEntity.rectangle = {
        coordinates: _param.coordinates || null,
        show: _param.show || true,
        fill: _param.fill || true,
        material: _param.material || Cesium.Color.WHITE,
        distanceDisplayCondition: _param.distanceDisplayCondition || undefined
    };
    return RectangleEntity;
}

//构造point属性
function constructPoint(_param) {
    let PointEntity = {};
    if (!_param) {
        _param = {}
    }
    PointEntity.point = {
        color: _param.color || Cesium.Color.WHITE,
        pixelSize: _param.pixelSize || 1,
        outlineColor: _param.outlineColor || Cesium.Color.BLACK,
        outlineWidth: _param.outlineWidth || 0,
        show: _param.show || true,
        scaleByDistance: _param.scaleByDistance || null,
        translucencyByDistance: _param.translucencyByDistance || null,
        heightReference: _param.heightReference || Cesium.HeightReference.NONE,
        distanceDisplayCondition: _param.distanceDisplayCondition || undefined,
    };
    return PointEntity;
}

//构造marker（billboard）属性
function constructBillboard(_param) {
    if (!_param) {
        _param = {};
    }
    let BillboardEntity = {};
    BillboardEntity.billboard = {
        image: _param.image || null,
        show: _param.show || true,
        scale: _param.scale || 1.0,
        eyeOffset: _param.eyeOffset || Cesium.Cartesian3.ZERO,
        pixelOffset: _param.pixelOffset || Cesium.Cartesian2.ZERO,
        // sizeInMeters:_param.sizeInMeters||true,
        horizontalOrigin: _param.horizontalOrigin || Cesium.HorizontalOrigin.CENTER, //水平方向  中心
        verticalOrigin: _param.verticalOrigin || Cesium.VerticalOrigin.CENTER, //垂直方向 底部
        rotation: _param.rotation || 0,
        heightReference: _param.heightReference || Cesium.HeightReference.NONE,
        distanceDisplayCondition: _param.distanceDisplayCondition || undefined
            // pixelOffsetScaleByDistance:_param.pixelOffsetScaleByDistance
    };
    return BillboardEntity
}

//构造circle（ellipse）的属性
function constructEllipse(_param) {
    if (!_param) {
        _param = {};
    }
    let EllipseEntity = {};
    EllipseEntity.ellipse = {
        semiMinorAxis: _param.semiMinorAxis || 2000,
        semiMajorAxis: _param.semiMajorAxis || 2000,
        height: _param.height || 0,
        material: _param.material || Cesium.Color.WHITE,
    };
    return EllipseEntity;
}

let rectangLatLng = [];
//自定义绘制图形，支持 点，线，面，矩形，圆，标识，可自定义绘制过程中的和绘制完的预览
function drawGraphic(viewer, _mode, _callback, _GraphicProperty, WXLB_Data, state, JCNL_Data, obj) {
    //清空所有可能的监听和画到一半的图形
    if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    if (activeShapePoints || activeShape || floatingPoint || boundaryPoints.length > 0 || returnGraphic) {
        if (floatingPoint) {
            viewer.entities.remove(floatingPoint);
            floatingPoint = undefined;
        }
        if (activeShape) {
            viewer.entities.remove(activeShape);
            activeShape = undefined;
        }
        activeShapePoints = [];
        if (boundaryPoints.length > 0) {
            for (let i = 0; i < boundaryPoints.length; i++) {
                viewer.entities.remove(boundaryPoints[i]);
            }
        }
    }
    //配置
    var drawingMode = _mode;
    var GraphicProperty;
    if (_GraphicProperty === null || _GraphicProperty === "" || _GraphicProperty === undefined) {
        GraphicProperty = {}
    } else {
        GraphicProperty = _GraphicProperty
    }
    //监听左键点击事件
    function listenClick(_callback) {
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(movement) {
            let position = viewer.scene.pickPosition(movement.position);
            let screenPosition = movement.position;
            let callbackObj = {};
            callbackObj.cartesian3 = position;
            callbackObj.movement = movement;
            callbackObj.screenPosition = screenPosition;
            _callback(callbackObj, handler);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    //模式判断
    if (drawingMode === 'point') {
        listenClick(function(callbackObj, handler) {
            let position = callbackObj.cartesian3;
            let Point;
            //构造实体
            if (GraphicProperty.style && GraphicProperty.style.point) {
                Point = viewer.entities.add({
                    id: GraphicProperty.id || null,
                    description: GraphicProperty.description || '',
                    name: GraphicProperty.name || '',
                    position: position,
                    point: GraphicProperty.style.point
                });
            } else {
                Point = viewer.entities.add({
                    type: 'Selection tool',
                    position: position,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 10,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 0,
                        show: true,
                    }
                });
            }
            //回调产生的点
            if (_callback) {
                _callback(Point);
            }
            //销毁左键监听
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        });
    } else if (drawingMode === 'marker') {
        if (GraphicProperty.style && GraphicProperty.style.billboard) {
            listenClick(function(callbackObj, handler) {
                //此时场景中的点
                let position = callbackObj.cartesian3;
                //赋值，构造点实体Entity
                let Marker = viewer.entities.add({
                    id: GraphicProperty.id || null,
                    description: GraphicProperty.description || null,
                    name: GraphicProperty.name || '',
                    type: 'Selection tool',
                    show: GraphicProperty.show || true,
                    position: position,
                    billboard: GraphicProperty.style.billboard
                });
                //回调构造的点
                if (_callback) {
                    _callback(Marker);
                }
                //销毁
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            });
        } else {
            listenClick(function(callbackObj, handler) {
                //此时场景中的点
                let position = callbackObj.cartesian3;
                //赋值，构造点实体Entity
                let Marker = viewer.entities.add({
                    type: 'Selection tool',
                    show: true,
                    position: position,
                    point: {
                        color: Cesium.Color.WHITE,
                        pixelSize: 10,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 0,
                        show: true,
                    }
                });
                //回调构造的点
                if (_callback) {
                    _callback(Marker);
                }
                //销毁
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            });
        }
    } else {
        handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        //取消自带的双击放大监听
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        //构造点，例如在活动的提示点
        var createPoint = function(worldPosition) {
                var point = viewer.entities.add({
                    position: worldPosition,
                    point: {
                        color: Cesium.Color.SKYBLUE,
                        pixelSize: 2,
                        outlineColor: Cesium.Color.YELLOW,
                        outlineWidth: 1,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                return point;
            }
            //绘制图形
        var drawShape = function(positionData) {
                var shape;
                if (drawingMode === 'polyline') {
                    if (GraphicProperty.style && GraphicProperty.style.polyline) {
                        GraphicProperty.style.polyline.positions = positionData;
                        shape = viewer.entities.add({
                            id: GraphicProperty.id || null,
                            name: GraphicProperty.name || '',
                            description: GraphicProperty.description || '',
                            polyline: GraphicProperty.style.polyline
                        });
                    } else {
                        shape = viewer.entities.add({
                            polyline: {
                                positions: positionData,
                                width: 3
                            }
                        });
                    }
                } else if (drawingMode === 'polygon') {
                    if (GraphicProperty.style && GraphicProperty.style.polygon) {
                        GraphicProperty.style.polygon.hierarchy = positionData;
                        GraphicProperty.style.polygon.perPositionHeight = true;
                        shape = viewer.entities.add({
                            id: GraphicProperty.id || null,
                            name: GraphicProperty.name || '',
                            description: GraphicProperty.description || '',
                            polygon: GraphicProperty.style.polygon
                        });
                    } else {
                        shape = viewer.entities.add({
                            polygon: {
                                hierarchy: positionData,
                                material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                                perPositionHeight: true
                            }
                        });
                    }
                } else if (drawingMode === 'circle') {
                    //当positionData为数组时绘制最终图，如果为function则绘制动态图
                    let xyz = new Cesium.Cartesian3(activeShapePoints[0].x, activeShapePoints[0].y, activeShapePoints[0].z);
                    //转WGS84
                    let wgs84 = viewer.scene.globe.ellipsoid.cartesianToCartographic(xyz);
                    let height = wgs84.height;
                    let value = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                    if (GraphicProperty.style && GraphicProperty.style.ellipse) {
                        GraphicProperty.style.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function() {
                            //半径 两点间距离
                            var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                            return r ? r : r + 1;
                        }, false);
                        GraphicProperty.style.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function() {
                            var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                            return r ? r : r + 1;
                        }, false);
                        GraphicProperty.style.ellipse.height = height;
                        shape = viewer.entities.add({
                            position: activeShapePoints[0],
                            id: GraphicProperty.id || null,
                            name: GraphicProperty.name || '',
                            description: GraphicProperty.description || '',
                            ellipse: GraphicProperty.style.ellipse
                        });
                        circleCadius = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                    } else {
                        shape = viewer.entities.add({
                            position: activeShapePoints[0],
                            ellipse: {
                                semiMinorAxis: new Cesium.CallbackProperty(function() {
                                    //半径 两点间距离
                                    var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                                    return r ? r : r + 1;
                                }, false),
                                semiMajorAxis: new Cesium.CallbackProperty(function() {
                                    var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math.pow(value[0].y - value[value.length - 1].y, 2));
                                    return r ? r : r + 1;
                                }, false),
                                material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                                height: height,
                                outline: true
                            }
                        });
                    }
                } else if (drawingMode === 'rectangle') {
                    let xyz = new Cesium.Cartesian3(activeShapePoints[0].x, activeShapePoints[0].y, activeShapePoints[0].z);
                    //转WGS84
                    let wgs84 = viewer.scene.globe.ellipsoid.cartesianToCartographic(xyz);
                    let height = wgs84.height;
                    //当positionData为数组时绘制最终图，如果为function则绘制动态图
                    let arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
                    rectangLatLng = arr;
                    if (GraphicProperty.style && GraphicProperty.style.rectangle) {
                        GraphicProperty.style.rectangle.coordinates = new Cesium.CallbackProperty(function() {
                            return Cesium.Rectangle.fromCartesianArray(arr);
                        }, false);
                        GraphicProperty.style.rectangle.height = height;
                        shape = viewer.entities.add({
                            id: GraphicProperty.id || null,
                            name: GraphicProperty.name || '',
                            description: GraphicProperty.description || '',
                            rectangle: GraphicProperty.style.rectangle
                        });
                    } else {
                        shape = viewer.entities.add({
                            rectangle: {
                                coordinates: new Cesium.CallbackProperty(function() {
                                    return Cesium.Rectangle.fromCartesianArray(arr);
                                }, false),
                                material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                                height: height
                            }
                        });
                    }
                }
                return shape;
            }
            //左键监听，每一次绘制都要留下记录
        handler.setInputAction(function(event) {
            //在场景中使用深度拾取scene.pickPosition  globe的pick还有camera的pick在场景中拾取不准确
            // var earthPosition = viewer.scene.pickPosition(event.position);
            var earthPosition = getPointFromWindowPoint(event.position);
            //当鼠标不在地表时，earthPosition切成未定义undefined
            if (Cesium.defined(earthPosition)) {
                if (activeShapePoints.length === 0) {
                    if (drawingMode === 'circle') {
                        var cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
                        //将弧度转为度的十进制度表示
                        var lon = Cesium.Math.toDegrees(cartographic.longitude);
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        circleCenterPoint = '' + lon + ' ' + lat + '';
                        circleCenterPointLanLon = [lat, lon];
                    }
                    floatingPoint = createPoint(earthPosition);
                    activeShapePoints.push(earthPosition);
                    var dynamicPositions = new Cesium.CallbackProperty(function() {
                        if (drawingMode === 'polygon') {
                            return new Cesium.PolygonHierarchy(activeShapePoints);
                        }
                        return activeShapePoints;
                    }, false);
                    activeShape = drawShape(dynamicPositions);
                }
                activeShapePoints.push(earthPosition);
                let boundaryPoint = createPoint(earthPosition);
                boundaryPoints.push(boundaryPoint);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //鼠标移动的监听
        handler.setInputAction(function(event) {
            if (Cesium.defined(floatingPoint)) {
                // var newPosition = viewer.scene.pickPosition(event.endPosition);
                var newPosition = getPointFromWindowPoint(event.endPosition);
                if (Cesium.defined(newPosition)) {
                    floatingPoint.position.setValue(newPosition);
                    activeShapePoints.pop();
                    activeShapePoints.push(newPosition);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //重置图形，形成最终形态，把动态过程中的图形全部去掉
        var terminateShape = function() {
                activeShapePoints.pop();
                let final_Entity;
                if (activeShapePoints.length) {
                    final_Entity = drawShape(activeShapePoints); //绘制最终图
                }
                viewer.entities.remove(floatingPoint);
                viewer.entities.remove(activeShape);
                floatingPoint = undefined;
                activeShape = undefined;
                activeShapePoints = [];
                // for (let i = 0; i < boundaryPoints.length; i++) {
                //     viewer.entities.remove(boundaryPoints[i]);
                // }
                return final_Entity;
            }
            //双击监听，结束画图
        handler.setInputAction(function() {
            returnGraphic = terminateShape();
            if (_callback) {
                _callback(returnGraphic);
            }
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            if (drawingMode === 'circle') {
                queryCircular2(WXLB_Data, state, JCNL_Data, obj)
            } else if (drawingMode === 'rectangle') {
                let rectangLatLngs = []
                rectangLatLngs.push(
                        [rectangLatLng[0].x, rectangLatLng[0].y, rectangLatLng[0].z], [rectangLatLng[1].x, rectangLatLng[0].y, rectangLatLng[1].z], [rectangLatLng[1].x, rectangLatLng[1].y, rectangLatLng[1].z], [rectangLatLng[0].x, rectangLatLng[1].y, rectangLatLng[0].z], [rectangLatLng[0].x, rectangLatLng[0].y, rectangLatLng[0].z])
                    // console.log(rectangLatLng[0].x, rectangLatLng[1].y)
                var aa = []
                rectangLatLngs.forEach(point => {
                    var ellipsoid = viewer.scene.globe.ellipsoid;
                    var cartesian3 = new Cesium.Cartesian3(point[0], point[1], point[2]);
                    var cartograhphic = ellipsoid.cartesianToCartographic(cartesian3);
                    var lat = Cesium.Math.toDegrees(cartograhphic.latitude);
                    var lng = Cesium.Math.toDegrees(cartograhphic.longitude);
                    aa.push([
                        lat, lng
                    ])
                })
                queryrectang(aa, WXLB_Data, state, JCNL_Data, obj)
            }

        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }
}

export const getPointFromWindowPoint = (point) => {
    if (viewer.scene.terrainProvider.constructor.name == "EllipsoidTerrainProvider") {
        return viewer.camera.pickEllipsoid(point, viewer.scene.globe.ellipsoid);
    } else {
        var ray = viewer.scene.camera.getPickRay(point);
        return viewer.scene.globe.pick(ray, viewer.scene);
    }
}

//清除绘制
export const clearRectangle = () => {
    query_Data = []
    if (drawarr.length > 0) {
        drawarr.forEach(data => {
            viewer.entities.remove(data);
        })
    }
    for (let i = 0; i < boundaryPoints.length; i++) {
        viewer.entities.remove(boundaryPoints[i]);
    }
}


//清除绘制二维
export const clearRectangle2d = () => {
    query_Data = [];
}

//空间查询-圆形查询
function queryCircular2(WXLB_Data, state, JCNL_Data, obj) {
    var center = circleCenterPointLanLon;
    var radius = parseInt(circleCadius) / 1000; //千米为单位
    var options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };
    query_Data = []
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybycircle", {
        params: { origin: circleCenterPoint, radius: circleCadius }
    }).then(res => {
        if (res.data.length > 0) {
            clearRectangle() //清除绘制的矩形
            query_Data = res.data; //query_Data保存的查询出来的包络面
            if (state) { //右侧列表点击的是卫星列表
                res.data.forEach(data => {
                    addSurfaceBeamPOINT(data, WXLB_Data); //添加包络面
                });
            }
            if (!state) { //系统指标对比
                coverAreaCircle_NLDB(res, JCNL_Data, center, radius, options, obj) //计算选中的区域的覆盖面积
                var tempPoints = circle(center, parseInt(radius), options);
                //计算EIRP值
                JCNL_Data.forEach(jcnl => {
                    jcnl.eirp = ""
                    EIRP(jcnl, tempPoints, JCNL_Data, obj, 'circle');
                })
            }
        }
    });
}

//空间查询-矩形查询
function queryrectang(tempPoints, WXLB_Data, state, JCNL_Data, obj) {
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybyrectangle", {
        params: { xmax: tempPoints[0][0], xmin: tempPoints[0][1], ymax: tempPoints[2][0], ymin: tempPoints[2][1] }
    }).then(res => {
        if (res.data.length > 0) {
            clearRectangle() //清除绘制的矩形
            query_Data = res.data //query_Data保存的查询出来的包络面
            res.data.forEach(data => {
                if (state) { //右侧列表点击的是卫星列表
                    addSurfaceBeamPOINT2DMap(data, WXLB_Data); //添加包络面
                }
            });

            if (!state) { //系统指标对比
                coverArea_NLDB(res, JCNL_Data, tempPoints, obj) //计算选中的区域的覆盖面积
            }
        }
    });

    if (!state) { //系统指标对比
        //计算EIRP值
        JCNL_Data.forEach(jcnl => {
            jcnl.eirp = ""
            EIRP(jcnl, tempPoints, JCNL_Data, obj, 'polygon');
        })
    }
}

/*
二维空间查询
*/
import { Lmap } from "../Map/init2dMap";
import * as L from 'leaflet';
import { addSurfaceBeamPOINT2DMap } from "../Map/ElevationLines/surfaceBeam3dmap"
import * as turf from 'turf'
import { circle } from '@turf/turf'
let tmprect;
let latlngs = [];
let clickState = true;
//二维空间查询-矩形查询-矩形绘制
export const queryRectangle2dMap = (WXLB_Data, state, JCNL_Data, obj) => {
        //map.off(....) 关闭该事件
        let onClick = function(e) {
            if (clickState) {
                if (typeof tmprect != 'undefined') {
                    tmprect.remove()
                }
                //左上角坐标
                latlngs[0] = [e.latlng.lat, e.latlng.lng]
                    //开始绘制，监听鼠标移动事件
                Lmap.on('mousemove', onMove)
                clickState = false
            }
        }
        let onMove = function(e) {
            latlngs[1] = [e.latlng.lat, e.latlng.lng]
                //删除临时矩形
            if (typeof tmprect != 'undefined') {
                tmprect.remove()
            }
            //添加临时矩形
            tmprect = L.rectangle(latlngs).addTo(Lmap)
        }

        let onDoubleClick = function(e) {
            //矩形绘制完成，移除临时矩形，并停止监听鼠标移动事件
            if (typeof tmprect != 'undefined') {
                tmprect.remove()
            }

            Lmap.off('mousemove')
            Lmap.off('click')
            Lmap.off('dblclick')
                //右下角坐标
            latlngs[1] = [e.latlng.lat, e.latlng.lng]
            tmprect = L.rectangle(latlngs).addTo(Lmap)
                //     //调整view范围

            // Lmap.fitBounds(latlngs)
            // latlngs = []
            clickState = true
            let Arrlatlngs = []
            L.rectangle(latlngs)._latlngs[0].forEach(latlng => {
                Arrlatlngs.push([latlng.lat, latlng.lng])
            })
            Arrlatlngs[Arrlatlngs.length] = Arrlatlngs[0];
            queryrectang2DMap(Arrlatlngs, WXLB_Data, state, JCNL_Data, obj)
        }

        Lmap.on('click', onClick).on('dblclick', onDoubleClick);
    }
    //矩形查询调用接口
function queryrectang2DMap(tempPoints, WXLB_Data, state, JCNL_Data, obj) {
    query_Data = []
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybyrectangle", {
        params: { xmax: latlngs[0][0], xmin: latlngs[0][1], ymax: latlngs[1][0], ymin: latlngs[1][1] }
    }).then(res => {
        if (res.data.length > 0) {
            tmprect.remove() //清除绘制的矩形
            query_Data = res.data //query_Data保存的查询出来的包络面
            res.data.forEach(data => {
                if (state) { //卫星列表
                    addSurfaceBeamPOINT2DMap(data, WXLB_Data); //添加包络面
                }
            });

            if (!state) { //系统指标对比
                coverArea_NLDB(res, JCNL_Data, tempPoints, obj) //计算选中的区域的覆盖面积
            }
        }
    });

    if (!state) { //系统指标对比
        //计算EIRP值
        JCNL_Data.forEach(jcnl => {
            jcnl.eirp = ""
            EIRP(jcnl, tempPoints, JCNL_Data, obj, 'polygon');
        })
    }
}

//二维查询-点查询-点绘制
export const queryPoint2dMap = (WXLB_Data, state, JCNL_Data, obj) => {
    //map.off(....) 关闭该事件
    let onClick = function(e) {
        if (typeof tmprect != 'undefined') {
            tmprect.remove()
        }

        tmprect = L.circle([e.latlng.lat, e.latlng.lng], { color: '#3388FF', fillColor: '#3388FF', radius: 1000, fillOpacity: 1 }).addTo(Lmap)

        Lmap.off('click')
        queryPoint2DMap(e.latlng.lat, e.latlng.lng, [e.latlng.lat, e.latlng.lng], 1000, WXLB_Data, state, JCNL_Data, obj)
    }
    Lmap.on('click', onClick)
}

//点查询调用接口
function queryPoint2DMap(lat, lng, lnglat, circleCadius, WXLB_Data, state, JCNL_Data, obj) {
    query_Data = []
    var center = lnglat;
    var radius = circleCadius / 1000;
    var options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybypoint", {
        params: { lat: lat, lon: lng }
    }).then(res => {
        if (res.data.length > 0) {
            getSpatialQuerySatname(res, obj); //空间查询后，查询出对应的卫星
            tmprect.remove() //清除绘制的点
            query_Data = res.data //query_Data保存的查询出来的包络面
            if (state) { //卫星列表
                res.data.forEach(data => {
                    addSurfaceBeamPOINT2DMap(data, WXLB_Data); //添加包络面
                });
            }
            if (!state) { //系统指标对比
                coverAreaCircle_NLDB(res, JCNL_Data, center, radius, options, obj) //计算选中的区域的覆盖面积
            }
        }
    });

    if (!state) { //系统指标对比
        var tempPoints = circle(center, parseInt(radius), options);
        //计算EIRP值
        JCNL_Data.forEach(jcnl => {
            jcnl.eirp = ""
            EIRP(jcnl, tempPoints, JCNL_Data, obj, 'circle');
        })
    }
}

var r = 0;
var i = null;
let CircleState = true;
var tempCircle;
//二维空间查询-圆形查询-圆形绘制
export const queryCircle2dMap = (WXLB_Data, state, JCNL_Data, obj) => {
    //map.off(....) 关闭该事件
    let onmouseDown = function(e) {
        if (CircleState) {
            tempCircle = new L.circle()
                //确定圆心
            i = e.latlng
            Lmap.on('mousemove', onMove)
            CircleState = false
        }
    }
    let onMove = function(e) {
        if (i) {
            r = L.latLng(e.latlng).distanceTo(i)
            tempCircle.setLatLng(i)
            tempCircle.setRadius(r)
            tempCircle.setStyle({ color: 'BLACK', weight: 1, fillColor: '#3388FF', fillOpacity: 0.2 })
            Lmap.addLayer(tempCircle)
        }
    }

    let onmouseUp = function(e) {
        Lmap.off('click')
        Lmap.off('mousemove')
        Lmap.off('dblclick')
        Lmap.removeLayer(tempCircle);
        r = L.latLng(e.latlng).distanceTo(i) //计算半径
        tmprect = L.circle(i, { radius: r, color: 'BLACK', weight: 1, fillColor: '#3388FF', fillOpacity: 0.2 }).addTo(Lmap)
        queryCircle2DMap('' + e.latlng.lng + ' ' + e.latlng.lat + '', [e.latlng.lat, e.latlng.lng], r, WXLB_Data, state, JCNL_Data, obj)
        i = null
        r = 0
        CircleState = true
    }
    Lmap.on('click', onmouseDown).on('dblclick', onmouseUp);
}

//圆形查询调用接口
function queryCircle2DMap(circleCenterPoint, lnglat, circleCadius, WXLB_Data, state, JCNL_Data, obj) {
    query_Data = []
    var center = lnglat;
    var radius = parseInt(circleCadius) / 1000;
    var options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybycircle", {
        params: { origin: circleCenterPoint, radius: circleCadius }
    }).then(res => {
        if (res.data.length > 0) {
            tmprect.remove();
            query_Data = res.data
            if (state) { //卫星列表
                res.data.forEach(data => {
                    addSurfaceBeamPOINT2DMap(data, WXLB_Data);
                })
            }
            if (!state) { //系统指标对比
                coverAreaCircle_NLDB(res, JCNL_Data, center, radius, options, obj)
            }
        }
    });

    if (!state) { //系统指标对比
        var tempPoints = circle(center, parseInt(radius), options);
        //计算EIRP值
        JCNL_Data.forEach(jcnl => {
            jcnl.eirp = ""
            EIRP(jcnl, tempPoints, JCNL_Data, obj, 'circle');
        })
    }
}

var points = [],
    geometry = [],
    lines,
    tempLines,
    ls;
//二维空间查询-多边形查询-多边形绘制
export const queryPolygon2dMap = (WXLB_Data, state, JCNL_Data, obj) => {
    lines = new L.polyline([])
    tempLines = new L.polyline([])
        //map.off(....) 关闭该事件

    let onClick = function(e) {
        points.push([e.latlng.lat, e.latlng.lng])
        lines.addLatLng(e.latlng)
        Lmap.addLayer(tempLines)
        Lmap.addLayer(lines)
        const node = L.circle(e.latlng, { color: '#3388FF', fillColor: 'ff0000', fillOpacity: 1 })
        Lmap.addLayer(node)
        geometry.push(node)
        Lmap.on('mousemove', onMove)
    }
    let onMove = function(e) {
        if (points.length > 0) {
            ls = [points[points.length - 1],
                [e.latlng.lat, e.latlng.lng], points[0]
            ]
            tempLines.setLatLngs(ls)
        }
    }

    let onDoubleClick = function() {
        Lmap.off('click')
        Lmap.off('mousemove')
        Lmap.off('dblclick')
        geometry.push(L.polygon(points).addTo(Lmap))
        queryPolygon2DMap(points, WXLB_Data, state, JCNL_Data, obj)
        points = []
        lines.remove()
        tempLines.remove()
        lines = new L.polyline([])
    }
    Lmap.on('click', onClick).on('dblclick', onDoubleClick);
}

//多边形查询调用接口
function queryPolygon2DMap(tempPoints, WXLB_Data, state, JCNL_Data, obj) {
    query_Data = []
    tempPoints.splice(tempPoints.length - 1, 1)
    let params = '' + tempPoints[tempPoints.length - 1][1] + ' ' + tempPoints[tempPoints.length - 1][0] + ','
    tempPoints.forEach((data, index) => {
        if (index == tempPoints.length - 1) {
            params += '' + data[1] + ' ' + data[0] + ''
        } else {
            params += '' + data[1] + ' ' + data[0] + ','
        }
    })
    tempPoints[tempPoints.length] = tempPoints[0];
    axios.get(obj.$store.state.POST_GIS_SERVER_URL + "/querybypolygon", {
        params: { linestring: params }
    }).then(res => {
        if (res.data.length > 0) {
            if (geometry.length > 0) {
                geometry.forEach(g => {
                    g.remove();
                })
            }
            query_Data = res.data
            res.data.forEach(data => {
                if (state) { //卫星列表
                    addSurfaceBeamPOINT2DMap(data, WXLB_Data);
                }
            });

            if (!state) { //系统指标对比
                coverArea_NLDB(res, JCNL_Data, tempPoints, obj)
            }
        }
    });

    if (!state) { //系统指标对比
        //计算EIRP值
        JCNL_Data.forEach(jcnl => {
            jcnl.eirp = ""
            EIRP(jcnl, tempPoints, JCNL_Data, obj, 'polygon');
        })
    }
}

//系统指标对比（空间选择多边形选择，卫星覆盖面积）
export const coverArea_NLDB = (res, JCNL_Data, tempPoints) => {
    JCNL_Data.forEach(jcnl => {
        var area = 0;
        res.data.forEach(data => {
            if (jcnl.satEName == data.satname) {
                let b = []
                JSON.parse(data.polygon).coordinates.forEach((feature1, index1) => {
                    let a = []
                    feature1.forEach((feature2) => {
                        feature2.forEach((feature3) => {
                            a.push([
                                feature3[1], feature3[0]
                            ])
                        })
                    })
                    b[index1] = a;
                    var poly1 = turf.polygon([tempPoints]);
                    var poly2 = turf.polygon([b[index1]]);

                    var intersection = turf.intersect(poly1, poly2);

                    if (intersection != undefined) {
                        area = Number(area) + turf.area(intersection);
                    }
                })
            }
        })
        area = (Number(area) / 1000000).toFixed(4)
        jcnl.Area = area;
    })
}

//系统指标对比（空间选择圆形选择，卫星覆盖面积）
export const coverAreaCircle_NLDB = (res, JCNL_Data, center, radius, options) => {
    JCNL_Data.forEach(jcnl => {
        let area = 0
        res.data.forEach(data => {
            if (jcnl.satEName == data.satname) {
                let b = []
                JSON.parse(data.polygon).coordinates.forEach((feature1, index1) => {
                    let a = []
                    feature1.forEach((feature2) => {
                        feature2.forEach((feature3) => {
                            a.push([
                                feature3[1], feature3[0]
                            ])
                        })
                    })
                    b[index1] = a;

                    var poly1 = circle(center, parseInt(radius), options);
                    var poly2 = turf.polygon([b[index1]]);

                    var intersection = turf.intersect(poly1, poly2);

                    if (intersection != undefined) {
                        console.log(Number(area) + turf.area(intersection))
                        area = Number(area) + turf.area(intersection);
                    }
                })
            }
        })
        area = (Number(area) / 1000000).toFixed(4)
        jcnl.Area = area;
    })
}

//计算EIRP值
export const EIRP = (jcnl, tempPoints, JCNL_Data, obj, type) => {
    axios
        .get(obj.$store.state.POST_GIS_SERVER_URL + "/satbeamcoverpolygon", {
            params: {
                satname: jcnl.satEName
            }
        })
        .then(res => {
            console.log(res)

            if (res.data.length > 0) {
                var objData = {};
                var jsonArray = res.data.reduce(function(item, next) {
                    objData[next.cm] ? '' : objData[next.cm] = true && item.push(next);
                    return item;
                }, []);

                let dataEIRP = [] //所有空间选择中的EIRP值
                res.data.forEach(data => {
                    let b = []
                    JSON.parse(data.geom).coordinates.forEach((feature1, index1) => {
                        let a = []
                        feature1.forEach((feature2) => {
                            feature2.forEach((feature3) => {
                                a.push([
                                    feature3[1], feature3[0]
                                ])
                            })
                        })
                        b[index1] = a;
                        var poly1 = null;
                        if (type == 'polygon') {
                            poly1 = turf.polygon([tempPoints]);
                        }
                        if (type == 'circle') {
                            poly1 = tempPoints;
                        }

                        var poly2 = turf.polygon([b[index1]]);
                        var intersection = turf.intersect(poly1, poly2);

                        if (intersection != undefined) {
                            dataEIRP.push(data)
                        }
                    })
                })


                jsonArray.forEach(eirp => {
                    getEIRP(jcnl, eirp, dataEIRP, JCNL_Data, obj)
                })
            }
        })
}

//查找对应的EIRP值
function getEIRP(jcnl, eirp, dataEIRP, JCNL_Data, obj) {
    axios
        .get(obj.$store.state.POST_GIS_SERVER_URL + "/satbeamlabelpoint", {
            params: {
                satname: jcnl.satEName,
                cm: eirp.cm
            }
        }).then(res => {
            if (res.data.length > 0) {
                let map = {}
                for (let i = 0; i < dataEIRP.length; i++) {
                    let ai = dataEIRP[i]
                    if (!map[ai.cm]) {
                        map[ai.cm] = [ai]
                    } else {
                        map[ai.cm].push(ai)
                    }
                }
                let resData = []
                Object.keys(map).forEach(key => {
                    resData.push({
                        cm: key,
                        data: map[key],
                    })
                })
                let aaaa = true;
                res.data.forEach((a, index) => {
                    for (let item in map) {
                        if (item == a.cm) {
                            var min = Math.min.apply(Math, map[item].map(function(o) {
                                return o.beameirp
                            }))
                            var max = Math.max.apply(Math, map[item].map(function(o) {
                                return o.beameirp
                            }))


                            if (a.beameirp > max) {
                                if (aaaa) {
                                    JCNL_Data.forEach(NLData => {
                                        if (NLData.satEName == jcnl.satEName) {
                                            NLData.eirp += item + ":" + min + "~" + a.beameirp + ";"
                                        }
                                    })

                                    aaaa = false
                                }
                            }

                            if (aaaa) {
                                if (index == res.data.length - 1) {
                                    JCNL_Data.forEach(NLData => {
                                        if (NLData.satEName == jcnl.satEName) {
                                            NLData.eirp += item + ":" + min + "~" + max + ";"
                                        }
                                    })
                                    aaaa = false
                                }
                            }
                        }
                    }
                })

                obj.activeNameWXLB = "first"
                setTimeout(() => {
                    obj.activeNameWXLB = "second"
                }, 1)
            }
        })
}

//根据卫星名称过滤重复数据
export const filter_satname = (objcArray) => {
    for (var i = 0; i < objcArray.length; i++) {
        for (var j = i + 1; j < objcArray.length;) {
            if (objcArray[i].satname == objcArray[j].satname) { //通过id属性进行匹配；
                objcArray.splice(j, 1); //去除重复的对象；
            } else {
                j++;
            }
        }
    }
    return objcArray;
}

//空间查询后，查询出对应的卫星
function getSpatialQuerySatname(res, obj) {
    let satnameArr = []
    filter_satname(res.data).forEach(d => {
        satnameArr[satnameArr.length] = d.satname
    })

    axios({
        method: "post",
        url: obj.$store.state.POST_WT_SERVER_URL + "/getSatname",
        params: {
            satnameAll: JSON.stringify(satnameArr)
        }
    }).then(res => {
        if (res.data.length > 0) {
            obj.WXLB_Data = obj.filter(res.data);
            obj.JCNL_Data = obj.filter(res.data);
        }
    })
}