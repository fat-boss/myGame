/**
 * Created by Administrator on 2016/10/21.
 */
//���������캯��
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
    //-this.w/2��-this.h/2����˼����ͼƬ������0,0������������ʾ  �߶�һ��Ϳ��һ��  ƽ�Ƴ������������м�
    ctx.drawImage(this.img,0,0,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.restore();
};