import echarts from 'echarts/dist/echarts'
export  default {
    backgroundColor: '#011c3a',
    grid: {
        left: '3%',
        bottom: '5%',
        containLabel: true,
    },
    xAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: '#3d5269'
            }
        },
        axisLabel: {
            color: '#fff',
            fontSize: 14,
            interval:0,  
            rotate:40  
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#3d5269'
            }
        },
        axisLabel: {
            color: '#fff',
            fontSize: 16
        },
        splitLine: {
            show:true,
            lineStyle: {
                color: '#2d3d53'
            }
        },
        // interval:1,

    },
    series: [{
        type: 'bar',
        // barWidth: 50,
        itemStyle:{
            normal:{
                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#5ef3ff'
                }, {
                    offset: 1,
                    color: '#06a4f4'
                }], false)
            }
        },
        label: {
            normal: {
                show: false,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#ffffff',
                position: 'inside',
            }
        },
        data: []
    }]
}