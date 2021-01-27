export const beam_airplane_option = {
    title:{
        text:'不同频率覆盖下国内国际航线统计',
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
            color:"#ccc"
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
            data: [],
            label:{
                show:true
            },
            // barWidth:'25%'
        },
       
        {
            name: '国际航线',
            type: 'bar',
            data: [],
             label:{
                show:true
            },
            // barWidth:'25%'
        },
        
    ]
}