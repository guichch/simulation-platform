export let flybar_option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel:{
            color:'#fff'
        },
        splitLine:{
            show:false
        }
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color:'#fff'
        },
        data: []
    },
    series: [
        {
            name: '热门城市航线TOP5',
            type: 'bar',
            data: []
        }
    ]
}