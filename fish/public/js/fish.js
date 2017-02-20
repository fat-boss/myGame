/**
 * Created by Administrator on 2016/10/21.
 */
//������Ĺ��캯��
function Fish(img,w,h,maxFrames){
    this.img=img;//��ͼƬ
    this.w=w;//��ͼƬ�Ŀ��
    this.h=h;//��ͼƬ�ĸ߶�
    this.c=0;//��Һͻ���
    this.speed = Math.random()+1;//����ٶ�
    this.x = 0;//x�������
    this.y = 0;//y������� �����xy������ƽ�Ƶ�
    this.maxFrames=maxFrames;//����֡��
    this.initFrames=0;//��ʼ֡��
    this.routate=0;//����ֵĽǶ�

    this.num = 1;
}
Fish.prototype.draw=function(ctx){//������ķ���
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);//ʹ��ƽ�� ͨ��xy��ʵ���ƶ�Ч��
    ctx.rotate(util.conJd(this.routate));//��ת�ĽǶ�
    if(Math.abs(this.rotate) >= 90){//����Ƕȵľ���ֵ����90�� ��ô�ͷ�ת
        ctx.scale(1, -1);
    }
    ctx.drawImage(this.img, 0, this.initFrames*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
    ctx.closePath();
    ctx.restore();
};
Fish.prototype.move=function(){//�ƶ���ķ���
    this.x += Math.cos(util.conJd(this.routate))*this.speed;//x���ƶ�
    this.y += Math.sin(util.conJd(this.routate))*this.speed;//y���ƶ�
};
Fish.prototype.renewalFrame=function(){//�����ͼƬ����
    this.initFrames++;//��ʼ֡��++
    if(this.initFrames>=this.maxFrames){//����������֡���ͱ�Ϊ��һ֡
        this.initFrames=0;
    }
};
