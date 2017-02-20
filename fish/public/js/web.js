/**
 * Created by Administrator on 2016/10/21.
 */
function Web(img,w,h,sx,sy,x,y){//参数1渔网img 2宽 3高 4在渔网图片裁剪位置x 5在渔网图片裁剪位置y 6平移的x坐标(出现的x坐标) 7平移的y坐标(出现的y坐标)
    this.img = img;
    this.w = w;
    this.h = h;


    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.scale = 0.5;//缩放的大小
}
Web.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.scale(this.scale,this.scale);
    ctx.drawImage(this.img,this.sx,this.sy,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};