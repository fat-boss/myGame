/**
 * Created by Administrator on 2016/10/21.
 */
//参数1图片 2宽 3高 4x轴平移坐标 5y轴平移坐标 6金库的x坐标 7y坐标 8最大帧数
function Coin(img,w,h,x,y,targetX,targetY,maxFrames){//金币构造函数
    this.img = img;
    this.w = w;
    this.h = h;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.startX = this.x;//最开始的x坐标
    this.startY = this.y;//最开始的y坐标

    this.maxFrames = maxFrames;
    this.initFrames = 0;
    this.n = 0 ; //用来控制金币到达金库动画的计时器
}

Coin.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.drawImage(this.img,0,this.initFrames*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};

Coin.prototype.renewalFrame = function(){
    this.initFrames++;
    if(this.initFrames>this.maxFrames){
        this.initFrames = 0;
    }
};

Coin.prototype.move = function(){
    this.n++;
    var disX = this.targetX - this.startX;//金库坐标减去开始坐标 得到相差坐标
    var disY = this.targetY - this.startY;
    this.x = this.startX + disX * this.n / 30;//开始坐标加上 相差坐标x速度/30是控制速度的
    this.y = this.startY + disY * this.n / 30;
};