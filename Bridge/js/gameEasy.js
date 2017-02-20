/**
 * Created by Administrator on 2016/10/23.
 */
var mycanvas = document.getElementById("mycanvas");
var mydun = document.getElementById("mydun");
var ctx=document.getElementById("mycanvas").getContext("2d");
var ctx1=document.getElementById("mydun").getContext("2d");
var endCanvas = document.getElementById("endCanvas");
var end = document.getElementById("endCanvas").getContext("2d");
var endStart = document.getElementById("endStart");
var endS = document.getElementById("endStart").getContext("2d");
var endQuit = document.getElementById("endQuit");
var endQ = document.getElementById("endQuit").getContext("2d");
var hard1 = document.getElementById("hard1");
var h1=document.getElementById("hard1").getContext("2d");
var hard2 = document.getElementById("hard2");
var h2=document.getElementById("hard2").getContext("2d");
var person=document.getElementById("person");
var dunlist=[];//定义木墩数组
var personlist=[];//定义木墩数组
var flag=true;//判断人的状态：true表示活着，false表示死亡
var Muban;//定义变量用于木板定时
var finalY;//木板上升最终高度
var down;//定义变量用于木板下滑定时
var Angle;//定义全局变量角度
var longy=0;//木板长度改变值
var finalBanY;//木板倒下最终横坐标值
var finalDunL;//第二个墩子左边x坐标
var finalDunR;//第二个墩子右边x左边
var slide=60;//动态小人水平移动初始位置
var move1=0;//动态小人死亡时
var slide1=390;//动态小人死亡时掉落距离初始值
var personX;//动态小人变量
var personY;//动态小人变量
var ifDead=0;//判断小人是否死亡，水平下落
var movewood;//每过一关，木墩移动变量
var count=0;//记录成绩
var person1;
//var hard;
var startCanvas = document.getElementById("startCanvas");
var start = document.getElementById("startCanvas").getContext("2d");
var beginCanvas = document.getElementById("start");
var begin = document.getElementById("start").getContext("2d");
//点击圆圈开始游戏
window.onload= function () {
    startGame();
    beginButton();
}

function startGame(){
    start.font = 'bold 100px arial';
    start.textAlign = 'left';
    start.textBaseline = 'top';
    start.strokeStyle = 'black';
    start.fillText("小人过桥",100,100,300);
    start.drawImage(person,0,0, 77,109,225,415,40,60);
    start.beginPath();
    start.rect(210,480,80,200);
    start.fillStyle="black";
    start.fill();
    start.closePath();
}
function beginButton(){
    begin.arc(60,60,60,0,360);
    begin.fillStyle="black";
    begin.fill();

    begin.font = 'bold 44px arial';
    begin.fillStyle = 'white';
    begin.fillText('Start',10,75);

    h1.arc(60,60,60,0,360);
    h1.fillStyle="black";
    h1.fill();
    h1.font = 'bold 34px arial';
    h1.fillStyle = 'white';
    h1.fillText('正常',30,75);

    h2.arc(60,60,60,0,360);
    h2.fillStyle="black";
    h2.fill();
    h2.font = 'bold 34px arial';
    h2.fillStyle = 'white';
    h2.fillText('残酷',30,75);
    beginCanvas.addEventListener("click",function(){
        beginCanvas.style.zIndex=10;
        //startCanvas.style.zIndex=10;
        hard1.style.display="block";
        hard2.style.display="block";
    },false);
    hard1.addEventListener('click',function(){
        beginCanvas.style.zIndex=10;
        startCanvas.style.zIndex=10;
        hard1.style.zIndex=10;
        hard2.style.zIndex=10;
        beginGame(1);
    },false);
    hard2.addEventListener('click',function(){
        beginCanvas.style.zIndex=10;
        startCanvas.style.zIndex=10;
        hard1.style.zIndex=10;
        hard2.style.zIndex=10;
        beginGame(2);
    },false);
}

