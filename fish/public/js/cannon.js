/**
 * Created by Administrator on 2016/10/21.
 */
function Cannon(img,w,h,maxFrames){
    this.img = img;//����ͼƬ
    this.w = w;//������
    this.h = h;//����߶�
    this.maxFrames = maxFrames;//���֡��
    this.initFrames = 0;//��ʼ֡��
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
    this.initFrames++;//��ʼ֡��
    if(this.initFrames>=this.maxFrames){
        this.initFrames=0;
    }
};
