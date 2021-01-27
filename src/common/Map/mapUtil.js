import {
    CallbackProperty,
    Color,
    Cartesian2,
    ImageMaterialProperty
} from 'cesium'

export function getBSRxyz(x1, y1, x2, y2, h) {
    let arr3d = getBSRPoints(x1, y1, x2, y2, h)
    let arrAll = []
    for (let i in arr3d) {
        arrAll.push(arr3d[i][0])
        arrAll.push(arr3d[i][1])
        arrAll.push(arr3d[i][2])
    }
    return arrAll
}

export function RandomColorMaterial() {
    // 先添加两个canvas画布
    // 因为画布内变化CallbackProperty监控不到，所以用两个画布切换的方式达成效果
    let link = document.createElement('canvas')
    link.style.width = '700px'
    link.style.height = '100px'
    link.setAttribute('class', 'canvas')
    link.setAttribute('id', 'canvas-a')
    this.$refs.mainDiv.appendChild(link)

    let link2 = document.createElement('canvas')
    link2.style.width = '700px'
    link2.style.height = '100px'
    link2.setAttribute('class', 'canvas')
    link2.setAttribute('id', 'canvas-b')
    this.$refs.mainDiv.appendChild(link2)

    // 生成材质
    let i = 100 // 控制图片出现时间
    let colori = '#22a7f0' // 控制光效颜色
    let curCanvas = 'a' // 控制canvas的id
    let RandomColorMaterial = new ImageMaterialProperty({
        //添加回调
        image: new CallbackProperty(() => {
            var canvas = document.getElementById("canvas-" + curCanvas);
            let cwidth = 700;
            let cheight = 100;
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.src = '/images/light.png';
            ctx.clearRect(0, 0, cwidth, cheight);
            ctx.fillStyle = '#db0a5b';
            ctx.fillRect(0, 0, cwidth, cheight);
            img.onload = function () {
                if (i <= cwidth) {
                    ctx.drawImage(img, i, -100);
                } else {
                    i = -100
                }
                i += 7; // 控制光效移动速度
            }
            curCanvas = curCanvas === 'a' ? 'b' : 'a'; // 切换画布
            return canvas;
        }, false),
        repeat: new Cartesian2(1.0, 1.0),
        transparent: false,
        color: Color.fromCssColorString(colori).withAlpha(0.8)
    })

    return RandomColorMaterial
}

// 贝塞尔曲线二维转三维  返回一个三维点数组
// 参数： x1,y1,x2,y2,h 两点经纬度坐标和飞线高度
function getBSRPoints(x1, y1, x2, y2, h) {
    let point1 = [y1, 0]
    let point2 = [(y2 + y1) / 2, h]
    let point3 = [y2, 0]
    let arr = getBSR(point1, point2, point3)
    let arr3d = []
    for (let i in arr) {
        let x = (x2 - x1) * (arr[i][0] - y1) / (y2 - y1) + x1
        arr3d.push([x, arr[i][0], arr[i][1]])
    }
    return arr3d
}

// 生成贝塞尔曲线
function getBSR(point1, point2, point3) {
    var ps = [{
        x: point1[0],
        y: point1[1]
    }, {
        x: point2[0],
        y: point2[1]
    }, {
        x: point3[0],
        y: point3[1]
    }]
    let guijipoints = CreateBezierPoints(ps, 100);
    return guijipoints
}


// 贝赛尔曲线算法
// 参数：
// anchorpoints: [{ x: 116.30, y: 39.60 }, { x: 37.50, y: 40.25 }, { x: 39.51, y: 36.25 }]
function CreateBezierPoints(anchorpoints, pointsAmount) {
    var points = [];
    for (var i = 0; i < pointsAmount; i++) {
        var point = MultiPointBezier(anchorpoints, i / pointsAmount)
        points.push([point.x, point.y]);
    }
    return points;
}

function MultiPointBezier(points, t) {
    var len = points.length;
    var x = 0,
        y = 0;
    var erxiangshi = function (start, end) {
        var cs = 1,
            bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };
    for (var i = 0; i < len; i++) {
        var point = points[i];
        x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
        y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (erxiangshi(len - 1, i));
    }
    return {
        x: x,
        y: y
    };
}