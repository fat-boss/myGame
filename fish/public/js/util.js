/**
 * Created by Administrator on 2016/10/21.
 */
//����һЩת���Ĺ��캯��
var util = {
    //��ͼƬ����ת��Ϊsrc��Ȼ��ŵ�һ���������棬��ͼƬ��������Ϊ���Ե�����
    loadImage:function(arr,fn,fnErr){
        var _count = 0;
        var _json = {};//�������image,����ÿ�����Ե����ֶ�Ӧ�ľ���ͼƬ��src
        for(var i = 0;i<arr.length;i++){
            var _oImg = new Image();
            (function(index){
                _oImg.onload = function(){
                    var name = arr[index].split(".")[0];
                    _json[name] = this;//��Ϊname��һ������ ���Ը�����ֵ����Ҫ����д
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
    //��������������
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
    //����ת���Ƕ�
    conJd:function(num){
        return num*Math.PI/180;
    },
    //�Ƕ�ת������
    conHd:function(num){
        return num*180/Math.PI;
    },
    //�ж������Ƿ������
    isOut:function(obj,w,h,padding){//obj��������������� w�ǻ����Ŀ� h�����ĸ� padding�Ǹ��������ڳ�ʼλ��
        if(obj.x<-padding||obj.x>w+padding||obj.y<-padding||obj.y>padding+h){
            return true;
        }else{
            return false;
        }
    },
    //�ж��ڵ������Ƿ���ײ
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
    //���ʼ���
    isDead:function(m,n){//��  ��
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