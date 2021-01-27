export let elevationPolyLineCoordsOfDegreeZero = null,
    elevationPolyLineCoordsOfDegreeFive = null,
    elevationPolyLineCoordsOfDegreeTen = null,
    elevationPolyLineCoordsOfDegreeAll = null;
//获取卫星所有的仰角线，默认包含0度，5度，10度
export const getAllElevationLines = (postionLon, num) => {
    //仰角为0度(无限接近0度)，5度，10度三种，分别计算出来的接收站经纬度是数组集合，步长设置为0.01度
    //接收站纬度边界为-90，90；卫星轨位经度和与接收站经度的差值范围为 -90,90
    var stepLengh = 0.01;
    var elevationAngle = 0;
    elevationAngle = 2.2204 / Math.pow(Math.E, 16); //无限趋近0的数，考虑绝对0度可能存在的计算误差   
    elevationPolyLineCoordsOfDegreeZero = computeSingleElevationLine(90 * Math.PI / 180, -90 * Math.PI / 180, (postionLon + 90) * Math.PI / 180, (postionLon - 90) * Math.PI / 180, elevationAngle * Math.PI / 180, postionLon * Math.PI / 180, stepLengh * Math.PI / 180);


    elevationAngle = 5;
    elevationPolyLineCoordsOfDegreeFive = computeSingleElevationLine(90 * Math.PI / 180, -90 * Math.PI / 180, (postionLon + 90) * Math.PI / 180, (postionLon - 90) * Math.PI / 180, elevationAngle * Math.PI / 180, postionLon * Math.PI / 180, stepLengh * Math.PI / 180);
    //drawAllElevationLines(elevationPolyLineCoordsOfDegreeFive,5);

    elevationAngle = 10;
    //elevationPolyLineCoordsOfDegreeTen=this.computeSingleElevationLine2(elevationAngle,postionLon,stepLengh); 两种循环9000*9000=8100万次，需要半个小时，不适合前端计算，要进行后端处理
    elevationPolyLineCoordsOfDegreeTen = computeSingleElevationLine(90 * Math.PI / 180, -90 * Math.PI / 180, (postionLon + 90) * Math.PI / 180, (postionLon - 90) * Math.PI / 180, elevationAngle * Math.PI / 180, postionLon * Math.PI / 180, stepLengh * Math.PI / 180);
    //drawAllElevationLines(elevationPolyLineCoordsOfDegreeTen,10);
    if (num != undefined) {
        elevationAngle = num;
        elevationPolyLineCoordsOfDegreeAll = computeSingleElevationLine(90 * Math.PI / 180, -90 * Math.PI / 180, (postionLon + 90) * Math.PI / 180, (postionLon - 90) * Math.PI / 180, elevationAngle * Math.PI / 180, postionLon * Math.PI / 180, stepLengh * Math.PI / 180);
    }
}

