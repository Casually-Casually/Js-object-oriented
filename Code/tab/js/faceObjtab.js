			 /*
			  * 1 先整理原生代码
			  * 		1） 不要出现函数嵌套函数  如果有 单独封装
			  *         2) 把变量做成全局变量
			  * 2 改写面向对象   ---》 写构造函数 给构造函数加属性和 方法
			  *         1） 全局变量就是属性
			  *         2） 函数就是方法
			  *         3）既不是函数又不是全局变量  单独封装成函数
			  *         4） 修改this的指向
			  *  
			  */
			 function Tab(id){  //父类
                this.oBox = document.getElementById(id);
                this.aIpt = this.oBox.getElementsByTagName("input");
                this.aDiv = this.oBox.getElementsByTagName("div");
           }
           Tab.prototype.showDiv = function(obj){
                       for(var j=0;j<this.aIpt.length;j++){
                           this.aIpt[j].style.background = "white";
                           this.aDiv[j].style.display = "none";
                       }
                       this.aDiv[obj.index].style.display = "block";
                       obj.style.backgroundColor = "orange";
           }
           Tab.prototype.init = function(){
                  var oTab = this;
                   //批量绑定事件
                   for(var i=0;i<this.aIpt.length;i++){
                       //给input加一个自定义属性
                       this.aIpt[i].index = i;
                       //this.showDiv  表示 t1 上的 showDiv方法  this.showDiv=function(){}
                       //this.showDiv是一个整体 就是一个函数块   不加（） 由 this.aIpt[i]来调用
                       //oTab.showDiv() 加l（） 变成自己运行 oTab 来调用
//				 		this.aIpt[i].onclick = this.showDiv;
                       this.aIpt[i].onclick = function(){
                           //this 就指向 input
                           console.log(this);
                           var input = this;
                           oTab.showDiv(input);
                       };
                   }
           }
           //ChildTab  子类
           function ChildTab(id){
               //把属性继承过来
               Tab.call(this,id);
           }
           //方法的继承
           extend(ChildTab.prototype,Tab.prototype);
           //增加一些父类没有的方法
           ChildTab.prototype.autoplay = function(){
               //实现自动播放
               var _this = this
               var num  = 0;
               console.log(_this.aIpt[1].index)
               setInterval(function(){
                  num++
                  if(num === _this.aIpt.length){
                      num = 0 
                   }
                   _this.showDiv(_this.aIpt[num])
               },1000)
           
           }
           //遍历对象的方法   拷贝继承  
          function extend(child,parent){
              for(var attr in parent){
                   child[attr]  = parent[attr]
              }
          }