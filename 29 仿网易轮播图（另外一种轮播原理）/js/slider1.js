window.onload = function(){
	//获取元素

	function $(id){ return document.getElementById(id)};
	var bigbox = $('w_slider');
	var imgs = $("slider_main").children;
	var ctrl = $('slider_ctrl');
	var timer = null;

	var prev = ctrl.children[0];
	var next = ctrl.children[1];

	var iNow = 0;

	for(var i=0; i<imgs.length; i++){
		var span = document.createElement('span');
		span.className = 'slider-ctrl-con';
		ctrl.insertBefore(span, next);
	}

	//第一个span加上current类
	var spans = ctrl.children
	spans[1].className += ' current';

	//先将第一张显示其余的都放在右边
	for(var i=1; i<imgs.length; i++){
		var scrollwidth = bigbox.offsetWidth;
		imgs[i].style.left = scrollwidth + 'px'
	}

	//如果用for循环是不行的因为你不知道是上一个是哪一张，而另外一种轮播图不用考虑出来的方向
	//所以不用做判断。
	
	for(var k in spans){
		spans[k].onclick = function(){
			if (this.className == 'slider-ctrl-prev') {
				//左侧按钮
				animate(imgs[iNow],{left:scrollwidth});
				if (iNow <= 0) {
					iNow = imgs.length - 1;
				}else  {
					iNow--;
				}
				imgs[iNow].style.left = -scrollwidth +'px';
				animate(imgs[iNow],{left:0});
				// console.log(iNow);
				setDot(iNow);
				
				
			}else if (this.className == "slider-ctrl-next") {
				//右侧按钮
				animate(imgs[iNow],{left:-scrollwidth});
				if (iNow >= imgs.length - 1) {
					iNow = 0;
				}else  {
					iNow++;
				}
				imgs[iNow].style.left = scrollwidth +'px';
				animate(imgs[iNow],{left:0});
				setDot(iNow);
			}else{
				//底部小点
				for(var i=1; i<spans.length - 1; i++){
					spans[i].index = i;
					var click = this.index - 1;

					if( click > iNow){
						//说明点击的点在当前的图片的右边
						animate(imgs[iNow],{left:-scrollwidth});
						imgs[click].style.left = scrollwidth + 'px';
						animate(imgs[click],{left:0});
					}else if (click < iNow) {
						animate(imgs[iNow],{left:scrollwidth});
						imgs[click].style.left = -scrollwidth +'px';
						animate(imgs[click],{left:0});
					}
	
				}
				//一定要注意把iNow重新赋值，并且在for循环外面
				iNow = click;

				//为每一个点设置上高亮
				setDot(click);
				
			}
		}

	}

	function setDot(number){
		for(var i=1; i<spans.length - 1; i++){
			spans[i].className = 'slider-ctrl-con';
		}
		spans[number + 1].className = 'slider-ctrl-con current';
	}




	var timer = null;
    timer = setInterval(autoplay,2000);  // 开启定时器
    function autoplay() {
       animate(imgs[iNow],{left:-scrollwidth});
				if (iNow >= imgs.length - 1) {
					iNow = 0;
				}else  {
					iNow++;
				}
				imgs[iNow].style.left = scrollwidth +'px';
				animate(imgs[iNow],{left:0});
				setDot(iNow);
    }

	
}

	
