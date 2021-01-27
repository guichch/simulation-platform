
export default {
    
    color: ['#4C98FB', '#83CCE7',],
    legend: {
        top: 10,
        left: 200,
        itemWidth: 10,
        itemHeight: 10,
        // padding: [5, 10],
        textStyle: {
            fontSize: 14,
            color: '#96A4F4',
            padding: [3, 0, 0, 0]
        },
        data: ['男', '女'],
        show:true
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '13%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            color: '#96A4F4'
        },
        axisLine: {
            lineStyle: {
                color: '#96A4F4'
            },
            width: 5
        },
        axisTick: {
            show: false,
        },
        data: ['2018.12', '2019.6', ]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#96A4F4'
        },
        axisLine: {
            lineStyle: {
                color: '#96A4F4'
            },
            width: 5
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(150, 164, 244, 0.3)'
            }
        },
    },
    series: [
        {
            name: '男',
            type: 'bar',
            stack: '总量',
            barWidth: '45%',
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
            data: [527, 524,]
        },
        {
            name: '女',
            type: 'bar',
            stack: '总量',
            barWidth: '45%',
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
            data: [473, 476, ]
        }
    ]
}