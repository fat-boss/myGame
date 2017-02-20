/**
 * Created by Administrator on 2016/10/21.
 */
function Bullet(img,ax,ay,w,h){
    this.img = img;//�ڵ�ͼƬ
    this.ax = ax;//�ڵ���ͼƬ�Ĳü�x����
    this.ay = ay;//y����
    this.w = w;//�ڵ����
    this.h = h;//�ڵ��߶�

    this.routate = 0;//��ת�Ƕ�
    this.x = 0;//ƽ������
    this.y = 0;//ƽ������
    this.speed = 7;//�ڵ��ƶ��ٶ�
    this.num = 1;
}
Bullet.prototype.draw = function(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.rotate(util.conJd(this.routate));
    //����1ͼƬ 2�ü�x���� 3�ü�y���� 4���ü��Ŀ�� 5���ü��ĸ߶� 6�ڻ����ϵ�x���� 7�ڻ����ϵ�y���� 8�ڻ����ϵĿ�� 9�ڻ����ϵĸ߶�
    ctx.drawImage(this.img,this.ax,this.ay,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
    ctx.closePath();
    ctx.restore();
};
Bullet.prototype.move = function(){
    this.x+=Math.cos(util.conJd(this.routate-90))*this.speed;//���x���ƽ���ٶ�
    this.y+=Math.sin(util.conJd(this.routate-90))*this.speed;//���y���ƽ���ٶ�
};