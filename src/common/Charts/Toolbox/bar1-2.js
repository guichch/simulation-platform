export  default {

    backgroundColor: 'transparent',

    grid: {
        top: '3%',
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true,

    },
    xAxis: {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false,

        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        boundaryGap: true,
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 18,
            color:"#fff"
        },
        data: ['网络直播', '照相机', '在线视频', '聚合视频', '网络购物', '在线音乐', '团购', '社区交友', '微博']
    },
    series: [{
            barMaxWidth: '40%',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                color: '#67c23a'
            },
            data: [126, 118, 111, 110, 110, 110, 109, 107, 107]
        },
    ]
};