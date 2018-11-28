function Slide(id) {
	this.lis = document.getElementById('controls').getElementsByTagName('li');
	this.slider = document.getElementById(id);
	this.sliderImages = document.getElementById('slider-images');
	this.nowActive = 0;

	this.bigTimeId = this.autoPlay(this.lis);
	var _this = this
	this.slider.onmouseover = function () {
		_this.mouseover()
	}
	this.slider.onmouseout = function () {
		_this.mouseout()
	}
}
Slide.prototype.init = function () {
	for (var x = 0; x < this.lis.length; x++) {
		this.lis[x].index = x;
	}
	var _this = this
	for (var i = 0; i < this.lis.length; i++) {
		this.lis[i].onmouseover = function () {
			_this.animate(_this.lis, this);
		}
	}
}
Slide.prototype.autoPlay = function (lis) {
	var _this = this
	return setInterval(function () {
		for (var k = 0; k < lis.length; k++) {
			if (lis[k].className == 'active') {
				_this.nowActive = lis[k].index;
			}
		}
		if (_this.nowActive == 2) {
			_this.nowActive = -1;
		}
		_this.animate(lis, lis[_this.nowActive + 1]);
	}, 2000);
}
Slide.prototype.mouseover = function () {
	var _this = this
	clearInterval(_this.bigTimeId);
}
Slide.prototype.mouseout = function () {
	var _this = this
	_this.bigTimeId = _this.autoPlay(_this.lis);
}
Slide.prototype.animate = function (lis, obj) {
	for (var j = 0; j < lis.length; j++) {
		lis[j].className = '';
	}
	obj.className = 'active';
	var left = 0 - obj.index * 300;
	var nowLeft = parseInt(this.sliderImages.style.marginLeft) || 0;
	var juli = left - nowLeft;
	var meiciYidongJuli = juli / 10
	var _this = this
	var timeId = setInterval(function () {
		if (nowLeft == left) {
			clearInterval(timeId);
		} else {
			nowLeft += meiciYidongJuli;
			_this.sliderImages.style.marginLeft = nowLeft + 'px';
		}
	}, 1);
}