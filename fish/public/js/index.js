/**
 * Created by Administrator on 2016/10/21.
 */

window.onload=function(){
    var stargame = document.getElementById("stargame");//开始游戏
    var mybox = document.getElementById("box");//游戏主页
    var paihang = document.getElementById("paihang");//游戏主页
    var mycanvas = document.getElementById("myCanvas");//获得游戏盒子
    var queren = document.getElementById("queren");//获得确认按钮
    var end = document.getElementById("end");//获得结束提示框
    var endfen = document.getElementById("endfen");//获得结束提示框
    var mengceng = document.getElementById("mengceng");//获得结束提示框
    var ctx = mycanvas.getContext("2d");//获得上下文
    var fishList = [];//鱼数组
    var bullList = [];//炮弹数组
    var webList = [];//渔网数组
    var coinList = [];//金币数组
    var cointextList = [];//金币数字数组
    var deadFishList = [];//死鱼数组

    var integralList = [];//积分数组
    var integralarry = ['0','0','0','1','0','0'];//开始的积分
    var JF=0;//取得鱼的积分

    var fish_padding = 200;//给鱼距离盒子的距离
    var canNum = 0;//炮体的状态
    var isJian = false;//减按钮的状态
    var isJia = false;//加按钮的状态
    var clearCannon;//清除点击变换炮体的帧数
    var clearCannonxc;//清除点击变换炮体帧数的延迟
    var clearbullt;//清除点击变换炮体帧数的延迟
    var gameTime = [6,0];//倒计时
    var timeList = [];//倒计时数组


    //点击开始游戏
    stargame.onclick = function(){
        mybox.style.display = 'none';
        all();
    };

    //创建数据库
    var db = openDatabase('fish1','','',1024*1024*10);
    db.transaction(function(tx){
        tx.executeSql("create billiards if not exists t_user(u_fen int)")
    });
    function getfen(){
        var fen = Number(integralarry.join(''));
        //alert(typeof +integralarry.join(''));
        db.transaction(function(tx){
            tx.executeSql("insert into t_user(u_fen) values(?)",[fen],function(trans,rs){
                console.log("正确信息"+rs);
            },function(trans,err){
                console.log("错误对象"+err);
            })
        });
    }

    paiming();
    function paiming(){
        db.transaction(function(tx){//select * from t_score order by 成绩 limit 10
            tx.executeSql("select * from t_user order by u_fen desc limit 5",[],function(trans,rs){
                for(var i=0;i<rs.rows.length;i++){
                    //console.log(rs.rows.item(i).u_fen);
                    paihang.innerHTML += `<p><span>${i+1}</span><b>${rs.rows.item(i).u_fen}</b><p>`
                }
            });
        })
    }


    function all(){
    util.loadImage(material.img,function(imgs){
        var fishs = [//鱼的对象 w宽 h高 m动画状态总帧数 c金币
            {img : imgs.fish1, w : 55, h : 37, m : 4, c : 1},
            {img : imgs.fish2, w : 78, h : 64, m : 4, c : 2},
            {img : imgs.fish3, w : 72, h : 56, m : 4, c : 5},
            {img : imgs.fish4, w : 77, h : 59, m : 4, c : 10},
            {img : imgs.fish5, w : 107, h : 122, m : 4, c : 15},
            {img : imgs.fish6, w : 105, h : 79, m : 8, c : 20},
            {img : imgs.fish7, w : 92, h : 151, m : 6, c : 25},
            {img : imgs.fish8, w : 174, h : 126, m : 8, c : 30},
            {img : imgs.fish9, w : 166, h : 183, m : 8, c : 40},
            {img : imgs.fish10, w : 178, h : 187, m : 6, c : 50},
            {img : imgs.shark1, w : 509, h : 270, m : 8, c : 100},
            {img : imgs.shark2, w : 516, h : 273, m : 8, c : 200}
        ];
        var cannons = [//炮体的对象 w宽度 h高度
            {img:imgs.cannon1, w: 74, h: 74},
            {img:imgs.cannon2, w: 74, h: 76},
            {img:imgs.cannon3, w: 74, h: 76},
            {img:imgs.cannon4, w: 74, h: 83},
            {img:imgs.cannon5, w: 74, h: 85},
            {img:imgs.cannon6, w: 74, h: 90},
            {img:imgs.cannon7, w: 74, h: 94}
        ];
        var bullets = [//炮弹的对象 ax，ay为炮弹的在图片上的位置，w宽度 h高度
            {img : imgs.bullet, ax : 86, ay : 0, w : 24, h : 26},
            {img : imgs.bullet, ax : 61, ay : 0, w : 25, h : 29},
            {img : imgs.bullet, ax : 32, ay : 35, w : 27, h : 31},
            {img : imgs.bullet, ax : 30, ay : 82, w : 29, h : 33},
            {img : imgs.bullet, ax : 0, ay : 82, w : 30, h : 34},
            {img : imgs.bullet, ax : 30, ay : 0, w : 31, h : 35},
            {img : imgs.bullet, ax : 0, ay : 44, w : 32, h : 38},
            {img : imgs.bullet, ax : 0, ay : 0, w : 30, h : 44}
        ];
        var webs = [//渔网的对象 sx，sy为渔网在图片上裁剪位置 wh宽度高度大小
            {img : imgs.web, sx : 319, sy : 355, w : 116, h : 118},
            {img : imgs.web, sx : 0, sy : 399, w : 137, h : 142},
            {img : imgs.web, sx : 163, sy : 355, w : 156, h : 162},
            {img : imgs.web, sx : 242, sy : 181, w : 180, h : 174},
            {img : imgs.web, sx : 0, sy : 244, w : 163, h : 155},
            {img : imgs.web, sx : 242, sy : 0, w : 191, h : 181},
            {img : imgs.web, sx : 0, sy : 0, w : 242, h : 244}
        ];
        var coins = [//金币对象 图片 宽 高
            {img:imgs.coinAni1,w:60,h:60},
            {img:imgs.coinAni2,w:60,h:60}
        ];
        var cointexts = {
            '0':{img:imgs.coinText,sx:0,w:36,h:49},
            '1':{img:imgs.coinText,sx:36,w:36,h:49},
            '2':{img:imgs.coinText,sx:72,w:36,h:49},
            '3':{img:imgs.coinText,sx:108,w:36,h:49},
            '4':{img:imgs.coinText,sx:144,w:36,h:49},
            '5':{img:imgs.coinText,sx:180,w:36,h:49},
            '6':{img:imgs.coinText,sx:216,w:36,h:49},
            '7':{img:imgs.coinText,sx:252,w:36,h:49},
            '8':{img:imgs.coinText,sx:288,w:36,h:49},
            '9':{img:imgs.coinText,sx:324,w:36,h:49},
            'x':{img:imgs.coinText,sx:360,w:36,h:49}
        };

        fishArise();
        //创建鱼的方法
        function fishArise(){
            setTimeout(function(){
                var fishNum = parseInt(util.probty(Math.random()*100));//随机出现不同的鱼
                var _fish = fishs[fishNum];//取得鱼的种类
                var afish = new Fish(_fish.img,_fish.w,_fish.h,_fish.m);
                //鱼从哪边出现的随机数
                if(Math.random()<0.5){//左边
                    afish.x = -fish_padding;//如果是左边就平移画布成负数
                    afish.routate = Math.random() * 120 - 60;//[-60,60)
                }else{
                    afish.x = mycanvas.width+fish_padding;//如果是右边就平移画布加上盒子的宽度
                    afish.routate = Math.random() * 120 - 240;//[-240,120)
                }
                afish.y = Math.random() * mycanvas.height;//y轴随机出现
                afish.num = fishNum+1;//用来算两个之间的概览的
                afish.c = _fish.c;
                fishList.push(afish);//放到鱼的数组里面去
                fishArise();//自己调用自己
            },Math.random()*500);
        }



        //点击更换炮体和子弹的状态
         mycanvas.onclick = function (e){//获取event对象
             clearInterval(clearCannon);//
             clearTimeout(clearCannonxc);
             clearTimeout(clearbullt);
            var e = arguments[0]||window.event;
            var x = e.clientX;//监听点击x轴
            var y = e.clientY;//监听点击y轴

             if(y>580){
                 if(x>675&&x<705&&y>630&&y<653){
                     canNum--;
                     if(canNum<0){
                         canNum=6;
                     }
                     //减按钮的的x坐标675-705 y的坐标630-653
                     isJian = true;
                 }else if(x>784&&x<813&&y>630&&y<653){
                     //加按钮的的x坐标784-813 y的坐标630-653
                     canNum++;
                     if(canNum>6){
                         canNum=0;
                     }
                     isJia = true;
                 }
                 //改变炮体形态
                 _cannon = cannons[canNum];
                 cannon = new Cannon(_cannon.img,_cannon.w,_cannon.h,5);
                 cannon.y = 620;
                 cannon.x = 745;
             }else{
                 //旋转炮体
                 var x2 = cannon.x;
                 var y2 = cannon.y;
                 var x1 = x - x2;
                 var y1 = y - y2;
                 var a = Math.atan2(y1, x1);
                 JF = -(canNum+1);
                 cannon.routate = util.conHd(a) + 90;
                 //一个定时器让炮体变换帧数
                 clearCannon=setInterval(function(){
                     cannon.renewalFrame();
                 },50);


                 //如果金币少于
                 if(+integralarry.join('')<10){
                     getfen();
                     end.style.display = 'block';
                     mengceng.style.display='block';
                     endfen.innerHTML = `你的得分为${+integralarry.join('')}`;
                     queren.onclick = function(){
                         location.reload();
                     };
                 }

                 //产生炮弹
                 clearbullt=setTimeout(function(){

                     var _bullet = bullets[canNum];
                     var abullet = new Bullet(_bullet.img,_bullet.ax,_bullet.ay,_bullet.w,_bullet.h);
                     abullet.x = cannon.x;//炮弹出现的位置和炮体一直
                     abullet.y = cannon.y;
                     abullet.routate = cannon.routate;//角度一样
                     abullet.num = canNum+1;//用来算两个之间的概率的
                     bullList.push(abullet);


                     //发子弹 减少
                     getJf(JF);
                     integralList=[];
                     for(let i = 0 ; i<integralarry.length ; i++){
                         var _integralnum = integralarry[i];
                         var _integral = cointexts[_integralnum];
                         var aintergral = new Integral(_integral.img,_integral.w,_integral.h,_integral.sx);
                         aintergral.x = 345+i*23;
                         aintergral.y = 643;
                         integralList.push(aintergral);
                     }
                 },200);
             }
             clearCannonxc=setTimeout(function(){
                 clearInterval(clearCannon);
             },250);
        };

        //创建组件
        //炮体
        var _cannon = cannons[canNum];//点击加减相应这里会改变炮体的状态
        var cannon = new Cannon(_cannon.img,_cannon.w,_cannon.h,5);
        cannon.y = 620;
        cannon.x = 745;

        //底部栏
        var bottomBar = new paly(imgs.bottomBar,765,71);
        bottomBar.y = 624;
        bottomBar.x = 700;

        //减少威力按钮
        var cannonMinus = new paly(imgs.cannonMinus,44,31);
        cannonMinus.x=690;
        cannonMinus.y=640;
        //减少按钮被按下的状态
        var cannonMinusDown = new paly(imgs.cannonMinusDown,44,31);
        cannonMinusDown.x=690;
        cannonMinusDown.y=640;
        //增加威力按钮
        var cannonPlus = new paly(imgs.cannonPlus,44,31);
        cannonPlus.x=800;
        cannonPlus.y=640;
        //增加按钮被按下的状态
        var cannonPlusDown = new paly(imgs.cannonPlusDown,44,31);
        cannonPlusDown.x=800;
        cannonPlusDown.y=640;

        //产生积分
        getJf(JF);
        function getJf(jf){
            var integralNum = +integralarry.join('')+jf+'';
            for(let i = 0;i<integralarry.length;i++){
                if(i<integralarry.length-integralNum.length){
                    integralarry[i]='0';
                }else{
                    integralarry[i]=integralNum[(integralNum.length-(integralarry.length-i))%integralNum.length];
                }
            }
        }
        for(let i = 0 ; i<integralarry.length ; i++){
            var _integralnum = integralarry[i];
            var _integral = cointexts[_integralnum];
            var aintergral = new Integral(_integral.img,_integral.w,_integral.h,_integral.sx);
            aintergral.x = 345+i*23;
            aintergral.y = 643;
            integralList.push(aintergral);
        }


        //倒计时时间
        var cleartime = setInterval(function(){
            if(gameTime[1]==0&&gameTime[0]!=0){
                gameTime[1]=9;
                gameTime[0]--;

            }else if(gameTime[1]!=0){
                gameTime[1]--
            }else if(gameTime[1]==0&&gameTime[0]==0){
                clearInterval(cleartime);
                getfen();
                end.style.display = 'block';
                mengceng.style.display='block';
                endfen.innerHTML = `你的得分为${+integralarry.join('')}`;
                queren.onclick = function(){
                    location.reload();
                };
            }
            timeList = [];
            daojishi();
        },1000);
        daojishi();
        function daojishi(){
            for(let i = 0 ; i<gameTime.length ; i++){
                var _gameTime = gameTime[i];
                var _times = cointexts[_gameTime];
                var agameTime = new Integral(_times.img,_times.w,_times.h,_times.sx);
                agameTime.scale = 1;
                agameTime.x = 710+i*40;
                agameTime.y = 50;
                timeList.push(agameTime);
            }
        }

        //移动鱼和绘制鱼的方法
        setInterval(function(){
            ctx.clearRect(0,0,1366,659);//先清除画布
            for(let i = 0 ; i<fishList.length; i++){
                if(util.isOut(fishList[i],mycanvas.width,mycanvas.height,fish_padding)){//判断了一下鱼有没有出画布，如果出画布就删除数组中的位置
                    fishList.splice(i,1);//如果超出范围  就删除这条鱼
                    continue;
                }
                fishList[i].move();//移动
                fishList[i].draw(ctx);//绘制
            }

            //移动炮弹
            for(let i = 0 ; i<bullList.length ; i++){
                if(util.isOut(bullList[i].x,mycanvas.width,mycanvas.height,fish_padding)){//判断如果子弹出了屏幕就删除所在数组得位置
                    bullList.splice(i,1);//如果超出范围就删除这颗炮弹
                    continue;
                }
                bullList[i].move();
                bullList[i].draw(ctx);
            }

            //绘制金币
            for(let i = 0 ; i <coinList.length; i++){//绘制金币，判断有没有达到金库坐标的范围，如果达到，就删除这个金币
                if(coinList[i].x >= coinList[i].targetX - 50 && coinList[i].x <= coinList[i].targetX + 50 && coinList[i].y >= coinList[i].targetY - 30 && coinList[i].y <= coinList[i].targetY + 30){
                    coinList.splice(i,1);//删除当前的金币
                    continue;
                }
                coinList[i].move();
                coinList[i].draw(ctx);
            }

            //检测碰撞两个循环判断
            for(let i = 0 ; i < fishList.length ; i++){//鱼的数组
                for(let j = 0 ; j < bullList.length ; j++){//炮弹的数组
                    if(util.isCollide(fishList[i],bullList[j])){//一个判断如果碰撞过后
                        //产生渔网对象
                        var _web = webs[canNum];//获取类型的子弹 产生什么类型的渔网
                        var aweb = new Web(_web.img,_web.w,_web.h,_web.sx,_web.sy,bullList[j].x,bullList[j].y);
                        webList.push(aweb);//放进渔网数组

                        //击中鱼 鱼死的概览
                        for(var k =  0 ; k<fishList.length ; k++){
                            for(var l =0 ; l<webList.length ; l++){
                                if(util.isCollide(fishList[k],webList[l])&&util.isDead(bullList[j].num,fishList[k].num)){//判断渔网是否和鱼碰撞，在判断概率是否成功捕鱼

                                    //产生金币
                                    var _cointext = fishList[k].c+'x';//取得每条鱼总共多少金币
                                    JF = fishList[k].c;//取得每条鱼总共多少金币
                                    if(fishList[k].c<10){
                                        var _coin = coins[0];//如果金币小于10，那么就是银币
                                    }else{
                                        var _coin = coins[1];//否则就是金币
                                    }
                                    var acoin = new Coin(_coin.img,_coin.w,_coin.h,fishList[k].x,fishList[k].y,390,615,10);
                                    coinList.push(acoin);

                                    //产生金币数量
                                    for(let i = 0 ; i<_cointext.length ; i++){
                                        var coinNum = cointexts[_cointext.charAt(i)];
                                        var acointext = new Cointext(coinNum.img,coinNum.w,coinNum.h,coinNum.sx,fishList[k].x+i*36,fishList[k].y,fishList[i].x+i*36,fishList[i].y);
                                        cointextList.push(acointext);
                                    }

                                    //加积分
                                    getJf(JF);
                                    integralList=[];
                                    for(let i = 0 ; i<integralarry.length ; i++){
                                        var _integralnum = integralarry[i];
                                        var _integral = cointexts[_integralnum];
                                        var aintergral = new Integral(_integral.img,_integral.w,_integral.h,_integral.sx);
                                        aintergral.x = 345+i*23;
                                        aintergral.y = 643;
                                        integralList.push(aintergral);
                                    }

                                    //产生死鱼对象(被打死的鱼的图片，宽，高，x坐标，y坐标，活鱼的最大帧数，死鱼的最大帧数)
                                    var adeadfish = new deadFish(fishList[k].img,fishList[k].w,fishList[k].h,fishList[k].maxFrames,4);
                                    adeadfish.x = fishList[k].x;
                                    adeadfish.y = fishList[k].y;
                                    adeadfish.routate = fishList[k].routate;//角度和活鱼一样的角度
                                    deadFishList.push(adeadfish);

                                    //一个删除死鱼的函数//自己调用自己是为了不出bug 不用外边的函数也能执行，但是会出现bug
                                    (function(obj){
                                        setTimeout(function(){
                                            for(let i = 0 ; i < deadFishList.length;i++){
                                                if(deadFishList[i]==obj){
                                                    deadFishList.splice(i,1);
                                                    break;
                                                }
                                            }
                                        },800)
                                    })(adeadfish);
                                    fishList.splice(k,1);//删除这个条鱼 跳出循环
                                    break;
                                }
                            }
                        }

                        bullList.splice(j,1);//删除这个炮弹 跳出循环
                        break;
                    }
                }
            }

            //绘制渔网
            for(let i = 0 ; i<webList.length; i ++ ){
                webList[i].scale+=0.04;//让渔网缩放
                webList[i].draw(ctx);
                if(webList[i].scale>=1){//缩放大于1的时候删除当前渔网
                    webList.splice(i,1)
                }
            }
            //绘制死鱼
            for(let i = 0 ; i<deadFishList.length ; i++){
                deadFishList[i].draw(ctx);
            }

            bottomBar.draw(ctx);//绘制组件
            cannon.draw(ctx);//绘制炮体

            if(isJian){
                cannonMinusDown.draw(ctx);//减少被按下按钮
                isJian = false;
            }else{
                cannonMinus.draw(ctx);//减少按钮
            }

            if(isJia){
                cannonPlusDown.draw(ctx);//增加被按下按钮
                isJia = false;
            }else{
                cannonPlus.draw(ctx);//增加按钮
            }

            //绘制金币数量
            for(let i = 0 ; i <cointextList.length;i++){
                if(cointextList[i].time>=50){//如果time时间大于50 就删除当前的金币
                    cointextList.splice(i,1);
                    continue;
                }
                cointextList[i].move();
                cointextList[i].draw(ctx);
            }

            //绘制积分
            for(let i = 0 ; i<integralList.length ; i++){
                integralList[i].draw(ctx);
            }

            //绘制倒计时
            for(let i = 0 ; i<timeList.length ; i++){
                timeList[i].draw(ctx);
            }

        },16);

        //换图方法
        setInterval(function(){
            for(let i = 0 ; i<fishList.length;  i++){
                fishList[i].renewalFrame();
            }
            for(let i = 0 ; i<deadFishList.length;  i++){
                deadFishList[i].renewalFrame();
            }
            for(let i = 0 ; i<coinList.length;  i++){
                coinList[i].renewalFrame();
            }

        },150);
    },function(){
        alert("1")
    });
    }
    };

