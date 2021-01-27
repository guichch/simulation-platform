/*
三维波束面
*/
import { viewer } from "../init3dMap"
import { Color, Cartesian3, Entity, LabelStyle, NearFarScalar } from "cesium"
import { allEarthStationData2DMap } from "../EarthStation/EarthStationOperation"
// import { query_Data } from "../../public/drawElement"
export var near_entity,
    allSurfaceBeamViewer = [],
    allSurfaceBeamDataPoint = [],
    ERRP_entity, GT_entity,
    allSurfaceBeamPointViewer_EIRP = [],
    allSurfaceBeamPointViewer_GT = [],
    allSurfaceBeamPointData_EIRP = [],
    allSurfaceBeamPointData_GT = [];
//创建entities父级，用于控制显隐
export const entitieNewParent = () => {
        near_entity = viewer.entities.add(new Entity());
        ERRP_entity = viewer.entities.add(new Entity());
        GT_entity = viewer.entities.add(new Entity());
    }
    //添加波束面(全球视图)
export const addSurfaceBeam = (data) => {
    deleteSurfaceBeamPOINT()
    if (data.geom) {
        var SurfaceBeam = dealWithData(JSON.parse(data.geom).coordinates); //处理波束面数据

        var _Color = null;
        if (data && data.color) { //获取波束面对应的颜色
            _Color = data.color;
        }
        // if (_Color == null) {
        //     _Color = "rgb(172,60,40)"
        // }
        if (_Color == null) {
            JSON.parse(sessionStorage.getItem("allSatCollection")).forEach(d => { //获取波束面对应的颜色
                if (data.satname == d.satEName) {
                    _Color = "rgb(" + d.operatorColorDark + ")"
                }
            })
        }


        //添加的波束面保存在allSurfaceBeamViewer数组中，用于清除
        allSurfaceBeamViewer.push(
            viewer.entities.add({
                parent: near_entity,
                name: "波束面",
                polygon: {
                    hierarchy: Cartesian3.fromDegreesArray(SurfaceBeam),
                    height: 20,
                    material: new Color.fromCssColorString(_Color).withAlpha(.5),
                    clampToGround: true
                }
            })
        );
    }
}

//保存所有波束点
export const savePointData = (res) => {
        allSurfaceBeamPointData_EIRP = []
        res.data.forEach(data => {
            if (data.beamtype == "ERRP") {
                allSurfaceBeamPointData_EIRP.push(data)
            } else {
                allSurfaceBeamPointData_GT.push(data)
            }
        })

    }
    //添加波束点
export const addSurfaceBeamPoint = (data) => {
    if (data.beamtype == "ERRP") {
        AddPointEIRP(data);
    } else {
        AddPointGT(data)
    }
}

//添加EIRP值的波束点
function AddPointEIRP(data) {
    allSurfaceBeamPointViewer_EIRP.push(
        viewer.entities.add({
            parent: ERRP_entity,
            position: Cartesian3.fromDegrees(JSON.parse(data.geom).coordinates[0], JSON.parse(data.geom).coordinates[1], 20000),
            name: "波束点",
            label: {
                text: data.beameirp,
                font: '16px Helvetica',
                fillColor: Color.WHITE,
                backgroundColor: Color.BLACK, //背景颜色
                showBackground: true
            }
        }))
}

//添加G/T值的波束点
function AddPointGT(data) {
    allSurfaceBeamPointViewer_GT.push(viewer.entities.add({
        parent: GT_entity,
        position: Cartesian3.fromDegrees(JSON.parse(data.geom).coordinates[0], JSON.parse(data.geom).coordinates[1]),
        name: "波束点",
        label: {
            text: data.beameirp,
            font: '12px Helvetica',
            fillColor: Color.WHITE,
            outlineColor: Color.WHITE,
            outlineWidth: 2,
            style: LabelStyle.WHITE,
            scaleByDistance: new NearFarScalar(100, 1.0, 200, 1)
        }
    }))
}

//处理波束面数据
export const dealWithData = (data) => {
    var dealWith = [];
    data.forEach(data1 => {
        data1.forEach(data2 => {
            data2.forEach(data3 => {
                dealWith.push(data3[0], data3[1]);
            });
        });
    });
    return dealWith;
}

