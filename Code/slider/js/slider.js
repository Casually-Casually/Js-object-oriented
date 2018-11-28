/**
 * 第一步：将按钮绑定onmouseover
 * 		将其他按钮的class设置为空，将自己的设置为active
 */

function animate(lis, obj){
	var sliderImages = document.getElementById('slider-images');
	for(var j = 0; j<lis.length; j++){
		lis[j].className = '';
	}
	obj.className = 'active';
	// 2.	让图片发生变化
	// 最终要将marginLeft移动到什么位置。  -300
	var left = 0 - obj.index * 300;
	
	// 0  -600
	var nowLeft = parseInt(sliderImages.style.marginLeft) || 0;
	
	// 计算现在的左边距，到最终效果的左边距，有多少距离
	var juli = left - nowLeft;
	
	// 从1到2
	// 距离 = -300 - 0  = -300
	// 从2到3
	// 距离 = -600 - -300 = -300
	
	// 从 3 到2
	// 距离 = -300 - -600  = 300
	
	// 总的移动次数是 10次
	// 每次移动的像素，应该是距离/次数
	var meiciYidongJuli = juli / 10
	
	var timeId = setInterval(function (){
		// 先获取到要移动的距离，
		// 再判断触发事件之前的距离比最终的距离
		if(nowLeft == left){
			clearInterval(timeId);
		}else{
			nowLeft += meiciYidongJuli;
			
			sliderImages.style.marginLeft = nowLeft + 'px';
		}
	}, 10);
}

function autoPlay(lis){
	return setInterval(function (){
		var nowActive = 0;
		for(var k = 0; k<lis.length; k++){
			if(lis[k].className == 'active'){
				nowActive = lis[k].index;
			}
		}
		if(nowActive == 2){
			nowActive = -1;
		}
		animate(lis, lis[nowActive+1]);
	},1000);
}

window.onload = function (){
	// 1.	选取所有的controls -> li标签
	var lis = document.getElementById('controls').getElementsByTagName('li');
	for(var x = 0; x<lis.length; x++){
		lis[x].index = x;
	}
	// 自动播放
	var bigTimeId = autoPlay(lis);
	
	
	document.getElementById('slider').onmouseover = function (){
		clearInterval(bigTimeId);
	}
	
	document.getElementById('slider').onmouseout = function (){
		bigTimeId = autoPlay(lis);
	}
	
	for(var i = 0; i<lis.length; i++){
		lis[i].onmouseover = function (){
			// this指的是谁
			// 手动触发的 按钮<li>2</li>
			animate(lis, this);
		}
	}
}



/**
 * 1.	创建HTML结构
 * 2.	CSS将多余的图片隐藏。
 * 3.	获取到所有的按钮（<li></li>）
 * 4.	绑定一个onmouseover事件到按钮上
 * 5.	清空所有的按钮样式，之后将鼠标指向的按钮class设置为active. 
 * 6.	按钮和图片之间关系：按钮索引和图片索引一致，（当点击1按钮的时候，显示1图片。点击3按钮显示图片3）
 * 7.	由于图片是从左到右排列的 要想显示图片2 就需要将装图片的Ul标签整体向左边移动图片的宽度 。
 * 8.	当前整个ul标签的左边距。	最终整个ul标签的左边距。
 * 9.	用最终左边距 - 现在的左边距  = 移动的距离	如果从1--->2  距离应该是一个负数    3---->2    正数
 * 		a: 最终左边距
 * 		b: 当前左边距
 * 		c: 需要移动的距离
 * 		a - b = c  =>  a = b + c
 * 10.	动画的目的是从当前的左边距移动到最终的左边距
 * 		假设c代表距离  
 * 11.	将移动的距离c分成多次移动就有动画了。
 * 
 * --------------------------------------
 * 自动播放： 每隔一段时间，自动轮播图片
 * 1.	当前显示的是第几张图片（当前是第几个按钮被选中）
 * 2.	播放下一次，就应该是下一张图片被显示。 比如 当前 1张图片被显示  下一次 2张图片被现实，假如现在是3图被显示，下一次第一张被显示
 * 3.	计算当前左边距是多少，最终左边距是多少
 * 4.	利用上面的步骤进行计算
 * 
 * 自动播放一旦开始就不会停下来，为了让它停下来，设置一个事件让自动播放停止
 * 停止之后，需要设置一个事件重新开启自动播放
 * 
 * 
 */