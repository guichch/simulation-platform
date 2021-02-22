import * as Cesium from 'cesium';
import { viewer } from "../init3dMap";
import { Lmap } from "../init2dMap"
import L from 'leaflet'
var EarthStationView = [],
  EarthStationView2 = [];
export const allEarthStationData2DMap = [];

//添加地球站点
export let addPointEarthStation = (EarthStationData, map, obj) => {
  var imageURL = "";
  if (EarthStationView.length > 0) {
    clearPointEarthStation()
  }
  if (allEarthStationData2DMap.length > 0) {
    clearPointEarthStation2()
  }
  EarthStationData.forEach(data => {
    if (data.teleportOwnership) {
      imageURL = "/img/earthstation1.png"
    } else if (!data.teleportOwnership) {
      imageURL = "/img/earthstation2.png"
    }
    if (map == "3dmap") {
      EarthStationView.push( //EarthStationView保存所有的地球站点
        viewer.entities.add({
          name: "地球站",
          id: data.teleportName,
          position: Cesium.Cartesian3.fromDegrees(data.teleportLongitude, data.teleportLatitude),
          billboard: {
            image: imageURL,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: 1,
            width: 24,
            height: 25
          }
        })
      )
    } else if (map == "2dmap") {
      var satIcon = L.icon({
        iconUrl: imageURL,
        iconSize: [24, 25],
      });
      let marker = new L.Marker(L.latLng(data.teleportLatitude, data.teleportLongitude), { icon: satIcon, attribute: data }).addTo(Lmap);
      EarthStationView2.push(marker); //EarthStationView2保存所有的地球站点
      marker.on('click', function (e) { //点击地球站点，显示地球站点的信息
        obj.$store.commit('startEarthPanel')
        obj.$store.commit('endPanel');
        obj.$store.commit('setEarthInfo', this.options.attribute)
      });
      //需要测试
      allEarthStationData2DMap.push(marker)
    }
  })

  if (map == "3dmap") {
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) { //点击地球站点，显示地球站点的信息
      var pick = viewer.scene.pick(movement.position);
      if (pick != null) {
        if (pick.id._name == "地球站") {
          let row = null;
          EarthStationData.forEach(f => {
            if (f.teleportName == pick.id._id) {
              row = f
            }
          })
          //点击地球站点，显示地球站点的信息
          console.log(row)
          obj.$store.commit('startEarthPanel')
          obj.$store.commit('endPanel');
          obj.$store.commit('setEarthInfo', row)
        }

      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  }
}

//清除地球站点-三维
export const clearPointEarthStation = () => {
  EarthStationView.forEach(data => {
    viewer.entities.remove(data)
  })
  EarthStationView = [];
}

//清除地球站点-二维
export const clearPointEarthStation2 = () => {
  EarthStationView2.forEach(data => {
    data.remove()
  })
  EarthStationView2 = [];
}

//隐藏地球站点-二维
export const HiddenPointEarthStation2 = (state) => {
  if (!state) {
    EarthStationView2.forEach(data => {
      Lmap.removeLayer(data)
    })
  } else {
    EarthStationView2.forEach(data => {
      Lmap.addLayer(data)
    })
  }
}