//删除波束面（全球视图）
export const deleteSurfaceBeam = () => {
    if (allSurfaceBeamViewer.length > 0) {
        allSurfaceBeamViewer.forEach(data => {
            viewer.entities.remove(data);
        });
        allSurfaceBeamViewer = []
    }
}

//控制波束面的显隐
export const SatelliteCoverage3dMap = (state) => {
    if (near_entity != undefined && near_entity != null)
        near_entity.show = state
}

//控制ERRP值的显隐
export const AAAA = (state) => {
    if (ERRP_entity != undefined && ERRP_entity != null)
        ERRP_entity.show = state
}

//控制G/T值的显隐
export const BBBB = (state) => {
    if (GT_entity != undefined && GT_entity != null)
        GT_entity.show = state
}

//添加波束面+点
export const addSurfaceBeamPOINT = (data, data1) => {
    var SurfaceBeam = dealWithData(JSON.parse(data.polygon).coordinates);
    data1.forEach(d => {
        if (d.satEName == data.satname) {
            allSurfaceBeamDataPoint.push(
                viewer.entities.add({
                    parent: near_entity,
                    name: "波束面",
                    polygon: {
                        hierarchy: Cartesian3.fromDegreesArray(SurfaceBeam),
                        height: 0,
                        material: Color.GOLDENROD.withAlpha(0.2),
                        outline: true,
                        outlineColor: Color.BLACK
                    }
                })
            );
        }
    })
}

//删除波束面+点(全球视图)
export const deleteSurfaceBeamPOINT = () => {
    if (allSurfaceBeamDataPoint.length > 0) {
        allSurfaceBeamDataPoint.forEach(data => {
            viewer.entities.remove(data);
        });
        allSurfaceBeamDataPoint = []
    }
}

//滑动条控制EIRP上下界限的值
export const SliderEIRP = (s, x) => {
    deleteSliderEIRP()
    allSurfaceBeamPointData_EIRP.forEach(data => {
        if (s <= parseInt(data.beameirp) && parseInt(data.beameirp) <= x) {
            AddPointEIRP(data)
        }
    });
}

//删除EIRP界限的点
export const deleteSliderEIRP = () => {
    if (allSurfaceBeamPointViewer_EIRP.length > 0) {
        allSurfaceBeamPointViewer_EIRP.forEach(data => {
            viewer.entities.remove(data);
        });
        allSurfaceBeamPointViewer_EIRP = []
    }
}

//滑动条控制G/T上下界限的值
export const SliderGT = (s, x) => {
    if (allSurfaceBeamPointViewer_GT.length > 0) { //allSurfaceBeamPointViewer_GT存的GT点的值
        allSurfaceBeamPointViewer_GT.forEach(data => {
            viewer.entities.remove(data);
        });
        allSurfaceBeamPointViewer_GT = []
    }
    allSurfaceBeamPointData_GT.forEach(data => {
        if (s <= parseInt(data.beameirp) && parseInt(data.beameirp) <= x) {
            AddPointGT(data)
        }
    });
}

/*
二维波束面
*/
import { Lmap } from "../init2dMap";
import * as L from 'leaflet';

let allSurfaceBeamDataQuery2DMap = [],
    allSurfaceBeamViewer2DMap = [],
    allSurfaceBeamViewer2DMapEIRP = [],
    allSurfaceBeamViewer2DMapGT = [],
    allSurfaceBeamPointData2DMap_EIRP = [],
    allSurfaceBeamPointData2DMap_GT = [];
//添加波束面-空间查询
export const addSurfaceBeamPOINT2DMap = (data, data1) => {
    //绘制第一个波束面
    var SurfaceBeam2DMap = dealWithData2DMap(JSON.parse(data.polygon).coordinates);

    data1.forEach(d => {
            if (d.satEName == data.satname) {
                allSurfaceBeamDataQuery2DMap.push(
                    L.polygon(SurfaceBeam2DMap, {
                        color: 'BLACK',
                        weight: 1,
                        fillColor: 'GOLDENROD',
                        fillOpacity: 0.2
                    }).addTo(Lmap)
                );
            }
        })
        //绘制第二个波束面
    var SurfaceBeam2DMap2 = dealWithData2DMap2(JSON.parse(data.polygon).coordinates);

    data1.forEach(d => {
        if (d.satEName == data.satname) {
            allSurfaceBeamDataQuery2DMap.push(
                L.polygon(SurfaceBeam2DMap2, {
                    color: 'BLACK',
                    weight: 1,
                    fillColor: 'GOLDENROD',
                    fillOpacity: 0.2
                }).addTo(Lmap)
            );
        }
    })
}

