/**
 * Created by Administrator on 2016/10/21.
 */
function Cannon(img,w,h,maxFrames){
    this.img = img;//炮体图片
    this.w = w;//炮体宽度
    this.h = h;//炮体高度
    this.maxFrames = maxFrames;//最大帧数
    this.initFrames = 0;//初始帧数
    this.routate = 0;
    this.x = 0;
    this.y = 0;
}
Cannon.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(util.conJd(this.routate));
    ctx.drawImage(this.img,0,this.initFrames*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};
Cannon.prototype.renewalFrame = function(){
    this.initFrames++;//初始帧数
    if(this.initFrames>=this.maxFrames){
        this.initFrames=0;
    }
};
