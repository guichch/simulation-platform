export let option = {
    title: {
        show:false
    },
    geo: {
        map: 'world',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: 'none',
                borderColor: 'none'
            },
            emphasis: {
                areaColor: 'none'
            }
        }
    },
    series: [
        {
            name: ' Top10',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period:2,
                trailLength: 0,
                color:'#fff',
                symbolSize: 1
            },
            lineStyle: {
                normal: {
                    color: '#f7ca18',
                    width: 0.5,
                    opacity: 0.6,
                    curveness: 0.1
                }
            },
            data: []
        }
    ]
}