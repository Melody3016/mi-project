$(function () {
    // 饼状图
    getData(function (res) {
        // 处理数据
        var name = [];
        res.forEach(function(item){
            name.push(item.name);
        })
        console.log(name);
        console.log(res);
        var echarts1 = echarts.init(document.getElementsByClassName('picTable')[0]);
        var option1 = {
            title: {
                text: '各个分类商品数量',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: name
            },
            series: [{
                name: '商品数量',
                type: 'pie',
                radius: '70%',
                center: ['50%', '55%'],
                data: res,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        echarts1.setOption(option1);
    })

    // 柱状图
    var echarts2 = echarts.init(document.getElementsByClassName('picTable')[1]);
    var option2 = {
        title: {
            text: '2020下半年用户注册情况',
            subtext: '纯属虚构',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            type: 'value',
            max:250,
            name: '注册人数'
        },
        series: [{
            data: [120, 220, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: 'black',
                            fontSize: 16
                        }
                    }
                }
            },

        }]
    };
    echarts2.setOption(option2);

})

function getData(cb) {
    // 发送ajax请求获取数据
    $.ajax({
        url: "../../interface/productCount.php",
        dataType: "json",
        beforeSend: function () {
            NProgress.configure();
            NProgress.start();
            $('.picTable').eq(0).html('<div style="font-size:26px;font-weight:bold;    text-align: center;line-height:200px">加载中···</div>')
        },
        success: function (res) {
            cb && cb(res);
        },
        complete: function () {
            NProgress.done();
        }
    });
}