import { viewer } from "../init3dMap"
import { Color, Cartesian3, Entity, LabelStyle, NearFarScalar } from "cesium"
import { Lmap } from "../init2dMap";
import * as L from 'leaflet';

// import { getSatCoverage } from '@/network/satCoverage'
import satResource from '@/data/satResource.json'
import satCoverage from '@/data/satCoverage.json'
satCoverage.forEach((element, index, arr) => {
  arr[index] = element.data
})


var near_entity
export let allSurfaceBeamViewer3DMap = [];  // 3维波束覆盖数据
export let allSurfaceBeamViewer2DMap = [];  // 2维波束覆盖数据
export const entitieNewParent = () => {
  near_entity = viewer.entities.add(new Entity());
}


// 三维-添加波束面
export const addSurfaceBeam = (data) => {
  if (data.geom) {
    var SurfaceBeam = dealWithData3DMap(JSON.parse(data.geom).coordinates); //处理波束面数据

    var _Color = null;
    if (data && data.color) { //获取波束面对应的颜色
      _Color = data.color;
    }
    if (_Color === null) {
      satResource.forEach(d => { //获取波束面对应的颜色
        if (data.satname == d.satEName) {
          _Color = "rgb(" + d.operatorColorDark + ")"
        }
      })
    }


    //添加的波束面保存在allSurfaceBeamViewer数组中，用于清除
    allSurfaceBeamViewer3DMap.push(
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

//二维-添加波束面
export const addSurfaceBeam2DMap = (data) => {
  var _Color = null;
  if (data && data.color) {
    _Color = data.color; //获取波束面对应的颜色
  }
  if (_Color == null) {
    satResource.forEach(d => {
      if (data.satname == d.satEName) {
        _Color = "rgb(" + d.operatorColorDark + ")"
        console.log(_Color)
      }
    }) //获取卫星对应的波束面的颜色
  }

  if (data.geom) {
    var SurfaceBeam2DMap = dealWithData2DMap(JSON.parse(data.geom).coordinates); //处理波束面的数据
    var SurfaceBeam2DMap2 = dealWithData2DMap2(JSON.parse(data.geom).coordinates); //处理波束面的数据

    allSurfaceBeamViewer2DMap.push(
      L.polygon(SurfaceBeam2DMap, {
        color: _Color,
        weight: 0,
        fillColor: _Color,
        fillOpacity: 0.5
      }).addTo(Lmap)
    );
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

// 处理3维波束面数据
export const dealWithData3DMap = (data) => {
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


// 处理2维波束面数据
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

// 处理2维波束面数据
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

//删除3维波束面
export const deleteSurfaceBeam = () => {
  if (allSurfaceBeamViewer3DMap.length) {
    allSurfaceBeamViewer3DMap.forEach(data => {
      viewer.entities.remove(data);
    });
    allSurfaceBeamViewer3DMap = []
  }
}

//删除2维波束面
export const deleteSurfaceBeam2DMap = () => {
  if (allSurfaceBeamViewer2DMap.length) {
    allSurfaceBeamViewer2DMap.forEach(data => {
      data.remove()
    });
    allSurfaceBeamViewer2DMap = []
  }
}

// 显示卫星覆盖
export const showCoverage = (row, map, Vue) => {
  if (map == '2dmap') {
    deleteSurfaceBeam2DMap();
    for (let item of satCoverage) {
      if (item[0].satname === row.satEName) {
        item.forEach(data => {
          addSurfaceBeam2DMap(data);

        })
        return
      }
    }
    Vue.$message.error("暂无卫星覆盖数据");
  } else {
    deleteSurfaceBeam();
    for (let item of satCoverage) {
      if (item[0].satname === row.satEName) {
        item.forEach(data => {
          addSurfaceBeam(data);

        })
        return
      }
    }
    Vue.$message.error("暂无卫星覆盖数据");
  }
  /*   getSatCoverage(row.satEName)
      .then(res => {
        if (res.length) {
          if (map == '2dmap') {
            deleteSurfaceBeam2DMap();
            res.forEach((data) => {
              addSurfaceBeam2DMap(data); //添加2D包络面
            });
          } else {
            deleteSurfaceBeam();
            res.forEach((data) => {
              addSurfaceBeam(data); //添加3D包络面
            });
          }
        } else {
          Vue.$message.error("暂无卫星覆盖数据");
          if (map == '2dmap') {
            deleteSurfaceBeam2DMap();
          } else {
            deleteSurfaceBeam();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      }); */
}