/**
 * Created by Administrator on 2016/10/21.
 */
//���num
function Cointext(img,w,h,sx,x,y,targetX,targetY){//ͼƬ �� �� ��ͼƬ�ϵ�����x y �ڻ�����ƽ�Ƶ�x y
    this.img = img;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.x = x;
    this.y = y;
    this.targetX = targetX;//
    this.targetY = targetY;// û���õ�
    this.time = 0;
    this.n = 1;//
}
Cointext.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.drawImage(this.img,this.sx,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};
Cointext.prototype.move = function(){
    this.time++;
    //var disX = this.targetX - this.x;
    //var disY = this.targetY - this.y;
    //this.x = this.x + disX * this.n / 30;
    //this.y = this.y + disY * this.n / 30;
};