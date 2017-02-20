/**
 * Created by Administrator on 2016/10/21.
 */
//关于一些转换的构造函数
var util = {
    //把图片对象转换为src，然后放到一个对象里面，用图片的名称作为属性的名称
    loadImage:function(arr,fn,fnErr){
        var _count = 0;
        var _json = {};//用来存放image,他的每个属性的名字对应的就是图片的src
        for(var i = 0;i<arr.length;i++){
            var _oImg = new Image();
            (function(index){
                _oImg.onload = function(){
                    var name = arr[index].split(".")[0];
                    _json[name] = this;//因为name是一个变量 所以给它赋值必须要这样写
                    _count++;
                    if(_count==arr.length){
                        fn(_json);
                    }
                };
                _oImg.onerror = function(){
                    fnErr&&fnErr();
                };
            }(i));
            _oImg.src = "../image/"+arr[i];
        }
    },
    //绘制鱼的随机概率
    probty:function(num){
        if(num < 20){ //20%
            return 0;
        }else if(num < 35){ //15%
            return 1;
        }else if(num < 47){ //12%
            return 2;
        }else if(num < 57){ //10%
            return 3;
        }else if(num < 65){ //8%
            return 4;
        }else if(num < 73){ //8%
            return 5;
        }else if(num < 80){ //7%
            return 6;
        }else if(num < 87){ //7%
            return 7;
        }else if(num < 92){ //5%
            return 8;
        }else if(num < 97){ //5%
            return 9;
        }else if(num < 99){ //2%
            return 10;
        }else if(num < 100){ //1%
            return 11;
        }
    },
    //弧度转换角度
    conJd:function(num){
        return num*Math.PI/180;
    },
    //角度转换弧度
    conHd:function(num){
        return num*180/Math.PI;
    },
    //判断物体是否出画布
    isOut:function(obj,w,h,padding){//obj传进来的数组对象 w是画布的宽 h画布的高 padding是给的物体在初始位置
        if(obj.x<-padding||obj.x>w+padding||obj.y<-padding||obj.y>padding+h){
            return true;
        }else{
            return false;
        }
    },
    //判断炮弹和鱼是否碰撞
    isCollide:function(obj1,obj2){
        if(obj2.y<570){
            var x = obj1.x-obj2.x;
            var y = obj1.y-obj2.y;
            var coll = Math.sqrt(x*x+y*y);
            if(coll<obj1.w/2+obj2.w/2){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    //概率计算
    isDead:function(m,n){//炮  鱼
        var random = Math.random();

        var getrandom;
        if(m>n){
            getrandom = (0.05+(m-n)*0.0005)*(m-n);
        }else{
            getrandom = 0.35-Math.abs(m-n)*0.03
        }
        if(getrandom>random){
            return true;
        }else{
            return false;
        }

    }

};