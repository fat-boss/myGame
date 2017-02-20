var ctx;//2d画布
var wallCtx;//地图画布
var grassCtx;//草坪画布
var overCtx;//结束画布
var menu=null;//菜单
var stage=null;//舞台
var map=null;//地图
var player1=null;//一号玩家
var player2=null;//二号玩家
var prop=null;//福利
var enemyArray=[];//敌方坦克
var bulletArray=[];//子弹数组
var keyList=[];//记录按下的按键
var crackArray=[];//爆照数组

var gameState=GAME_STATE_MENU;//默认菜单状态
var level=1;
var maxEnemy=20;//敌方坦克总数
var maxAppearEnemy=5;//屏幕上一起出现敌方坦克的最大数
var appearEnemy=0;//已经出现的敌方坦克
var mainframe=0;//?
var isGameOver=false;
var overX=176;
var overY=384;//出现game over的位置坐标
var enemyStopTime=0;//敌方坦克停止的时间s
var homeProtectedTime=-1;//家被保护的时间（加上钢板的时间）
var propTime=300;//生成可以吃得东西的时间
var Score=0;//分数
var db=openDatabase('tank','','',2*1024*1024);//创建数据库访问对象
var timer=null;


$(function(){
	initScreen();
	initObject();
	showScore();
	timer=setInterval(gameLoop, 20);
})

//初始化屏幕
function initScreen(){
	var canvas=$('#stageCanvas');
	ctx=canvas[0].getContext('2d');
	canvas.attr({'width':SCREEN_WIDTH});
	canvas.attr({'height':SCREEN_HEIGHT});

	wallCtx=$('#wallCanvas')[0].getContext('2d');
	$('#wallCanvas').attr({'width':SCREEN_WIDTH});
	$('#wallCanvas').attr({'height':SCREEN_HEIGHT});

	grassCtx=$('#grassCanvas')[0].getContext('2d');
	$('#grassCanvas').attr({'width':SCREEN_WIDTH});
	$('#grassCanvas').attr({'height':SCREEN_HEIGHT});

	tankCtx=$('#tankCanvas')[0].getContext('2d');
	$('#tankCanvas').attr({'width':SCREEN_WIDTH});
	$('#tankCanvas').attr({'height':SCREEN_HEIGHT});

	overCtx=$('#overCanvas')[0].getContext('2d');
	$('#overCanvas').attr({'width':SCREEN_WIDTH});
	$('#overCanvas').attr({'height':SCREEN_HEIGHT});

	$('#canvasSection').css({'width':SCREEN_WIDTH});
	$('#canvasSection').css({'height':SCREEN_HEIGHT});
	$('#canvasSection').css({'background-color':'#000'});

}

//初始化对象
function initObject(){
	menu=new Menu(ctx);//新建菜单
	stage=new Stage(ctx,level);//新建舞台
	map=new Map(wallCtx,grassCtx);//新建地图
	player1=new PlayTank(tankCtx);//新建一号玩家
	player1.x=129+map.offsetX;
	player1.y=385+map.offsetY;//玩家一出现的位置的x坐标和y坐标
	player2=new PlayTank(tankCtx);//新建二号玩家
	player2.offsetX=128;//player2的图片x与图片1相距128
	player2.x=256+map.offsetX;
	player2.y=385+map.offsetY;//玩家二出现的位置的x坐标和y坐标
	appearEnemy=0;//已出现的敌方坦克
	enemyArray=[];//敌方坦克
	bulletArray=[];//子弹数组
	keyList=[];//记录按下的按键
	crackArray=[];//爆炸数组
	isGameOver=false;
	overX=176;
	overY=384;//出现game over的位置坐标
	overCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	enemyStopTime=0;
	var homeProtectedTime=-1;//家被保护的时间（加上钢板的时间）
	var propTime=1000;	

}