//处理二维波束面数据
export const dealWithData2DMap = (data) => {
    var dealWith = [];
    data.forEach(data1 => {
        data1.forEach(data2 => {
            data2.forEach(data3 => {
                dealWith.push([data3[1], data3[0]]);
            });
        });
    });
    return dealWith;
}

//处理二维波束面数据加载2遍
export const dealWithData2DMap2 = (data) => {
    var dealWith = [];
    data.forEach(data1 => {
        data1.forEach(data2 => {
            data2.forEach(data3 => {
                dealWith.push([data3[1], data3[0] + 360]);
            });
        });
    });
    return dealWith;
}

//清除二维波束面-空间查询
export const deleteSurfacebeamQuery2DMap = () => {
    if (allSurfaceBeamDataQuery2DMap.length > 0) {
        allSurfaceBeamDataQuery2DMap.forEach(data => {
            data.remove()
        })
    }
    allSurfaceBeamDataQuery2DMap = []
}

//二维-添加波束面-点击显示卫星详情
export const addSurfaceBeam2DMap = (data) => {
    var _Color = null;
    if (data && data.color) {
        _Color = data.color; //获取波束面对应的颜色
    }
    if (_Color == null) {
        JSON.parse(sessionStorage.getItem("allSatCollection")).forEach(d => {
                if (data.satname == d.satEName) {
                    _Color = "rgb(" + d.operatorColorDark + ")"
                }
            }) //获取卫星对应的波束面的颜色
    }

    if (data.geom) {
        var SurfaceBeam2DMap = dealWithData2DMap(JSON.parse(data.geom).coordinates); //处理波束面的数据

        allSurfaceBeamViewer2DMap.push(
            L.polygon(SurfaceBeam2DMap, {
                color: _Color,
                weight: 0,
                fillColor: _Color,
                fillOpacity: 0.5
            }).addTo(Lmap)
        );

        var SurfaceBeam2DMap2 = dealWithData2DMap2(JSON.parse(data.geom).coordinates); //处理波束面的数据，2次加载波束面，为了波束面的完整性

        allSurfaceBeamViewer2DMap.push(
            L.polygon(SurfaceBeam2DMap2, {
                color: _Color,
                weight: 0,
                fillColor: _Color,
                fillOpacity: 0.5
            }).addTo(Lmap)
        );
    }
}

//二维添加波束点-点击显示卫星详情
export const addSurfaceBeamPoint2DMap = (data) => {
    if (data.beamtype == "ERRP") {
        allSurfaceBeamPointData2DMap_EIRP.push(data)
        AddPointEIRP2DMap(data)
    } else {
        allSurfaceBeamPointData2DMap_GT.push(data)
        AddPointGT2DMap(data)
    }
}

//二维添加EIRP值的波束点-点击显示卫星详情
function AddPointEIRP2DMap(data) {
    var myIcon = L.divIcon({
        html: data.beameirp,
        className: 'my-div-icon',
        iconSize: 30
    });
    allSurfaceBeamViewer2DMapEIRP.push(L.marker([JSON.parse(data.geom).coordinates[1], JSON.parse(data.geom).coordinates[0]], { icon: myIcon }).addTo(Lmap))
}

//二维添加G/T值的波束点-点击显示卫星详情
function AddPointGT2DMap(data) {
    var myIcon = L.divIcon({
        html: data.beameirp,
        className: 'my-div-icon',
        iconSize: 30
    });
    allSurfaceBeamViewer2DMapGT.push(L.marker([JSON.parse(data.geom).coordinates[0], JSON.parse(data.geom).coordinates[1]], { icon: myIcon }).addTo(Lmap))
}

