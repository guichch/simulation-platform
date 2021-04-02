import L from 'leaflet'

// import './leaflet-echarts.js'

let geoMapLayer = L.tileLayer(
  'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 13,
  minZoom: 2
});

export let Lmap = null;
export const initMap = () => {
  var leftBottomCorner = L.latLng(180, -180);
  var rightBottomCorner = L.latLng(-360, 360);
  var bounds = L.latLngBounds(leftBottomCorner, rightBottomCorner);
  Lmap = L.map("leaflet-containter", {
    center: [23.5, 104.4],
    zoom: 3,
    layers: geoMapLayer,
    zoomControl: false,
    measureControl: false,
    layersControl: true,
    preferCanvas: true,
    worldCopyJump: true,
    attributionControl: false,
    maxBounds: bounds
  })
}