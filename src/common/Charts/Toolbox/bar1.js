export  default {

    backgroundColor: 'transparent',

    grid: {
        top: '3%',
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true,

    },
    yAxis: {
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
    xAxis: {
        type: 'category',
        boundaryGap: true,
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
        data: ["10岁以下","10-19岁","20-29岁","30-39岁","40-49岁","50-59岁","60-69岁"]
    },
    series: [{
            barMaxWidth: '40%',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                color: '#238bf2'
            },
            data: [41,175,268,235,156,59,66]
        },
        {
            barMaxWidth: '40%',
            type: 'bar',

            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                color: '#a0d0ff'
            },
            data: [40,169,246,237,173,67,69]
        }
    ]
};