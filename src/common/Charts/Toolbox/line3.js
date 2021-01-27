export default {
    title:{
        text: '国际航线旅客运输预测曲线',
        textStyle: {
            fontSize: 25,
            fontWeight: 'normal',
            color: '#fff',
        },
        x: 'center'
    },
    backgroundColor: '#11183c',
    grid: {
        left: '5%',
        right: '10%',
        top: '20%',
        bottom: '15%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            color: '#30eee9'
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#397cbc'
            }
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: '#195384'
            }
        },
        data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
    }],
    yAxis: [{
            type: 'value',
            name: '',
            min: 0,
            max: 7000,
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#2ad1d2'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#27b4c2'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#11366e'
                }
            }
        },

    ],
    series: [{
            name: '已发布',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            symbolSize: 8,
            smooth: true,
            itemStyle: {
                normal: {
                    color: '#00d4c7',
                    lineStyle: {
                        color: "#00d4c7",
                        width: 1
                    },
                }
            },
            data: [2000, 867, 2245, 2819, 3102, 4100, 5175, 5635, 6300]
        },

    ]
};