/**
 * Created by Administrator on 2016/10/21.
 */
function Bullet(img,ax,ay,w,h){
    this.img = img;//炮弹图片
    this.ax = ax;//炮弹在图片的裁剪x坐标
    this.ay = ay;//y坐标
    this.w = w;//炮弹宽度
    this.h = h;//炮弹高度

    this.routate = 0;//旋转角度
    this.x = 0;//平移坐标
    this.y = 0;//平移坐标
    this.speed = 7;//炮弹移动速度
    this.num = 1;
}
Bullet.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(util.conJd(this.routate));
    //参数1图片 2裁剪x坐标 3裁剪y坐标 4被裁剪的宽度 5被裁剪的高度 6在画布上的x坐标 7在画布上的y坐标 8在画布上的宽度 9在画布上的高度
    ctx.drawImage(this.img,this.ax,this.ay,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};
Bullet.prototype.move = function(){
    this.x+=Math.cos(util.conJd(this.routate-90))*this.speed;//获得x轴的平移速度
    this.y+=Math.sin(util.conJd(this.routate-90))*this.speed;//获得y轴的平移速度
};