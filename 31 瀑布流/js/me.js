window.onload = function(){

	
	//要习惯写在函数里面，这个函数用来将所有图片定位
	waterfall('main','pin');
	// 图片数据
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};

	window.onscroll = function(){
		if (checkLoad()) {
			//根据后台的数据创建盒子
			var parent = document.getElementById('main');
			for(var i=0; i<dataInt.data.length; i++){
				//遍历所有的数据源
				var pin = document.createElement('div');
				pin.className = 'pin';
				var box = document.createElement('div');
				box.className = 'box';
				var img = document.createElement('img');
				img.src ='./images/' + dataInt.data[i].src ;
				box.appendChild(img);
				pin.appendChild(box);
				parent.appendChild(pin);
			}
			waterfall('main','pin');

		}
	}

	function waterfall(parent,imgbox){
	var imgbox = document.querySelectorAll('.pin');
	var parent = document.getElementById(parent);
	//首先要将列数确定，不能让列数随着缩放而变化
	var cols = 5;
	var imgWidth = imgbox[0].offsetWidth;
	var mainWidth = imgWidth *cols;
	parent.style.width = mainWidth + 'px';
	parent.style.margin = '0 auto';

	//遍历所有的图片盒子分为两种情况
	//用来储存每一列的高度
	var arrTop = [] 

	for(var i=0; i<imgbox.length; i++){
		//第一种情况为第一排的时候
		if (i<cols) {
			var top = imgbox[i].offsetHeight;
			arrTop.push(top);

		}else {
			//如果不是第一排的时候，就首先找出当前数组的最小值
			var min = Math.min.apply(null,arrTop);
			//然后获取最小值的索引
			var minindex = getIndex(arrTop,min);
			// 设置每一个图片盒子为绝对定位
			
			imgbox[i].style.position = 'absolute';
			// 将当前图片盒子的高度设置为当前这个数组中的最小值
			imgbox[i].style.top = min + 'px';

			imgbox[i].style.left = minindex *　imgWidth + 'px';
			// 最后改变当前数组将加上去的图片的高度加上去
			arrTop[minindex] +=imgbox[i].offsetHeight;
			//这个时候每一列的高度不再是一排的高度，而是一列所有的图片这个时候数组就要发发生变化
			
		}
	}
}



function getIndex(arr,mintop){
	for(var i=0; i<arr.length; i++){
		if (arr[i] == mintop) {
			return i;
		}
	}
}
function checkLoad(){
	//找到最后一张的offsetTop值，它是距离父盒子顶部
	var pin = document.querySelectorAll('.pin');
	var lastTop = pin[pin.length - 1].offsetTop;
	// console.log(lastTop);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;
	var top = documentH + scrollTop;
	// console.log(top);
	if (lastTop < top) {
		return true
	}
}

}