//游戏开始
function beginGame(hard) {
    finalDunL=87+Math.random()*200;
    finalDunR=finalDunL+10+Math.random()*100;
    person1=new littlePerson(ctx,person,0,0,77,117,30,386,40,60);
    ctx1.font = 'bold 44px arial';
    ctx1.fillStyle = 'white';
    ctx1.fillText('分数：0',35,100);
    var dun1 = new dun(ctx1,10,451,77,200);
    var dun2 = new dun(ctx1,finalDunL,451,finalDunR-finalDunL,200);
    dunlist.push(dun1,dun2);
    //当鼠标按下时
    mydun.onmousedown=function(){
        if(hard==1){
            Muban=setInterval(longBan1,10);
        }
        if(hard==2){
            Muban=setInterval(longBan2,10);
        }
        personlist.push(person1);
    };
    mydun.onmouseup = function(){
        longy=0;
        clearInterval(Muban);
        setTimeout(judgeBan,500);
        Angle=0;
        setTimeout(judgeDun,2000);
    }
};
//创建小人对象（动态）
function littlePerson(obj, imgNode, cutImgX, cutImgY, cutImgWidth, cutImgHeight, x, y,cutImgWidthX, cutImgHeightY) {
    this.obj = obj;
    this.imgNode = imgNode;
    this.cutImgX = cutImgX;
    this.cutImgY = cutImgY;
    this.cutImgWidth = cutImgWidth;
    this.cutImgHeight = cutImgHeight;
    this.cutImgWidthX = cutImgWidthX;
    this.cutImgHeightY = cutImgHeightY;
    this.x = x;
    this.y = y;
    var _this = this;
    this.move = function () {
        this.cutImgY+= this.cutImgHeight;
        if(this.cutImgY>=702){
            this.cutImgY=0
        }
        _this.x+=10;
        _this.drawPerson();
    }
    this.moveBack = function () {
        this.cutImgY= this.cutImgY;
        if(this.cutImgY>=702){
            this.cutImgY=0
        }
        _this.x-=2;
        _this.drawPerson();
    }
    _this.drawPerson = function () {
        _this.obj.beginPath();
        _this.obj.drawImage(_this.imgNode, _this.cutImgX, _this.cutImgY, _this.cutImgWidth,
            _this.cutImgHeight, _this.x, _this.y, _this.cutImgWidthX, _this.cutImgHeightY);
        _this.obj.closePath();
    }
    _this.drawPerson();
}
//新建小人（动态）
function movePerson(){
    ctx.clearRect(0,386,500,60);
    person1.move();
    slide=slide+10;
    if(ifDead==1){//小人死亡
        if(slide>finalBanY+25){
            clearInterval(personX);
            personY=setInterval(deadPerson,15);
        }
    }else{//小人活着
        if(slide>finalDunR-40){
            clearInterval(personX);
            setTimeout(moveAll,1000);
            slide=40;
        }
    }
}
//当游戏者游戏失败时，小人掉下来
function deadPerson(){
    ctx.clearRect(finalBanY,385,77,265);
    ctx.save();
    ctx.beginPath();
    ctx.drawImage(person,0,0,77,109,finalBanY,slide1,40,60);
    slide1=slide1+4;
    if(slide1>650){
        clearInterval(personY);
        slide1=386;
        mydun.style.zIndex=30;
        mycanvas.style.zIndex=30;
        //userScore.value=count;
        score=count;
        getScore();
        endCan();
    }
    ctx.restore();
}
//创建木墩对象（静态）(1.木墩x坐标；2 木墩y坐标，3.木墩宽，4.木墩高)
function dun(obj,x,y,xWidth,yHeight){
    this.obj=obj;
    this.x=x;
    this.y=y;
    this.xWidth= xWidth;
    this.yHeight=yHeight;
    var _this=this;
//        this.alive=true;
    this.move = function() {
        this.x-= 2;
//            if(this.alive){
        this.draw();
//            }
    };
    this.draw=function(){
        _this.obj.beginPath();
        _this.obj.rect(_this.x,_this.y,_this.xWidth,_this.yHeight);
        _this.obj.fillStyle="black";
        _this.obj.fill();
        _this.obj.closePath();
    };
    this.draw();
}
//创建木板对象
function ban(obj,x,y,xWidth,yHeight,angle,transX,transY){
    this.obj=obj;
    this.x=x;
    this.y=y;
    this.oldY = this.y;
    this.xWidth=xWidth;
    this.yHeight=yHeight;
    this.Length = Math.abs(this.yHeight - this.y);
    this.speed=1;
    var _this=this;
    this.moveBack = function() {
        this.y+=2;
        this.yHeight+=2;
        this.draw();
    };
    this.draw=function(){
        _this.obj.save();
        _this.obj.translate(transX,transY);
        _this.obj.rotate(angle);
        _this.obj.beginPath();
        _this.obj.lineWidth=_this.xWidth;
        _this.obj.strokeStyle="black";
        _this.obj.moveTo(_this.x,_this.y);//木板所画位置
        _this.obj.lineTo(_this.x,_this.yHeight);
        _this.obj.fillStyle="black";
        _this.obj.fill();
        _this.obj.stroke();
        _this.obj.closePath();
        _this.obj.restore();
    };
    this.draw();
}
//木板增长(简单版)
function longBan1(){
    ctx.clearRect(78,0,500,451);
    longy+=2;
    var longY=451-longy;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.strokeStyle="black";
    ctx.moveTo(83,449);//木板所画位置
    ctx.lineTo(83,longY);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    finalY=longY;
}
//（复杂版）
function longBan2(){
    ctx.clearRect(78,0,500,451);
    longy+=2;
    var longY=451-longy;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth=4;
    ctx.strokeStyle="#a5f14f";
    ctx.moveTo(83,449);//木板所画位置
    ctx.lineTo(83,longY);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    finalY=longY;
}
//当鼠标弹起时,木板倒下
var banL;
function downBan() {
    Angle+=1;    //木板旋转角度变换
    if(Angle>90){
        clearInterval(down);
        Angle=90;
    }else{
        ctx.clearRect(78,0,500,449);
        //创建一个跟鼠标抬起前相同长度的木板
        banL=new ban(ctx,0,0,4,finalY-451,Angle*Math.PI/180,83,449);
    }
}
function judgeBan(){
    down=setInterval(downBan,10);
}

