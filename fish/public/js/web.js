/**
 * Created by Administrator on 2016/10/21.
 */
function Web(img,w,h,sx,sy,x,y){//����1����img 2�� 3�� 4������ͼƬ�ü�λ��x 5������ͼƬ�ü�λ��y 6ƽ�Ƶ�x����(���ֵ�x����) 7ƽ�Ƶ�y����(���ֵ�y����)
    this.img = img;
    this.w = w;
    this.h = h;


    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.scale = 0.5;//���ŵĴ�С
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