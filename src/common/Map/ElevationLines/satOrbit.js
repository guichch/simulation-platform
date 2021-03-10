import { getSatResource } from "@/network/satResource"
import { viewer } from "../init3dMap"
import { CzmlDataSource, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium'
import { stationarySatellite } from "@/assets/data/stationarySatellite"
import { Lmap } from "../init2dMap"
import L from 'leaflet'
import store from '@/store'
export let searchedSatCollection, satMarkers, marker;
export let markersAll = [];
//获取全部卫星
export const getSatCollection = (map) => {
  if (sessionStorage.getItem("allSatCollection") == null) { //如果缓存中没有卫星数据的话
    getSatResource().then(res => {
      if (res.length > 0) {
        searchedSatCollection = res;
        sessionStorage.setItem("allSatCollection", JSON.stringify(searchedSatCollection)) //保存到缓存中
        localStorage.setItem("allSatCollection", JSON.stringify(searchedSatCollection)) //保存到缓存中
        SatOrbit(searchedSatCollection, map, true) //添加卫星点以及轨道
      }
    });
  } else { //如果缓存中有数据
    SatOrbit(JSON.parse(sessionStorage.getItem("allSatCollection")), map, true) ////添加卫星点以及轨道
  }
}

let searchedSatCollectionLength = 0;
//添加卫星
export const SatOrbit = (searchedSatCollection, map, handlerState) => {
  searchedSatCollectionLength = searchedSatCollection.length;
  if (map == "3dmap") {
    viewer.dataSources.removeAll(true);
    if (searchedSatCollectionLength > 100) {
      //添加卫星
      viewer.dataSources.add(CzmlDataSource.load(buildCZML(searchedSatCollection)));
    }
    //添加卫星
    viewer.dataSources.add(CzmlDataSource.load(buildCZMLImage(searchedSatCollection)));
    //添加卫星轨道
    viewer.dataSources.add(CzmlDataSource.load(stationarySatellite));

    var handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) { //鼠标移动到轨道上的卫星的时候，显示卫星基本详情
      var pick = viewer.scene.pick(movement.endPosition);
      var satNameDiv = document.getElementById("satellite-name");
      if (pick != null) { //鼠标在卫星上
        if (pick.id._label) {
          if (pick.id._label._text._value != "CHINASAT_6A_37150") {
            satNameDiv.style.display = "block"
            satNameDiv.style.left = movement.endPosition.x + 10 + "px"
            satNameDiv.style.top = movement.endPosition.y + 100 + "px"
            searchedSatCollection.forEach(f => {
              if (f.satEName == pick.id._label._text._value) {

                satNameDiv.innerHTML = "卫星名称:" + f.satEName + "</br>卫星轨位:" + orbitalEorW(f.satPosition) + "</br>卫星用途:" + f.satFunction + ""
              }
            })
          }
        }
      } else { //鼠标不在卫星上
        satNameDiv.style.display = "none"
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    if (handlerState) { //鼠标点击卫星
      handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.position);
        if (pick != null) { //鼠标点击卫星后
          if (pick.id._label) {
            if (pick.id._label._text._value != "CHINASAT_6A_37150") {
              searchedSatCollection.forEach(f => {
                if (f.satEName == pick.id._label._text._value) {
                  store.commit('endMiniPanel')
                  store.commit('startPanel');
                  store.commit('setParamsEasy', f);
                  store.commit('endEarthPanel')
                }
              })
            }
          }
        }
      }, ScreenSpaceEventType.LEFT_CLICK);
    }


    handler.setInputAction(function () { //三维球放大缩小事件
      if (searchedSatCollectionLength > 100) {
        var height = viewer.camera.positionCartographic.height;
        if (height < 9000000) { //低于900万公里的话
          viewer._dataSourceCollection._dataSources[0]._entityCollection._entities._array.forEach(f => { //隐藏卫星点
            f._show = false
          })
          viewer._dataSourceCollection._dataSources[1]._entityCollection._entities._array.forEach(f1 => { //显示卫星图标
            f1._show = true
          })
        }
        if (height > 9000000) { //高于900万公里的话
          viewer._dataSourceCollection._dataSources[0]._entityCollection._entities._array.forEach(f => { //显示卫星点
            f._show = true
          })
          viewer._dataSourceCollection._dataSources[1]._entityCollection._entities._array.forEach(f1 => { //隐藏卫星图标
            f1._show = false
          })
        }
      }
    }, ScreenSpaceEventType.WHEEL);
    if (searchedSatCollectionLength > 100) {
      viewer._dataSourceCollection._dataSources[1]._entityCollection._entities._array.forEach(f1 => {
        f1._show = false
      })
    }
  } else {
    // satMarkers = new L.MarkerClusterGroup();
    for (var j = 0; j < searchedSatCollection.length; j++) {
      var satcname2d = searchedSatCollection[j].satEName;
      var satlng2d = searchedSatCollection[j].satPosition;
      var wd2d = 0;
      if (searchedSatCollectionLength > 100) {
        getStaMarker(satcname2d, satlng2d, wd2d, searchedSatCollection[j]);
      } else {
        getStaMarkerImage(satcname2d, satlng2d, wd2d, searchedSatCollection[j])
      }
    }
    // satMarkers.addTo(Lmap);
    //添加赤道线
    addEquatorLine();
    // 添加卫星移入以及点击事件
    markersAll.forEach((marker) => {
      marker.on("click", function () {
        store.commit('endMiniPanel')
        store.commit('startPanel');
        store.commit('setParams', this);
        store.commit('endEarthPanel')
      });
      marker.on("mouseover", function (e) {
        var satNameDiv = document.getElementById("satellite-name");
        satNameDiv.style.display = "block";
        satNameDiv.style.left = e.containerPoint.x + 10 + "px";
        satNameDiv.style.top = e.containerPoint.y + 100 + "px";
        satNameDiv.innerHTML = "卫星名称:" + e.target.options.title;
      });
      marker.on("mouseout", function () {
        var satNameDiv = document.getElementById("satellite-name");
        satNameDiv.style.display = "none";
      });
    });
  }
}


