import L from "leaflet";
import echarts from "echarts"
import 'echarts/lib/chart/lines'
import "echarts/map/js/world"


(L.OverlayEcharts = (L.version < "1.0" ? L.Class : L.Layer).extend({
    includes: L.version < "1.0" ? L.Mixin.Events : [],
    _echartsContainer: null,
    _map: null,
    _echart: null,
    _echartsOption: null,
    initialize: function (echartsOption) {
        this._echartsOption = echartsOption;
    },
    onAdd: function (map) {
        this._map = map;
        this._initEchartsContainer();
        map.on("moveend", this._redraw, this); //当地图中心改变后触发
        this._redraw();
    },
    onRemove: function (map) {
        this._echartsContainer &&
            map.getPanes().overlayPane.removeChild(this._echartsContainer);
        this._echart.dispose();
        map.off("moveend", this._redraw, this);
    },
    _initEchartsContainer: function () {
        var size = this._map.getSize(),
        echartsContainer = document.createElement("div");
        echartsContainer.style.position = "absolute";
        echartsContainer.style.height = size.y + "px";
        echartsContainer.style.width = size.x + "px";
        echartsContainer.style.zIndex = 999;
        this._echartsContainer = echartsContainer;
        this._map.getPanes().overlayPane.appendChild(this._echartsContainer); //在map容器的overlayPane上叠加Echarts容器
    },
    _resetCanvasPosition: function () {
        var bound = this._map.getBounds(),
            origin = this._map.latLngToLayerPoint(bound.getNorthWest());
        L.DomUtil.setPosition(this._echartsContainer, origin); //设置Echarts容器的位置，以便与当前地图匹配
    },
    _redraw: function () {
        this._resetCanvasPosition();
        this.initECharts();
        this.setOption(this._echartsOption);
        return this;
    },
    clear: function () {
        (this._echartsContainer.innerHTML = ""), (this.echartsOption = {});
    },
    redraw: function () {
        this._redraw();
    },
    initECharts: function () {
        if (this._echart === null || this._echart === undefined) {
            this._initECharts();
        } else {
            // this._echart.dispose();
            this._initECharts();
        }
    },
    _initECharts: function () {
        if (
            ((this._echart = echarts.init(this._echartsContainer)),
                "3.0" <= echarts.version)
        ) {
            var me = this;
            me._echart._geo.prototype.dataToPoint = function (lnglat) {
                //重写Echarts内部方法,Ecahrts内部有一套将经纬度转为像素坐标的方法，这里要换成与Leaflet相匹配的
                var latlng = new L.latLng(lnglat[1], lnglat[0]),
                    pixel = me._map.latLngToContainerPoint(latlng);
                return [pixel.x, pixel.y]; //给定地理坐标，返回相对于地图container容器的相应像素坐标。
            };
        }
        this._unbindEvent(); //屏蔽Echarts相关事件
    },
    setOption: function (echartsOption) {
        if (echartsOption.series) {
            this._echart.setOption(echartsOption, {
                lazyUpdate: true,
            });
        }
    },
    _unbindEvent: function () {
        echarts.version < "3.0" ?
            (this._echart.getZrender().un("dragstart", function () {}),
                this._echart.getZrender().un("dragend", function () {}),
                this._echart.getZrender().un("mouseup", function () {}),
                this._echart.getZrender().un("mousedown", function () {}),
                this._echart.getZrender().un("mousewheel", function () {})) :
            (this._echart.getZr().off("dragstart", function () {}),
                this._echart.getZr().off("dragend", function () {}),
                this._echart.getZr().off("mouseup", function () {}),
                this._echart.getZr().off("mousedown", function () {}),
                this._echart.getZr().off("mousewheel", function () {}));
    },
})),
(L.overlayEcharts = function (options) {
    return new L.OverlayEcharts(options);
});