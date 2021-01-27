import echarts from 'echarts'


// option
export const airplane_option = {
    title:{
        text:'24H全球航线数量统计',
        textAlign:'center',
        top:'10',
        left:'50%',
        textStyle:{
            color:'#fff'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['航线数'],
        textStyle: {
            color: '#ccc'
        },
        top:70
    },
    grid:{
        top:'130',
        
    },
    xAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        axisTick:{
            show:false
        }
    },
    yAxis: {
        splitLine: {show: false},
        axisLine: {
            lineStyle: {
                color: '#ccc'
            },
            show:false
        },
        axisTick:{
            show:false
        }
    },
    series: [{
        name: '航线数',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 10,
        data: [],
        itemStyle:{
            color:'rgb(133 83 239)'
        }
    }, {
        name: '航线数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#14c8d4'},
                    {offset: 1, color: '#43eec6'}
                ]
            )
        },
        data: []
    }]
}