function computeSingleElevationLine(satEleMaxLat, satEleMinLat, satEleMaxLon, satEleMinLon, satElevationAngle, satPosLon, stepLengh) {
    var ElevationPolyLine = [];
    var ElevationPolyLine_LeftTop = [];
    var ElevationPolyLine_LeftBottom = [];
    var ElevationPolyLine_RightTop = [];
    var ElevationPolyLine_RightBottom = [];
    var stationLeftLon = satPosLon;
    var stationRightLon = satPosLon;
    var stationLeftTopLat;
    var stationLeftBottomLat;
    var stationRightTopLat;
    var stationRightBottomLat;

    while (stationRightLon <= satEleMaxLon && stationLeftLon >= satEleMinLon) //如果左右偏移点都超出仰角线的经度范围，则跳出循环，不再计算仰角线的坐标点位
    {
        stationRightLon = stationRightLon + stepLengh; //轨位经度线的右偏点经度
        stationLeftLon = stationLeftLon - stepLengh; //轨位经度线的左偏点经度
        var tmp1 = 2 * 0.1512695;
        var tmp2 = Math.pow(Math.tan(satElevationAngle), 2);
        var tmp3 = 1 + tmp2;
        var tmp4 = Math.pow(0.1512695, 2) - tmp2;
        if (Math.pow(tmp1, 2) - 4 * tmp3 * tmp4 >= 0) //平方根下的值要大于等0
        {
            var tmp5 = Math.sqrt(Math.pow(tmp1, 2) - 4 * tmp3 * tmp4);
            var tmp6 = (tmp1 + tmp5) / (2 * tmp3); //大的值，用加号算出来的，最后用这个值参与计算
            var tmp7 = (tmp1 - tmp5) / (2 * tmp3); //小的值    

            stationLeftTopLat = Math.acos(tmp6 / Math.cos(satPosLon - stationLeftLon)); //轨位经度线的左偏上部点纬度
            stationLeftBottomLat = Math.acos(tmp7 / Math.cos(satPosLon - stationLeftLon));
            if (stationLeftBottomLat > 0) {
                //轨位经度线的左偏下部点纬度,公式计算出的值都是正数，对于南纬需要加负号，有问题已取消
                stationLeftBottomLat = -stationLeftBottomLat;
            }


            stationRightTopLat = Math.acos(tmp6 / Math.cos(satPosLon - stationRightLon)); //轨位经度线的右偏上部点纬度
            stationRightBottomLat = Math.acos(tmp7 / Math.cos(satPosLon - stationRightLon));
            if (stationRightBottomLat > 0) {
                //轨位经度线的右偏下部点纬度,公式计算出的值都是正数，对于南纬需要加负号
                stationRightBottomLat = -stationRightBottomLat;
            }

            //判断得到的坐标点位是否有效，是否在仰角线矩形框内
            //以卫星轨位经度线和赤道线相交点为圆心，因为仰角线有可能是不对称的，所以分成四个区域计算点，最后再头尾连接所有的点（顺时针）----确保最后的仰角polyline绘制的正确性
            //左上区域得到的点判断
            if (stationLeftLon >= satEleMinLon && stationLeftTopLat <= satEleMaxLat && !isNaN(stationLeftTopLat)) //逆时针，需反转
            {
                var tmppoint1 = {
                    'lon': stationLeftLon,
                    'lat': stationLeftTopLat
                };

                ElevationPolyLine_LeftTop.push(tmppoint1);
            }
            //左下区域得到的点判断
            if (stationLeftLon >= satEleMinLon && stationLeftBottomLat >= satEleMinLat && !isNaN(stationLeftBottomLat)) //顺时针
            {
                //10度仰角，计算出的纬度比-90度小
                var tmppoint2 = {
                    'lon': stationLeftLon,
                    'lat': stationLeftBottomLat
                };
                ElevationPolyLine_LeftBottom.push(tmppoint2);
            }
            //右上区域得到的点判断
            if (stationRightLon <= satEleMaxLon && stationRightTopLat <= satEleMaxLat && !isNaN(stationLeftBottomLat)) //顺时针
            {
                var tmppoint3 = {
                    'lon': stationRightLon,
                    'lat': stationRightTopLat
                };
                ElevationPolyLine_RightTop.push(tmppoint3);
            }
            //右下区域得到的点判断
            if (stationRightLon <= satEleMaxLon && stationRightBottomLat >= satEleMinLat && !isNaN(stationLeftBottomLat)) //逆时针，需反转
            {
                var tmppoint4 = {
                    'lon': stationRightLon,
                    'lat': stationRightBottomLat
                };
                ElevationPolyLine_RightBottom.push(tmppoint4);
            }
        }

    }

    //将四个区域的点进行顺时针连接，形成完整的仰角线
    ElevationPolyLine_LeftTop = ElevationPolyLine_LeftTop.reverse();
    ElevationPolyLine_RightBottom = ElevationPolyLine_RightBottom.reverse();
    //ElevationPolyLine=ElevationPolyLine_LeftTop.concat(ElevationPolyLine_RightTop,ElevationPolyLine_RightBottom,ElevationPolyLine_LeftBottom);
    ElevationPolyLine = ElevationPolyLine_LeftTop.concat(ElevationPolyLine_RightTop);
    ElevationPolyLine = ElevationPolyLine.concat(getBottomHalfPolyline(ElevationPolyLine));
    return ElevationPolyLine;
}

//获取对称的另外一半
function getBottomHalfPolyline(topHalfPolyLine) {
    var bottomPolyLine = [];
    var leftPoint = topHalfPolyLine[0];
    for (var i = topHalfPolyLine.length - 2; i >= 0; i--) {
        var tmpPoint = {
            'lon': topHalfPolyLine[i].lon,
            'lat': leftPoint.lat - (topHalfPolyLine[i].lat - leftPoint.lat)
        }
        bottomPolyLine.push(tmpPoint);
    }
    return bottomPolyLine;
}