function gameLoop(){
	switch(gameState){
		case GAME_STATE_MENU:
			menu.draw();
			break;
		case GAME_STATE_INIT:
			stage.draw();
			if(stage.isReady == true){
				gameState = GAME_STATE_START;//游戏开始状态
			}
			break;
		case GAME_STATE_START:
			drawAll();
			if(isGameOver || (player1.lives <=0 && player2.lives <=0)){
				gameState=GAME_STATE_OVER;//游戏结束状态
				map.homeHit();//家被破坏
				PLAYER_DESTROY_AUDIO.play();//播放玩家死亡的音乐
			}
			if(appearEnemy==maxEnemy && enemyArray.length==0){
				gameState=GAME_STATE_WIN;//游戏胜利状态
			}
			break;
		case GAME_STATE_WIN:
			nextLevel();
			break;
		case GAME_STATE_OVER:
			gameOver();
			break;
	}
}

$(document).keydown(function(e) {
	switch(gameState){
		case GAME_STATE_MENU:
			if(e.keyCode == keyboard.ENTER){
				gameState=GAME_STATE_INIT;
				//只有一个玩家
				if(menu.playNum==1){
					player2.lives=0;
				}
			}else{
				var n=0;
				if(e.keyCode==keyboard.DOWN){
					n=1;
				}else if(e.keyCode==keyboard.UP){
					n=-1;
				}
				menu.next(n);
			}
			break;
		case GAME_STATE_START:
			if(!keyList.contain(e.keyCode)){//包含就push
				keyList.push(e.keyCode);
			}
			//射击
			if(e.keyCode==keyboard.SPACE && player1.lives>0){
				player1.shoot(BULLET_TYPE_PLAYER);
			}else if(e.keyCode == keyboard.ENTER && player2.lives > 0){
				player2.shoot(BULLET_TYPE_ENEMY);
			}else if(e.keyCode==keyboard.N){
				nextLevel();//下一关
			}else if(e.keyCode==keyboard.P){
				preLevel();//上一关
			}
			break;
	}
});

$(document).keyup(function(e){
	keyList.remove(e.keyCode);//删除键值
});

//初始化地图
function initMap(){
	map.setMapLevel(level);//根据等级设置地图
	map.draw();//画地图
	drawLives();//显示生命值
}
//画生命值
function drawLives(){
	map.drawLives(player1.lives,1);
	map.drawLives(player2.lives,2);
}

//画子弹
function drawBullet(){
	if(bulletArray!=null && bulletArray.length>0){
		for(var i=0;i<bulletArray.length;i++){
			var bulletObj=bulletArray[i];
			if(bulletObj.isDestroyed){
				bulletObj.owner.isShooting=false;
				bulletArray.removeByIndex(i);
				i--;
			}else{
				bulletObj.draw();
			}
		}
	}
}

//键盘事件 
function keyEvent(){
	//玩家1
	if(keyList.contain(keyboard.W)){
		player1.dir=UP;
		player1.hit=false;
		player1.move();
	}else if(keyList.contain(keyboard.S)){
		player1.dir=DOWN;
		player1.hit=false;
		player1.move();
	}else if(keyList.contain(keyboard.A)){
		player1.dir=LEFT;
		player1.hit=false;
		player1.move();
	}else if(keyList.contain(keyboard.D)){
		player1.dir=RIGHT;
		player1.hit=false;
		player1.move();
	}
	//玩家2
	if(keyList.contain(keyboard.UP)){
		player2.dir=UP;
		player2.hit=false;
		player2.move();
	}else if(keyList.contain(keyboard.DOWN)){
		player2.dir=DOWN;
		player2.hit=false;
		player2.move();
	}else if(keyList.contain(keyboard.LEFT)){
		player2.dir=LEFT;
		player2.hit=false;
		player2.move();
	}else if(keyList.contain(keyboard.RIGHT)){
		player2.dir=RIGHT;
		player2.hit=false;
		player2.move();
	}
}

