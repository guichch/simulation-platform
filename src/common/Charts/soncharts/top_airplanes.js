
export const top_airplane_option = {
    title:{
        text:'全球热门航线Top10',
        textAlign:'center',
        top:'10',
        left:'50%',
        textStyle:{
            color:'#fff'
        }
    },
    legend:{
        data:['热门航线'],
        top:'70',
        textStyle:{
            color:'#ccc'
        }
    },
    grid:{
        top:'130'
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#ccc'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine:{
                show:false
            },
            axisTick: {
                show: false
            },
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#ccc'
                }
            }
        }
    ],
    series: [
        {
            name: '热门航线',
            type: 'bar',
            barWidth: '60%',
            data: [],
        }
    ]
};

