export default {
    color:['#FF6666','#FFFF00','#0066CC','#0099CC','#9933FF','#0099CC','#006633','#009966','#009999','#66CCCC','#6666FF'],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend:{
        textStyle:{
            color:'#fff',
        },
        data:[]
    },
    series: [{
        name: "relation",
        type: 'graph',
        layout: 'circular',
        circular: {
            rotateLabel: true
        },
        categories:[],
        data: [],
        links: [],
        roam: true,
        label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            interval: 0,
            fontSize:16
        },
        
        emphasis: {
            lineStyle: {
                width: "3"
            }
        },
        focusNodeAdjacency: true,
        lineStyle: {
            
            curveness: 0.3
        }
    }]
}