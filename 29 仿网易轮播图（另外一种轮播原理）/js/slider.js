/**
 * Created by lq on 2016/11/22.
 */
window.onload = function() {
    // 获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片的父亲
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    // 生成小span
    for(var i=0;i<imgs.length; i++) {

        var span = document.createElement("span");// 创建 span
        span.className = "slider-ctrl-con"; // 添加类名
        span.innerHTML = imgs.length-i;  //  6 - 0     6 - 1   // 实现 倒序 的方式插入
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // 再 父亲 倒数第二个盒子的前面插入
    }
    // 下面的第一个小span  是默认的蓝色
    var spans = slider_ctrl.children;   // 得到所有的 span
    spans[1].setAttribute("class","slider-ctrl-con current");  // 两个类名

    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  310
    //  刚开始，按道理   第一张图片 留下   其余的人走到 310 的位置上
    for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 310 的位置
    }
    // 遍历三个按钮
     // spans 是 8个按钮 他们都是 span
    var iNow = 0; //  用来 控制播放张数
    for(var k in spans){   //   k  是索引号  spans[k]    spans[0]  第一个span
        spans[k].onclick = function() {
            // alert(this.innerHTML);
            if(this.className == "slider-ctrl-prev"){ // 判断当前点击的这个按钮是不是 prev
                // alert("您点击了左侧按钮");
                //  当我们左侧点击时候， 当前的这张图片 先慢慢的走到右边  上一张 一定先快速走到左侧 （-310）的位置，然后慢慢的走到舞台中
                animate(imgs[iNow],{left: scrollWidth});
                --iNow < 0 ?  iNow = imgs.length - 1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left: 0});
                setSquare();
            }
            else if(this.className == "slider-ctrl-next") {  // 右侧按钮开始
                autoplay();
            }
            else {
                // alert("您点击了下面的span");
                // 我们首先要知道我们点击是第几张图片  --- 获得当前的索引号
                // alert(this.innerHTML);
                var that = this.innerHTML - 1;
                // console.log(typeof that);
                if(that > iNow) {
                      // 做法等同于 右侧按钮
                    animate(imgs[iNow],{left: -scrollWidth});  // 当前的这张慢慢的走出去 左侧
                    imgs[that].style.left = scrollWidth + "px"; // 点击的那个索引号 快速走到右侧  310
                }
                else if(that < iNow) {
                    // 做法等同于 左侧按钮
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                }
                iNow = that;  // 给当前的索引号
                animate(imgs[iNow],{left: 0});
                /*比如 已经播放到 第4张    我点击了 第2张   把 2 给  inow
                下一次播放，应该播放第3张*/
               // animate(imgs[iNow],{left: 0});
                setSquare();
            }
        }
    }
    //  一个可以控制 播放span 的 函数   当前
    function setSquare() {
       //  清除所有的span current   留下 满足需要的拿一个
        for(var i=1;i<spans.length-1;i++){   //  8个span   我们要 1-6  不要 7  索引号
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";  // 记住 + 1
    }
    // 定时器开始  其实， 定时器就是  右侧按钮
    var timer = null;
    timer = setInterval(autoplay,2000);  // 开启定时器
    function autoplay() {
        //  当我们点击时候， 当前的这张图片 先慢慢的走到左边  下一张 一定先快速走到右侧 （310）的位置，然后慢慢的走到舞台中
        // alert("您点击了右侧按钮");
        //iNow == 0
        animate(imgs[iNow],{left: -scrollWidth});
        // 当前的那个图片 慢慢的走到 -scrollWidth 位置
        // 变成1   先 ++   ++iNow  先自加  后 运算
        ++iNow > imgs.length -1 ?  iNow = 0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";  // 立马执行  快速走到右侧
        animate(imgs[iNow],{left: 0}); // 下一张走的 0 的位置  慢慢走过来
        setSquare();  // 调用square
    }
    //鼠标经过清除定时器
    js_slider.onmouseover = function() {
        clearInterval(timer);
    }
    js_slider.onmouseout = function() {
        clearInterval(timer);  // 要执行定时器 先清除定时器
        timer = setInterval(autoplay,2000);  // 开启定时器
    }
}
