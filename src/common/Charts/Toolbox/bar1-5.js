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
        data: ['股票', '棋牌', '银行', '射击', '即时通讯', '支付', '厂商刻览器', '厂商商店', '休闲益智', '游戏商店']
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
                color: '#e6a23c'
            },
            data: [133, 115, 115, 99, 97, 96, 95, 94, 90, 89]
        },
    ]
};