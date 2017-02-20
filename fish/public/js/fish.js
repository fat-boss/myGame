/**
 * Created by Administrator on 2016/10/21.
 */
//关于鱼的构造函数
function Fish(img,w,h,maxFrames){
    this.img=img;//鱼图片
    this.w=w;//鱼图片的宽度
    this.h=h;//鱼图片的高度
    this.c=0;//金币和积分
    this.speed = Math.random()+1;//鱼的速度
    this.x = 0;//x轴的坐标
    this.y = 0;//y轴的坐标 这里的xy是用来平移的
    this.maxFrames=maxFrames;//最大的帧数
    this.initFrames=0;//初始帧数
    this.routate=0;//鱼出现的角度

    this.num = 1;
}
Fish.prototype.draw=function(ctx){//绘制鱼的方法
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);//使用平移 通过xy来实现移动效果
    ctx.rotate(util.conJd(this.routate));//旋转的角度
    if(Math.abs(this.rotate) >= 90){//如果角度的绝对值大于90度 那么就翻转
        ctx.scale(1, -1);
    }
    ctx.drawImage(this.img, 0, this.initFrames*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
    ctx.closePath();
    ctx.restore();
};
Fish.prototype.move=function(){//移动鱼的方法
    this.x += Math.cos(util.conJd(this.routate))*this.speed;//x的移动
    this.y += Math.sin(util.conJd(this.routate))*this.speed;//y的移动
};
Fish.prototype.renewalFrame=function(){//鱼更换图片动画
    this.initFrames++;//初始帧数++
    if(this.initFrames>=this.maxFrames){//如果大于最大帧数就变为第一帧
        this.initFrames=0;
    }
};
