export default {
    series: {
        type: 'sunburst',
        data: [],
        radius: [0, '100%'],
        itemStyle:{
            color:'#251f68'
        },
        levels: [
            {
                // 留给数据下钻点的空白配置
            },
            {
                
                itemStyle: {
                    color: '#000004'
                }
            },
            {
                itemStyle: {
                    color: '#cd3f71'
                }
            },
            {
                itemStyle: {
                    color: '#f1605d'
                }
            },
            {
                itemStyle: {
                    color: '#fec98d'
                }
            },
            {
                itemStyle: {
                    color: '#1f78b4'
                }
            }
        ]
    }
}