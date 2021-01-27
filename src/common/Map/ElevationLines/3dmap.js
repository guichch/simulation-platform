import {
    Cartesian3,
    Color,
    Math,
    Entity
} from "cesium";
import { viewer } from "../init3dMap";
import { getAllElevationLines, elevationPolyLineCoordsOfDegreeZero, elevationPolyLineCoordsOfDegreeFive, elevationPolyLineCoordsOfDegreeTen, elevationPolyLineCoordsOfDegreeAll } from "./elevation_line";

var near_water_entity;
//添加默认的仰角线，包含0度，5度，10度
export const addEleLineOn3dMap = (position) => {
    clearAllCustomEleLineOn3dMap()
    near_water_entity = viewer.entities.add(new Entity())
    getAllElevationLines(position);
    drawAllElevationLineOn3dMap(elevationPolyLineCoordsOfDegreeZero, 0);
    drawAllElevationLineOn3dMap(elevationPolyLineCoordsOfDegreeFive, 5);
    drawAllElevationLineOn3dMap(elevationPolyLineCoordsOfDegreeTen, 10);
    //绘制所有标注点
    drawAllElevationLineLabelsOn3dMap();
}

//动态添加仰角线
export const addEleLineOn3dMap2 = (position, num) => {
    getAllElevationLines(position, num);
    drawAllElevationLineOn3dMap(elevationPolyLineCoordsOfDegreeAll, num);
    //绘制所有标注点
    drawAllElevationLineLabelsOn3dMap2(num);
}

//绘制默认的仰角线，包含0度，5度，10度
function drawAllElevationLineOn3dMap(ElevationPolyLine, elevationAngle) {
    var lonlats = [];
    for (var i = 0; i < ElevationPolyLine.length; i++) {
        var point = Cartesian3.fromDegrees(ElevationPolyLine[i].lon * 180 / Math.PI, ElevationPolyLine[i].lat * 180 / Math.PI);
        lonlats.push(point);
    }
    lonlats[lonlats.length] = lonlats[0]; //首尾闭合
    var linename = elevationAngle + "度仰角线";
    if (elevationAngle == 5) {
        linename = "5度仰角线";
    } else if (elevationAngle == 10) {
        linename = "10度仰角线";
    }
    viewer.entities.add({
        parent: near_water_entity,
        id: 'elevationline_' + elevationAngle,
        name: linename,
        polyline: {
            positions: lonlats,
            width: 2,
            material: Color.BLUE,
            clampToGround: true
        }
    });
}

//绘制默认的仰角线标注，包含0度，5度，10度
function drawAllElevationLineLabelsOn3dMap() {
    viewer.entities.add({
        parent: near_water_entity,
        id: 'elevationlinelabel_0',
        position: Cartesian3.fromDegrees(elevationPolyLineCoordsOfDegreeZero[14500].lon * 180 / Math.PI, elevationPolyLineCoordsOfDegreeZero[14500].lat * 180 / Math.PI, 2),
        label: {
            text: '0°',
            showBackground: true,
            backgroundColor: Color.WHITE,
            font: "16px",
            fillColor: Color.BLACK
        }
    });
    viewer.entities.add({
        parent: near_water_entity,
        id: 'elevationlinelabel_5',
        position: Cartesian3.fromDegrees(elevationPolyLineCoordsOfDegreeFive[14500].lon * 180 / Math.PI, elevationPolyLineCoordsOfDegreeFive[14500].lat * 180 / Math.PI, 2),
        label: {
            text: '5°',
            showBackground: true,
            backgroundColor: Color.WHITE,
            font: "16px",
            fillColor: Color.BLACK
        }
    });
    viewer.entities.add({
        parent: near_water_entity,
        id: 'elevationlinelabel_10',
        position: Cartesian3.fromDegrees(elevationPolyLineCoordsOfDegreeTen[14100].lon * 180 / Math.PI, elevationPolyLineCoordsOfDegreeTen[14100].lat * 180 / Math.PI, 2),
        label: {
            text: '10°',
            showBackground: true,
            backgroundColor: Color.WHITE,
            font: "16px",
            fillColor: Color.BLACK
        }
    });



}

//动态添加仰角线
function drawAllElevationLineLabelsOn3dMap2(num) {
    if (num != undefined) {
        console.log(elevationPolyLineCoordsOfDegreeAll)
        viewer.entities.add({
            parent: near_water_entity,
            id: 'elevationlinelabel_' + num,
            position: Cartesian3.fromDegrees(elevationPolyLineCoordsOfDegreeAll[elevationPolyLineCoordsOfDegreeAll.length - 1].lon * 180 / Math.PI, elevationPolyLineCoordsOfDegreeAll[elevationPolyLineCoordsOfDegreeAll.length - 1].lat * 180 / Math.PI, 2),
            label: {
                text: num + '°',
                showBackground: true,
                backgroundColor: Color.WHITE,
                font: "16px",
                fillColor: Color.BLACK
            }
        });
    }
}

//隐藏仰角线
export const Hideasdasd = (state) => {
    near_water_entity.show = state;
}

//清除自定义角度的仰角线
export const clearCustomEleLineOn3dMap = () => {
    var delEntityIds = [];
    for (var i = 0; i < viewer.entities._entities.length; i++) {
        var entity = viewer.entities._entities.values[i];
        var entityid = entity.id;
        //清除自定义角度的仰角线和标记点
        if (entityid.indexOf("elevationline_") != -1 || entityid.indexOf("elevationlinelabel_") != -1) {
            if (entityid != "elevationline_0" &&
                entityid != "elevationline_5" &&
                entityid != "elevationline_10" &&
                entityid != "elevationlinelabel_0" &&
                entityid != "elevationlinelabel_5" &&
                entityid != "elevationlinelabel_10"
            ) {
                delEntityIds.push(entityid);

            }
        }
    }
    delEntityIds = unique(delEntityIds);
    for (var j = 0; j < delEntityIds.length; j++) {
        try {
            viewer.entities.removeById(delEntityIds[j]);
        } catch (error) {
            console.log("removeById of " + delEntityIds[j] + " error:" + error.message);
        }

    }

}

//清除所有仰角线
export const clearAllCustomEleLineOn3dMap = () => {
    var delEntityIds = [];
    for (var i = 0; i < viewer.entities._entities.length; i++) {
        var entity = viewer.entities._entities.values[i];
        var entityid = entity.id;
        //清除自定义角度的仰角线和标记点
        if (entityid.indexOf("elevationline_") != -1 || entityid.indexOf("elevationlinelabel_") != -1) {
            delEntityIds.push(entityid);
        }
    }
    delEntityIds = unique(delEntityIds);
    for (var j = 0; j < delEntityIds.length; j++) {
        viewer.entities.removeById(delEntityIds[j]);
    }
}

function unique(arr) {
    var result = [],
        hash = {};
    for (var i = 0, elem;
        (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}