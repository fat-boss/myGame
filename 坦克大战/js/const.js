/*静态变量*/

var SCREEN_WIDTH = 512; //屏幕宽
var SCREEN_HEIGHT = 448;//屏幕高

/*图片资源*/
var MENU_IMAGE = new Image();
MENU_IMAGE.src = "images/menu.gif";
var RESOURCE_IMAGE = new Image();
RESOURCE_IMAGE.src = "images/tankAll.gif";

/*各个图块在图片中的位置*/
var POS = new Array();
POS["selectTank"] = [128,96];//选择坦克
POS["stageLevel"] = [396,96];//舞台
POS["num"] = [256,96];//数字
POS["map"] = [0,96];//地图
POS["home"] = [256,0];//家
POS["score"] = [0,112];//分数
POS["player"] = [0,0];//玩家
POS["protected"] = [160,96];//保护
POS["enemyBefore"] = [256,32];//闪光
POS["enemy1"] = [0,32];//敌人1
POS["enemy2"] = [128,32];//敌人2
POS["enemy3"] = [0,64];//敌人3
POS["bullet"] = [80,96];//子弹
POS["tankBomb"] = [0,160];//坦克爆炸
POS["bulletBomb"] = [320,0];//子弹爆炸
POS["over"] = [384,64];//游戏结束
POS["prop"] = [256,110];//福利

/*声音资源*/
var START_AUDIO = new Audio("audio/start.mp3");//开始的音乐
var BULLET_DESTROY_AUDIO = new Audio("audio/bulletCrack.mp3");//子弹消失的音乐
var TANK_DESTROY_AUDIO = new Audio("audio/tankCrack.mp3");//坦克死掉的音乐
var PLAYER_DESTROY_AUDIO = new Audio("audio/playerCrack.mp3");//玩家爆炸的音乐
var MOVE_AUDIO = new Audio("audio/move.mp3");//移动的音乐
var ATTACK_AUDIO = new Audio("audio/attack.mp3");//子弹打中的音乐
var PROP_AUDIO = new Audio("audio/prop.mp3");//?

/*游戏状态*/
var GAME_STATE_MENU=0;
var GAME_STATE_INIT=1;
var GAME_STATE_START=2;
var GAME_STATE_OVER=3;
var GAME_STATE_WIN=4;

/*地图块*/
var WALL=1;//墙
var GRID=2;//钢板
var GRASS=3;//草地
var WATER=4;//水
var ICE=5;//冰
var HOME=9;//家
var ANOTHERHOME=8;//

/*坦克及子弹的四个方向*/
var UP=0;
var DOWN=1;
var LEFT=2;
var RIGHT=3;

/*坦克及子弹的四个方向*/
var ENEMY_LOCATION=[192,0,384];//相对于主游戏区

/*子弹类型*/
var BULLET_TYPE_PLAYER=1;
var BULLET_TYPE_ENEMY=2;

// 爆炸类型
var CRACK_TYPE_TANK="tank";
var CRACK_TYPE_BULLET="bullet";

