/**
 * Created by Administrator on 2016/10/21.
 */
function deadFish(img,w,h,n,maxFrames){//1�����ͼƬ��2w�� 3h�� 4x 5y�����ڻ�����λ�ã�5n����ǰ���м������ŵ�״̬ 6����֡��
    this.img = img;
    this.w = w;
    this.h = h;
    this.x = 0;
    this.y = 0;

    this.n = n;
    this.routate = 0;
    this.maxFrames = maxFrames;
    this.initFrames=0;//��ʼ֡��
}
deadFish.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(util.conJd(this.routate));
    //if(Math.abs(this.routate) >= 90){
    //    ctx.scale(1,-1);
    //}
    //�����n*this.h��ȡ�û��������֡���������֡�����һ����ʼ��
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