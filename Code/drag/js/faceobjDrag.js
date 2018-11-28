function Drag(id){
    this.oDiv = document.getElementById(id);
    this.disx = 0;
    this.disY = 0;
}
Drag.prototype.init = function(){
    var This = this;
    this.oDiv.onmousedown = function(ev){
        This.fnDown(ev);
        return false;
    }
    
}
Drag.prototype.fnDown = function(ev){
    var This = this;
    
    this.disX = ev.clientX - this.oDiv.offsetLeft;
    this.disY = ev.clientY - this.oDiv.offsetTop;
    document.onmousemove = function(ev){
        This.fnMove(ev);
    }
    document.onmouseup = this.fnUp;
}
Drag.prototype.fnMove = function(ev){
    this.oDiv.style.left = ev.clientX - this.disX + "px";
    this.oDiv.style.top = ev.clientY - this.disY + "px";
    
}
Drag.prototype.fnUp = function(){
    document.onmousemove = null;
    document.onmouseup = null;
}

function childDrag(id){
    Drag.call(this,id);
    
}
// 拷贝继承Drag原型上的方法
extend(childDrag.prototype,Drag.prototype);
childDrag.prototype.fnMove = function(ev){
    var L = ev.clientX - this.disX;
    var T = ev.clientY - this.disY;
    if(L<0){
        L = 0;
    }
    console.log(1);
    if(L >= document.documentElement.clientWidth-this.oDiv.offsetWidth){
        L = document.documentElement.clientWidth-this.oDiv.offsetWidth;
    }
    this.oDiv.style.left = L + "px";
    this.oDiv.style.top = T +"px";
}
function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr] = obj2[attr]; 
    }
}