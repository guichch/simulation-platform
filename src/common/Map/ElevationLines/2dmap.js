import { Lmap } from "../init2dMap"
import L from 'leaflet'
import "leaflet.markercluster";
import { getAllElevationLines, elevationPolyLineCoordsOfDegreeZero, elevationPolyLineCoordsOfDegreeFive, elevationPolyLineCoordsOfDegreeTen, elevationPolyLineCoordsOfDegreeAll } from "./elevation_line"

var elevationAngleLinePointGroup,
    elevationAngleLinePointGroupAdd,
    elevationAngleTenLineGroup = null,
    elevationAngleFiveLineGroup = null,
    elevationAngleZeroLineGroup = null,
    elevationAngleAddLineGroup = null,
    elevationAngleAddLineGroupAll = [];
export let positionLon = null;

/* 针对默认三个角度的仰角线处理相关方法  开始 */
//在二维地图上添加仰角线，默认包含0度，5度，10度
export const addEleLineOn2dMap = (position) => {
        positionLon = position;
        clearAllEleLineOn2dMap()
        getAllElevationLines(position);
        drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeZero, 0);
        drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeFive, 5);
        drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeTen, 10);
        //绘制所有标注点
        drawAllElevationLineLabelsOn2dMap();
    }
    //绘制仰角线---内部方法
function drawAllElevationLineOn2dMap(ElevationPolyLine, elevationAngle) {
    var eleLines = [];
    var latlons = [];
    for (var i = 0; i < ElevationPolyLine.length; i++) {
        var latlon = [ElevationPolyLine[i].lat * 180 / Math.PI, ElevationPolyLine[i].lon * 180 / Math.PI];
        latlons.push(latlon);
    }
    latlons[latlons.length] = latlons[0]; //首尾闭合
    var lineLayer = null;
    if (elevationAngle == 0) {

        lineLayer = L.polyline([latlons], { weight: 2.5, color: 'rgb(80,126,255)' }); //测试：蓝
        eleLines.push(lineLayer);
        elevationAngleZeroLineGroup = L.layerGroup(eleLines);
        Lmap.addLayer(elevationAngleZeroLineGroup);
    } else if (elevationAngle == 5) {

        lineLayer = L.polyline([latlons], { weight: 2.5, color: 'rgb(50,22,197)' }); //测试：紫
        eleLines.push(lineLayer);
        elevationAngleFiveLineGroup = L.layerGroup(eleLines);
        Lmap.addLayer(elevationAngleFiveLineGroup);

    } else if (elevationAngle == 10) {

        lineLayer = L.polyline([latlons], { weight: 2.5, color: 'rgb(15,95,87)' }); //测试：绿
        eleLines.push(lineLayer);
        elevationAngleTenLineGroup = L.layerGroup(eleLines);
        Lmap.addLayer(elevationAngleTenLineGroup);
    } else {
        lineLayer = L.polyline([latlons], { weight: 2.5, color: 'rgb(191,186,41)' }); //测试：黄
        eleLines.push(lineLayer);
        elevationAngleAddLineGroup = L.layerGroup(eleLines);
        elevationAngleAddLineGroupAll.push(elevationAngleAddLineGroup)
        Lmap.addLayer(elevationAngleAddLineGroup);
    }

}

//绘制仰角线的标注
function drawAllElevationLineLabelsOn2dMap() {
    elevationAngleLinePointGroup = new L.MarkerClusterGroup();
    var icon = L.divIcon({
        html: "0°",
        className: "leaflet-2dmap-icon2",
        iconSize: 20,
    });
    var marker = new L.marker(L.latLng(elevationPolyLineCoordsOfDegreeZero[14500].lat * 180 / Math.PI, elevationPolyLineCoordsOfDegreeZero[14500].lon * 180 / Math.PI), {
        icon: icon,
    });
    elevationAngleLinePointGroup.addLayer(marker);
    var icon2 = L.divIcon({
        html: "5°",
        className: "leaflet-2dmap-icon2",
        iconSize: 20,
    });
    var marker2 = new L.marker(L.latLng(elevationPolyLineCoordsOfDegreeFive[14500].lat * 180 / Math.PI, elevationPolyLineCoordsOfDegreeFive[14500].lon * 180 / Math.PI), {
        icon: icon2,
    });
    elevationAngleLinePointGroup.addLayer(marker2);
    var icon3 = L.divIcon({
        html: "10°",
        className: "leaflet-2dmap-icon2",
        iconSize: 20,
    });
    var marker3 = new L.marker(L.latLng(elevationPolyLineCoordsOfDegreeTen[14100].lat * 180 / Math.PI, elevationPolyLineCoordsOfDegreeTen[14100].lon * 180 / Math.PI), {
        icon: icon3,
    });
    elevationAngleLinePointGroup.addLayer(marker3);
    elevationAngleLinePointGroup.addTo(Lmap);
}

