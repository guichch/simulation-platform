export const country_airplane_option = {
    title:{
        text:'卫星覆盖国内国际航线统计',
        textAlign:'center',
        top:'10',
        left:'50%',
        textStyle:{
            color:'#fff'
        }
    },
    grid:{
        top:'130',
        containLabel:true
    },
    color:['#37a2da','#ffd85c'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['国内航线', '国际航线'],
        textStyle:{
            color:'#ccc'
        },
        top:'70'
    },
   
    xAxis: [
        {
            type: 'category',
            data: [],
            axisLine:{
                lineStyle:{
                    color:'#ccc'
                }
            },
            axisTick:{
                show:false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#ccc'
                }
            },
            axisTick:{
                show:false
            },
            splitLine:{
                show:false
            }
        }
    ],
    series: [
        
        {
            name: '国内航线',
            type: 'bar',
            stack: '航线',
            label:{
                show:true
            },
            data: []
        },
       
        {
            name: '国际航线',
            type: 'bar',
            stack: '航线',
            data: [],
            label:{
                show:true
            },
            // barWidth:'30%'
        },
        
    ]
};
