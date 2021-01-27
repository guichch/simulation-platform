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
        inverse: true, //反向
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
        data: ["学生","党政机关事业单位领导干部","党政机关事业单位一般人员","企业/公司高层管理人贝","企业/公司中层管理人员","企业/公司一般人员","专业技术人员","商业服务业人员","制造生产型企业人员","个体户/自由职业者","农村外出务工人员","农林牧渔劳动人员","退休人员","无业/下岗/失业人员"]
    },
    series: [{
            barMaxWidth: '40%',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                color: '#28d9e8'
            },
            data: [254,2,26,6,22,101,52,52,38,200,39,78,41,88]
        },
        {
            barMaxWidth: '40%',
            type: 'bar',

            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            itemStyle: {
                color: '#f9c807'
            },
            data: [260,2,30,7,26,85,51,54,28,200,33,81,43,78]
        }
    ]
};