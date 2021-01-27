let legend = []
export let data = []

export const pie_option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        left: 20,
        data: legend,
        textStyle:{
            color:'#fff'
        }
    },
    series: [
        {
            name: '覆盖航线',
            type: 'pie',
            radius: ['40%', '55%'],
            color: ['#fc962c', '#d83472', '#0F9AF8', '#2B63D5', '#2039C3', '#2ECACE','#6F81DA'],
            label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: 'rgb(21 42 60)',
                borderColor: '#222',
                borderWidth: 0,
                borderRadius: 4,
                rich: {
                    a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                    },
                    
                    hr: {
                        borderColor: '#666',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    b: {
                        lineHeight: 33
                    },
                    per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                    }
                }
            },
            data: data
        },
        {
            name: '',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['49%', '49%'],
            itemStyle: {
                color: 'transparant'
            },
            data: [{
                value: 0,
                name: '',
                label: {
                    normal: {
                        show: true,
                        formatter: '{c|全球航线数\n} {b|{c}}',
                        rich: {
                            c: {
                                color: 'rgb(98,137,169)',
                                fontSize: 20,
                                fontWeight: 'bold',
                                lineHeight: 30
                            },
                            b: {
                                color: '#1DE2A4',
                                fontSize: 16,
                                lineHeight: 30
                            }
                        },
                        position: 'center'
                    }
                }
            }]
        }
    ]
}