//二维删除波束面--点击显示卫星详情
export const deleteSurfaceBeam2DMap = () => {
    if (allSurfaceBeamViewer2DMap.length > 0) {
        allSurfaceBeamViewer2DMap.forEach(data => {
            data.remove()
        });
        allSurfaceBeamViewer2DMap = []
    }
    if (allSurfaceBeamViewer2DMapEIRP.length > 0) {
        allSurfaceBeamViewer2DMapEIRP.forEach(data => {
            data.remove()
        });
        allSurfaceBeamViewer2DMapEIRP = []
    }
    allSurfaceBeamPointData2DMap_EIRP = []
}

//二维输入上下界限值显示EIRP值
export const UpAndDownThresholdValue = (up, down) => {
    if (allSurfaceBeamPointData2DMap_EIRP.length > 0) {
        deleteEIRP2DMap()
        allSurfaceBeamPointData2DMap_EIRP.forEach(data => {
            if (up <= parseInt(data.beameirp) && parseInt(data.beameirp) <= down) {
                AddPointEIRP2DMap(data)
            }
        });
    }
    if (allSurfaceBeamPointData2DMap_GT.length > 0) {
        deleteGT2DMap()
        allSurfaceBeamPointData2DMap_GT.forEach(data => {
            if (up <= parseInt(data.beameirp) && parseInt(data.beameirp) <= down) {
                AddPointEIRP2DMap(data)
            }
        });
    }
}

//二维清除地图上的EIRP值
function deleteEIRP2DMap() {
    if (allSurfaceBeamViewer2DMapEIRP.length > 0) {
        allSurfaceBeamViewer2DMapEIRP.forEach(data => {
            data.remove();
        });
        allSurfaceBeamViewer2DMapEIRP = []
    }
}

//二维清除地图上的GT值
function deleteGT2DMap() {
    if (allSurfaceBeamViewer2DMapGT.length > 0) {
        allSurfaceBeamViewer2DMapGT.forEach(data => {
            data.remove();
        });
        allSurfaceBeamViewer2DMapGT = []
    }
}

//二维控制卫星覆盖面的显隐
export const satelliteCoverage2DMap = (state) => {
    if (!state) {
        if (allSurfaceBeamViewer2DMap.length > 0) {
            allSurfaceBeamViewer2DMap.forEach(data => {
                data.remove()
            });
        }
    } else {
        if (allSurfaceBeamViewer2DMap.length > 0) {
            allSurfaceBeamViewer2DMap.forEach(data => {
                data.addTo(Lmap)
            });
        }
    }
}

//二维控制EIRP值的显隐
export const EIRP2DMap = (state) => {
    if (!state) {
        allSurfaceBeamViewer2DMapEIRP.forEach(data => {
            data.remove()
        });
    } else {
        allSurfaceBeamViewer2DMapEIRP.forEach(data => {
            data.addTo(Lmap)
        });
    }
}

//二维控制G/T的显隐
export const GT2DMap = (state) => {
    if (!state) {
        allSurfaceBeamViewer2DMapGT.forEach(data => {
            data.remove()
        });
    } else {
        allSurfaceBeamViewer2DMapGT.forEach(data => {
            data.addTo(Lmap)
        });
    }
}

//二维控制地球站的显隐
export const EarthStationCoverage2DMap = (state) => {
    if (!state) {
        if (allEarthStationData2DMap.length > 0) {
            allEarthStationData2DMap.forEach(data => {
                data.remove()
            });
        }
    } else {
        if (allEarthStationData2DMap.length > 0) {
            allEarthStationData2DMap.forEach(data => {
                data.addTo(Lmap)
            });
        }
    }
}

//滑动条控制EIRP上下界限的值
export const SliderEIRP2DMap = (up, down) => {
    deleteEIRP2DMap()
    allSurfaceBeamPointData2DMap_EIRP.forEach(data => {
        if (up <= parseInt(data.beameirp) && parseInt(data.beameirp) <= down) {
            AddPointEIRP2DMap(data)
        }
    });
}

//滑动条控制G/T上下界限的值
export const SliderGT2DMap = (up, down) => {
    deleteGT2DMap()
    allSurfaceBeamPointData2DMap_GT.forEach(data => {
        if (up <= parseInt(data.beameirp) && parseInt(data.beameirp) <= down) {
            AddPointGT2DMap(data)
        }
    });
}