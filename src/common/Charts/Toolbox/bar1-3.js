export  default {

    backgroundColor: 'transparent',

    grid: {
        top: '3%',
        left: '3%',
        right: '2%',
        bottom: '3%',
        containLabel: true,

    },
    xAxis: {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false,

        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        boundaryGap: true,
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 18,
            color:"#fff"
        },
        data: ['美食', '在线旅游', '电了邮件', '团购', '支付', '浏览器', '有声音频', '银行', '实用工具其', '天气']
    },
    series: [{
            barMaxWidth: '40%',
            type: 'bar',
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
            itemStyle: {
                color: '#909399'
            },
            data: [152, 139, 127, 125, 120, 118, 118, 117, 117, 116]
        },
    ]
};