/*
二维-卫星及轨道
*/

/* 添加赤道上的卫星相关方法  开始 */
//添加赤道线
function addEquatorLine() {
  var latlngs = [
    [0, -180],
    [0, 180]
  ];
  L.polyline(latlngs, { color: 'red', opacity: '1', weight: '2', dashArray: '4' }).addTo(Lmap);
}

//卫星用颜色点表示
function getStaMarker(satcname2d, satpos2d, wd2d, searchedSatCollection) {
  if (searchedSatCollection.operatorColorDark) {
    var _color = 'rgb(' + searchedSatCollection.operatorColorDark + ')';
    marker = new L.circle(L.latLng(wd2d, satpos2d), { title: satcname2d, color: _color, fillColor: _color, radius: 120000, fillOpacity: 1, attribute: searchedSatCollection }).addTo(Lmap)
    markersAll.push(marker)
  }
  // satMarkers.addLayer(marker);
}
//卫星用图片表示
function getStaMarkerImage(satcname2d, satpos2d, wd2d, searchedSatCollection) {
  //定义卫星图标，显示内容和点击事件等
  var satIcon = L.icon({
    iconUrl: require('@/assets/img/sat2dmap (2).png'),
    iconSize: [48, 48],
  });
  marker = new L.Marker(L.latLng(wd2d, satpos2d), { title: satcname2d, icon: satIcon, attribute: searchedSatCollection }).addTo(Lmap);
  markersAll.push(marker)
  // satMarkers.addLayer(marker);
}