//向画布中添加敌方坦克
function addEnemyTank(){
	if(enemyArray==null || enemyArray.length>=maxAppearEnemy || maxEnemy==0){
		return ;
	}

	appearEnemy++;//增加敌人
	var rand=parseInt(Math.random()*3);
	var obj=null;
	if(rand==0){
		obj=new EnemyOne(tankCtx);
	}else if(rand==1){
		obj=new EnemyTwo(tankCtx);
	}else if(rand==2){
		obj=new EnemyThree(tankCtx);
	}

	obj.x=ENEMY_LOCATION[parseInt(Math.random()*3)]+map.offsetX;
	obj.y=map.offsetY;
	obj.dir=DOWN;
	enemyArray[enemyArray.length]=obj;
	//更新地图右侧坦克数量
	map.clearEnemyNum(maxEnemy,appearEnemy);
}

//画敌方坦克
function drawEnemyTanks(){
	if(enemyArray!=null || enemyArray.length>0){
		for(var i=0;i<enemyArray.length;i++){
			var enemyObj=enemyArray[i];
			if(enemyObj.isDestroyed){
				enemyArray.removeByIndex(i);
				i--;
			}else{
				enemyObj.draw();
			}
		}
	}
	if(enemyStopTime>0){
		enemyStopTime--;
	}
}

//画所有的东西
function drawAll(){
	tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);//先清空画布
	if(player1.lives>0){
		player1.draw();
	}
	if(player2.lives>0){
		player2.draw();
	}
	drawLives();
	if(appearEnemy<maxEnemy){
		if(mainframe%100==0){
			addEnemyTank();
			mainframe=0;//
		}
		mainframe++;
	}
	drawEnemyTanks();
	drawBullet();
	drawCrack();
	keyEvent();
	if(propTime<=0){
		drawProp();//画福利
	}else{
		propTime--;//福利存在的时间
	}
	if(homeProtectedTime>0){
		homeProtectedTime--;//钢板保护时间
	}else if(homeProtectedTime==0){
		homeProtectedTime=-1;
		homeNoProtected();//家里不被保护的时候
	}
}


function drawCrack(){//画爆破
	if(crackArray!=null && crackArray.length>0){
		for(var i=0;i<crackArray.length;i++){
			var crackObj=crackArray[i];
			if(crackObj.isOver){
				crackArray.removeByIndex(i);
				i--;
				if(crackObj.owner==player1){
					player1.renascenc(1);//重生
				}else if(crackObj.owner==player2){
					player2.renascenc(2);
				}
			}else{
				crackObj.draw();
			}
		}
	}
}

//游戏结束
function gameOver(){
	overCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	overCtx.drawImage(RESOURCE_IMAGE,POS['over'][0],POS['over'][1],64,32,overX+map.offsetX,overY+map.offsetY,64,32);
	overY-=2;
	if(overY<=parseInt(map.mapHeight/2)){
		initObject();
		//只有一个玩家
		if(menu.playNum==1){
			player2.lives=0;
		}
		saveScore();
		showScore();
		gameState=GAME_STATE_MENU;
		
	}
}

//下一关
function nextLevel(){
	level++;
	if(level==22){
		level=1;
	}
	initObject();
	//只有一个玩家
	if(menu.playNum==1){
		player2.lives=0;
	}
	stage.init(level);
	gameState=GAME_STATE_INIT;
}

//上一关
function preLevel(){
	level--;
	if(level==0){
		level=21;
	}
	initObject();
	//只有一个玩家
	if(menu.playNum==1){
		player2.lives=0;
	}
	stage.init(level);
	gameState=GAME_STATE_INIT;
}

//
function drawProp(){
	var rand=Math.random();
	if(rand<0.4 && prop==null){
		prop=new Prop(overCtx);
		prop.init();
	}
	if(prop!=null){
		prop.draw();
		if(prop.isDestroyed){
			prop=null;
			propTime=1000;
		}
	}
}

//家不被保护的时候
function homeNoProtected(){
	var mapChangeIndex = [[23,11],[23,12],[23,13],[23,14],[24,11],[24,14],[25,11],[25,14]];//改变地图的索引
	map.updateMap(mapChangeIndex,WALL);
}