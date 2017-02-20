/**
 * Created by Administrator on 2016/10/21.
 */
function deadFish(img,w,h,n,maxFrames){//1死鱼的图片，2w宽 3h高 4x 5y出现在画布的位置，5n死鱼前面有几个活着的状态 6最大的帧数
    this.img = img;
    this.w = w;
    this.h = h;
    this.x = 0;
    this.y = 0;

    this.n = n;
    this.routate = 0;
    this.maxFrames = maxFrames;
    this.initFrames=0;//初始帧数
}
deadFish.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(util.conJd(this.routate));
    //if(Math.abs(this.routate) >= 90){
    //    ctx.scale(1,-1);
    //}
    //这里的n*this.h是取得活的鱼的最大帧数，从最大帧数后第一个开始动
    ctx.drawImage(this.img,0,this.n*this.h+this.initFrames*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};
deadFish.prototype.renewalFrame = function(){
    this.initFrames++;
    if(this.initFrames>=this.maxFrames){
        this.initFrames=0;
    }
};