//卫星用颜色点表示
function buildCZML(searchedSatCollection) {
  var czml = [{
    "id": "document",
    "version": "1.0",
    "clock": {
      "interval": "2018-07-12T13:00:10Z/2218-07-12T14:00:00Z",
      "multiplier": 1,
      "range": "CLAMPED",
      "step": "SYSTEM_CLOCK_DEPENDENT"
    }
  }];


  for (var i = 0; i < searchedSatCollection.length; i++) {
    var satename3d = searchedSatCollection[i].satEName;
    var satcname3d = searchedSatCollection[i].satEName;
    var satpos3d = searchedSatCollection[i].satPosition;
    var wd3d = 0;
    if (searchedSatCollection[i].operatorColorDark) {

      var r = parseInt(searchedSatCollection[i].operatorColorDark.split(",")[0]);
      var g = parseInt(searchedSatCollection[i].operatorColorDark.split(",")[1]);
      var b = parseInt(searchedSatCollection[i].operatorColorDark.split(",")[2]);

      czml[czml.length] = {
        //卫星图片
        // "billboard": {
        //     "show": true,
        //     "image": "data:image/png;base64,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",
        //     "scale": 1.5
        // },
        "id": satename3d,
        "availability": "2018-07-12T13:00:25Z/2218-07-12T14:00:00Z",
        "label": {
          "fillColor": [{
            "rgba": [
              255,
              255,
              0,
              255
            ]
          }],
          "font": "bold 12pt Segoe UI Semibold",
          "horizontalOrigin": "CENTER",
          "pixelOffset": {
            "cartesian2": [
              50.0,
              0
            ]
          },
          "scale": 1.0,
          "style": "FILL",
          "text": satcname3d,
          "verticalOrigin": "TOP",
          "show": false
        },
        "orientation": {
          "unitQuaternion": [-0.4284346042108477, 0.21192184119981214, 0.7077308400932906, 0.5202403109314205]
        },
        "position": {
          //"cartographicDegrees": [satpos3d, wd3d, 5000000] //卫星的经纬度，高度
          "cartographicDegrees": [satpos3d, wd3d, 36000000] //卫星的经纬度，高度
        },
        "text": "卫星轨位",
        "point": {
          "show": true,
          "color": {
            "rgba": [r, g, b, 255]
          },
          "outlineWidth": 1,
          "pixelSize": 15
        },
        click: function () {
          alert(1111)
        }
      }

    }
  }

  return czml;
}

//卫星用图片表示
function buildCZMLImage(searchedSatCollection) {
  var czml = [{
    "id": "document",
    "version": "1.0",
    "clock": {
      "interval": "2018-07-12T13:00:10Z/2218-07-12T14:00:00Z",
      "multiplier": 1,
      "range": "CLAMPED",
      "step": "SYSTEM_CLOCK_DEPENDENT"
    }
  }];


  for (var i = 0; i < searchedSatCollection.length; i++) {
    var satename3d = searchedSatCollection[i].satEName;
    var satcname3d = searchedSatCollection[i].satEName;
    var satpos3d = searchedSatCollection[i].satPosition;
    var wd3d = 0;
    czml[czml.length] = {
      //卫星图片
      "billboard": {
        "show": true,
        "image": "data:image/png;base64,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",
        "scale": 1.5
      },
      "id": satename3d,
      "availability": "2018-07-12T13:00:25Z/2218-07-12T14:00:00Z",
      "label": {
        "fillColor": [{
          "rgba": [
            255,
            255,
            0,
            255
          ]
        }],
        //"outlineColor": {"rgba": [0, 0, 0, 255]},
        "font": "bold 12pt Segoe UI Semibold",
        "horizontalOrigin": "CENTER",
        "pixelOffset": {
          "cartesian2": [
            50.0,
            0
          ]
        },
        "scale": 1.0,
        "style": "FILL",
        "text": satcname3d,
        "verticalOrigin": "TOP",
        "show": false
      },
      "model": {
        "gltf": "/3D/Apps/SampleData/models/weixin.gltf", //没起作用
        "scale": 1
      },
      "orientation": {
        "unitQuaternion": [-0.4284346042108477, 0.21192184119981214, 0.7077308400932906, 0.5202403109314205]
      },
      "position": {
        "cartographicDegrees": [satpos3d, wd3d, 36000000] //卫星的经纬度，高度
      }
    }
  }
  return czml;
}

//清除轨道上的卫星
export const clearSatellite2DMap = () => {
  if (markersAll.length > 0) {
    markersAll.forEach(marker => {
      marker.remove();
    })
  }
  markersAll = []
}

//控制卫星位置的显隐
export const controlSatellite = (state) => {
  if (!state) {
    if (markersAll.length > 0) {
      markersAll.forEach(marker => {
        marker.remove();
      })
    }
  } else {
    if (markersAll.length > 0) {
      markersAll.forEach(marker => {
        marker.addTo(Lmap);
      })
    }
  }
}

//轨位设置公用
export const orbitalEorW = (satPosition) => {
  let LonLabel = "";
  if (satPosition < 0) {
    LonLabel = -satPosition + "°W"
  } else if (satPosition > 0) {
    LonLabel = satPosition + "°E"
  } else {
    LonLabel = satPosition + "°"
  }

  return LonLabel;
}