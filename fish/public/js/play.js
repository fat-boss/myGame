/**
 * Created by Administrator on 2016/10/21.
 */
//工具栏构造函数
function paly(img,w,h){
    this.img = img;
    this.w = w;
    this.h = h;
    this.x=0;
    this.y=0;
}
paly.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    //-this.w/2和-this.h/2的意思是让图片正好在0,0坐标正中央显示  高度一般和宽度一边  平移出来就正好是中间
    ctx.drawImage(this.img,0,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.restore();
};