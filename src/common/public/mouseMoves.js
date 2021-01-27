export const mobile = (obj, id1, id2) => {
    let mySelf = obj;
    //获取元素
    var dv = document.getElementById(id1);
    var dv2 = document.getElementById(id2);
    var _offsetLeft = dv2.offsetLeft;
    var _offsetTop = dv2.offsetTop;
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    //鼠标按下事件
    dv.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        mySelf.isDown = true;
        //设置样式
        dv.style.cursor = "move";
    };
    //鼠标移动
    window.onmousemove = function(e) {
        if (mySelf.isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        dv2.style.left = _offsetLeft + nl + "px";
        dv2.style.top = _offsetTop + nt + "px";
    };
    //鼠标抬起事件
    dv.onmouseup = function() {
        //开关关闭
        mySelf.isDown = false;
        dv.style.cursor = "default";
        _offsetLeft = dv2.offsetLeft;
        _offsetTop = dv2.offsetTop;
    };
}