//动态添加仰角线
export const addEleLineOn2dMap2 = (position, num) => {
    getAllElevationLines(position, num);
    drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeAll, num);
    //绘制所有标注点
    drawAllElevationLineLabelsOn2dMap2(num);
}

//动态添加仰角线
function drawAllElevationLineLabelsOn2dMap2(num) {
    if (elevationAngleLinePointGroupAdd == null) elevationAngleLinePointGroupAdd = new L.MarkerClusterGroup();
    if (num != undefined) {
        var icon2 = L.divIcon({
            html: num + "°",
            className: "leaflet-2dmap-icon2",
            iconSize: 20,
        });
        var marker2 = new L.marker(L.latLng(elevationPolyLineCoordsOfDegreeAll[elevationPolyLineCoordsOfDegreeAll.length - 1].lat * 180 / Math.PI, elevationPolyLineCoordsOfDegreeAll[elevationPolyLineCoordsOfDegreeAll.length - 1].lon * 180 / Math.PI), {
            icon: icon2,
        });
        elevationAngleLinePointGroupAdd.addLayer(marker2);
        elevationAngleLinePointGroupAdd.addTo(Lmap);
    }
}

//清除仰角线，默认包含0度，5度，10度
export const clearEleLineOn2dMap = () => {
    try {
        if (elevationAngleLinePointGroupAdd != null) {
            Lmap.removeLayer(elevationAngleLinePointGroupAdd);
            elevationAngleLinePointGroupAdd = null;
        }
        if (elevationAngleAddLineGroupAll.length > 0) {
            elevationAngleAddLineGroupAll.forEach(layer => {
                Lmap.removeLayer(layer);
            })
            elevationAngleAddLineGroupAll = []
        }
    } catch (error) {
        console.log("清除三个角度的仰角线出错：" + error.message);
    }
}

//清除所有仰角线
export const clearAllEleLineOn2dMap = () => {
    if (elevationAngleZeroLineGroup != null) {
        Lmap.removeLayer(elevationAngleZeroLineGroup);
    }
    if (elevationAngleFiveLineGroup != null) {
        Lmap.removeLayer(elevationAngleFiveLineGroup);
    }
    if (elevationAngleTenLineGroup != null) {
        Lmap.removeLayer(elevationAngleTenLineGroup);
    }
    if (elevationAngleLinePointGroup != null) {
        Lmap.removeLayer(elevationAngleLinePointGroup);
        elevationAngleLinePointGroup = null;
    }
    clearEleLineOn2dMap()
}

//控制仰角线的显隐
export const controlElevationLines = (state) => {
    if (!state) {
        if (elevationAngleZeroLineGroup != null) {
            Lmap.removeLayer(elevationAngleZeroLineGroup);
        }
        if (elevationAngleFiveLineGroup != null) {
            Lmap.removeLayer(elevationAngleFiveLineGroup);
        }
        if (elevationAngleTenLineGroup != null) {
            Lmap.removeLayer(elevationAngleTenLineGroup);
        }
        if (elevationAngleLinePointGroupAdd != null) {
            Lmap.removeLayer(elevationAngleLinePointGroupAdd);
        }
        if (elevationAngleAddLineGroupAll.length > 0) {
            elevationAngleAddLineGroupAll.forEach(layer => {
                Lmap.removeLayer(layer);
            })
        }
        if (elevationAngleLinePointGroup != null) {
            Lmap.removeLayer(elevationAngleLinePointGroup);
        }
    } else {
        if (positionLon != null) {
            getAllElevationLines(positionLon);
            drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeZero, 0);
            drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeFive, 5);
            drawAllElevationLineOn2dMap(elevationPolyLineCoordsOfDegreeTen, 10);
            //绘制所有标注点
            drawAllElevationLineLabelsOn2dMap();

            if (elevationAngleLinePointGroupAdd != null) {
                Lmap.addLayer(elevationAngleLinePointGroupAdd);
            }
            if (elevationAngleAddLineGroupAll.length > 0) {
                elevationAngleAddLineGroupAll.forEach(layer => {
                    Lmap.addLayer(layer);
                })
            }
        }
    }
}

//默认恢复轨位为null
export let positionDefault = () => {
    positionLon = null;
}