function judgeDun(){
//        判断倒下木板是否在第二个木墩宽度之间
    finalBanY=449-finalY+85;
    if(finalBanY>finalDunR||finalBanY<finalDunL){
        ifDead=1;
        personX=setInterval(movePerson,100);
    }else{
        personX=setInterval(movePerson,100);
        count++;
    }
}
//移动木桩
var ismoving = false;
function moveWood(){
    ismoving =true;
    var oldX = dunlist[dunlist.length-2].x;
    if(dunlist[dunlist.length-1].x>oldX){
        movewood = setInterval(function(){
            ctx1.clearRect(0,0,500,650);
            ctx1.font = 'bold 44px arial';
            ctx1.fillStyle = 'white';
            ctx1.fillText('分数：'+count,35,100);
            dunlist[dunlist.length-2].move();
            dunlist[dunlist.length-1].move();
            if(dunlist[dunlist.length-1].x+dunlist[dunlist.length-1].xWidth<87){//让木墩每次都停留在最初开始的位置
                clearInterval(movewood);
                ismoving = false;
                finalDunL=87+Math.random()*200;
                finalDunR=finalDunL+1+Math.random()*100;
                var dun2 = new dun(ctx1,finalDunL,451,finalDunR-finalDunL,200);
                dunlist.push(dun2);
            }
        },10)
    }
}
//移动小人
var movepersonS;
function movePersonSuccess(){
    if(person1.x>30){
        movepersonS = setInterval(function(){
            ctx.clearRect(0,386,500,60);
            person1.moveBack();
            if(person1.x<40){//让小人每次都停留在最初开始的位置
                clearInterval(movepersonS);
            }
        },10)
    }
}
//移动木板
var moveBan1;
function moveBan(){
    moveBan1 = setInterval(function(){
        ctx.clearRect(0,0,500,650);
        person1.drawPerson();
        banL.moveBack();
        if(!ismoving){//让小人每次都停留在最初开始的位置
            clearInterval(moveBan1);
        }
    },10)
}
//移动所有
function moveAll(){
    moveWood();
    movePersonSuccess();
    moveBan();
}

//游戏结束界面
function endCan(){
    queryName();
    end.font = 'bold 48px arial';
    end.fillStyle='white';
    end.fillText('排行榜',180,150);

    endS.arc(60,60,50,0,360);
    endS.fillStyle="black";
    endS.fill();

    endS.font = 'bold 30px arial';
    endS.fillStyle = 'white';
    endS.fillText('Again',20,70);

    endQ.arc(60,60,50,0,360);
    endQ.fillStyle="black";
    endQ.fill();

    endQ.font = 'bold 30px arial';
    endQ.fillStyle = 'white';
    endQ.fillText('Quit',30,70);

    endStart.addEventListener('click',function(){
        window.location.href="carAndtree.html";
    },false);
    endQuit.addEventListener('click',function(){
        if(confirm("您确定要退出游戏并关闭本页吗？")){
            window.close();
        }else{
            history.back();
        }
    },false);
}


var a=1;
//        第一步：//创建数据库
//        四个参数：1数据库名称 2数据库版本号 3数据库参数4数据库大小，单位（字节）
var db=openDatabase("score","","",1024*1024*10);
//        第二步：链接数据库
db.transaction(function(tx){//依赖注入一个参数
    //第一个参数：sql语句
    tx.executeSql("create billiards if not exists t_score(u_id int primary_key,u_score varchar(50))");
});
function getScore(){
    //var msg=document.getElementById("msg");
    db.transaction(function(tx){
        tx.executeSql("insert into t_score(u_id,u_score) values (?,?)" ,[a,score],function(trans,right){
            console.log("正确对象"+right);
        },function(trans,err){
            console.log("错误对象"+err);
        });
    })
    a++;
}

function queryName(){
    db.transaction(function(tx){
        tx.executeSql("select * from t_score order by u_score DESC limit 3" ,[],function(trans,right){
            for(var i=0;i<right.rows.length;i++){
                end.font = 'bold 44px arial';
                end.fillStyle='white';
                end.fillText('TOP.'+(i+1)+':'+'   '+parseInt(right.rows.item(i).u_score),100,250+(i*70));
            }
        },function(trans,err){
            console.log("错误对象"+err);
        });
    })
}


