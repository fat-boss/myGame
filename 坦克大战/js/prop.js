//游戏福利
var Prop=function(ctx){
	this.x=0;
	this.y=0;
	this.duration=600;//持续时间600毫秒
	this.type=0;
	this.hit=false;
	this.width=30;
	this.height=28;
	this.ctx=ctx;
	this.isDestroyed=false;
	this.size=28;

	this.init=function(){
		this.ctx.clearRect(this.x,this.y,this.width,this.height);
		this.duration=600;//福利消失的时间
		this.type=parseInt(Math.random()*6);//随机生成一种坦克可以吃的东西
		this.x=parseInt(Math.random()*384)+map.offsetX;
		this.y=parseInt(Math.random()*384)+map.offsetY;
		this.isDestroyed=false;
	}

	this.draw=function(){
		if(this.duration > 0 && !this.isDestroyed){
			this.ctx.drawImage(RESOURCE_IMAGE,POS["prop"][0]+this.type*this.width,POS["prop"][1],this.width,this.height,this.x,this.y,this.width,this.height);
			this.duration -- ;
			this.isHit();
		}else{
			this.ctx.clearRect(this.x,this.y,this.width,this.height);
			this.isDestroyed = true;
		}
	}

	//检测吃到东西的条件CheckIntersect
	this.isHit=function(){
		var player=null;
		if(player1.lives>0 && CheckIntersect(this,player1,0)){
			this.hit=true;
			player=player1;
		}else if(player2.lives>0 && CheckIntersect(this,player2,0)){
			this.hit=true;
			player=player2;
		}

		if(this.hit){
			PROP_AUDIO.play();
			this.isDestroyed=true;
			this.ctx.clearRect(this.x,this.y,this.width,this.height);
			switch(this.type){
				case 0:
					player.lives ++;//小坦克吃掉加一条生命
					break;
				case 1:
					enemyStopTime=500;//敌人停止时间为500毫秒
					break;
				case 2:
					var mapChangeIndex=[[23,11],[23,12],[23,13],[23,14],[24,11],[24,14],[25,11],[25,14]];
					map.updateMap(mapChangeIndex,GRID);//加钢板
					homeProtectedTime=500;
					break;
				case 3:
					if(enemyArray != null || enemyArray.length > 0){
						for(var i=0;i<enemyArray.length;i++){
							var enemyObj = enemyArray[i];
							enemyObj.distroy();//炸弹把所有的敌方坦克全部清除
						}
					}
					break;
				case 4:

					break;
				case 5:
					player.isProtected=true;//给坦克加保护层
					player.protectedTime=500;
					break;
			}
		}
	}
}