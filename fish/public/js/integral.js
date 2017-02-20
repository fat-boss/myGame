/**
 * Created by Administrator on 2016/10/24.
 */
function Integral(img,w,h,sx){
    this.img = img;
    this.w = w;
    this.h = h;
    this.x = 0;
    this.y = 0;
    this.sx = sx;
    this.scale = 0.4;
}
Integral.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.scale(this.scale,this.scale);
    ctx.drawImage(this.img,this.sx,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};