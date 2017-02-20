/**
 * Created by Administrator on 2016/10/21.
 */
//����1ͼƬ 2�� 3�� 4x��ƽ������ 5y��ƽ������ 6����x���� 7y���� 8���֡��
function Coin(img,w,h,x,y,targetX,targetY,maxFrames){//��ҹ��캯��
    this.img = img;
    this.w = w;
    this.h = h;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.startX = this.x;//�ʼ��x����
    this.startY = this.y;//�ʼ��y����

    this.maxFrames = maxFrames;
    this.initFrames = 0;
    this.n = 0 ; //�������ƽ�ҵ����⶯���ļ�ʱ��
}

Coin.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.drawImage(this.img,0,this.initFrames*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};

Coin.prototype.renewalFrame = function(){
    this.initFrames++;
    if(this.initFrames>this.maxFrames){
        this.initFrames = 0;
    }
};

Coin.prototype.move = function(){
    this.n++;
    var disX = this.targetX - this.startX;//��������ȥ��ʼ���� �õ��������
    var disY = this.targetY - this.startY;
    this.x = this.startX + disX * this.n / 30;//��ʼ������� �������x�ٶ�/30�ǿ����ٶȵ�
    this.y = this.startY + disY * this.n / 30;
};