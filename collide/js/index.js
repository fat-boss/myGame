
var gameState = $('#gameState')[0];
var gameUI = $('#gameUI')[0];
var gameMenu = $('#gameMenu')[0];
var gameIntro = $('#gameIntro')[0];
var gameCtrl = $('#gameCtrl')[0];
var gameComplete = $('#gameComplete')[0];
var playBtn = $('#playBtn')[0];
var introBtn = $('#introBtn')[0];
var playBtn2 = $('#playBtn2')[0];
var upBtn = $('#upBtn')[0];
var downBtn = $('#downBtn')[0];
var leftBtn = $('#leftBtn')[0];
var rightBtn = $('#rightBtn')[0];
var gameEndShow = $('#gameEndShow')[0];
var scoreShow = $('#scoreShow')[0];
var nameInput = $('#nameInput')[0];
var addBtn = $('#addBtn')[0];
var newGameBtn = $('#newGameBtn')[0];
var highScoreList = $('#highScoreList')[0];
var nextBtn = $('#nextBtn')[0];
var canvas = $('#canvas')[0],
ctx = canvas.getContext("2d");
var undoBtn = $('#undoBtn')[0];
var puzzleScore = $('#puzzleScore')[0];
var menuBtn = $('#menuBtn')[0];
var sore = $('#sore')[0];//排名

var checkBall = null,
    puzzle = 0,//关卡
    score = 0;//得分
var start = 0,
    end = 0,
    difficulty =0;
var colors = [];
var balls = [];
var ballsText = "";
var ballsLength = 0;
var historyBalls = [];
var puzzles = [];
var highScoreArray = [];


colors = ["#C03", "DarkKhaki", "yellow", "grey", "pink","green", "orange", "brown", "Magenta","DeepSkyBlue"];


hide(gameIntro);
hide(gameCtrl);
hide(gameComplete);
hide(undoBtn);
hide(puzzleScore);

playBtn.onclick = function(e){
    e.preventDefault();//通过调用该方法，可以阻止提交表单;通知 Web 浏览器不要执行与事件关联的默认动作
    hide(gameMenu);
    show(gameCtrl);
    show(undoBtn);
    startGame();
};

introBtn.onclick = function(e){
    e.preventDefault();
    hide(gameMenu);
    show(gameIntro);
    gameState.innerHTML = "<h2>Instructions</h2>";
};

resetBtn.onclick = function(e){
    e.preventDefault();
    localStorage.setItem("fling_puzzle",0);
    localStorage.setItem("fling_score",0);
    hide(gameMenu);
    // show(gameCtrl);
    startGame();
    // show(gameEndShow);
}

playBtn2.onclick = function(e){
    e.preventDefault();
    hide(gameIntro);
    show(gameCtrl);
    show(undoBtn);
    startGame();
}
nextBtn.onclick = function(){
    puzzle++;
    localStorage.setItem("fling_puzzle",puzzle);
    localStorage.setItem('fling_score',score);
    startGame();
};
//添加分数
addBtn.onclick = function(){
    gameEnd();
    hide(nameInput);
    hide(addBtn);
}
//新游戏
newGameBtn.onclick = function(){
    localStorage.setItem("fling_puzzle",0);
    localStorage.setItem("fling_score",0);
    startGame();
}

function startGame(){
    init();
    gameState.innerHTML = "<h2>Puzzle: " + (puzzle+1)  + " Score: " + score + "</h2>";
    removeEvent();//移除键盘按键事件
    show(gameComplete);
    hide(gameEndShow);
    hide(nextBtn);
    hide(puzzleScore);

    historyBalls = [];
    balls = puzzles[puzzle];//根据当前关卡显示小球
    ballsText = JSON.stringify(balls);//把当前小球的排列的数组转化成字符串
    historyBalls.push(ballsText);
    difficulty = balls.length;
    //console.log(balls.length)
    for(var i=0;i<balls.length;i++){
        //设置小球速度属性
        balls[i].vx = 0;//????
        balls[i].vy = 0;//?????
    }

    //var j = 0;
    startAnimation();
    function startAnimation(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawGrid(ctx,"lightgrey",50,50);
        ctx.save();

        for (var i = 0; i < balls.length; i++) {
            contextStyle(i);
        }
        ctx.restore();

        //j++;//j作用？？
        //if(j<balls.length){
        //    setTimeout(startAnimation,200);
        //}else{
            drawBalls(balls);
            start = Date.now();
        //}
    }
}

//画移动小球
function drawBalls(balls){//??
    hide(gameComplete);
    window.addEventListener("keydown",keyAction);
    upBtn.onclick = upArrow;
    downBtn.onclick = downArrow;
    leftBtn.onclick = leftArrow;
    rightBtn.onclick = rightArrow;
    undoBtn.onclick = undo;
    menuBtn.onclick = showMenu;

    for (var i = 0; i < balls.length; i++) {
        //小球移动速度
        balls[i].vx = 0;
        balls[i].vy = 0;
    }

    drawGrid(ctx,"lightgrey",50,50);

    ctx.save();
    ctx.fillStyle = "#c03";

    for (var i = 0; i < balls.length; i++) {
        balls[i].x = Math.round(balls[i].x);
        balls[i].y = Math.round(balls[i].y);

        contextStyle(i);
    }
    ctx.restore();
}

//计分
function pan() {
    if (balls.length == 1) {
        setTimeout(function() {
            end = Date.now();
            removeEvent();
            show(gameComplete);
            show(nextBtn);
            show(puzzleScore);

            var p;
            switch (difficulty) {
                case 3:
                case 4:
                    p = 16;
                    break;
                case 5:
                    p = 24;
                    break;
                case 6:
                    p = 40;
                    break;
                case 7:
                    p = 64;
                    break;
                case 8:
                case 9:
                case 10:
                    p = 100
                    break;
            }

            if (end - start < p*1000) {
                score += parseInt(p*1000 - (end - start));
                puzzleScore.innerHTML = "You got " + parseInt(p*1000 - (end - start)) + " !";
            } else {
                score += 0;
                puzzleScore.innerHTML = "You got zero! haha...";
            }
            gameState.innerHTML = "<h2>Puzzle: " + (puzzle+1)  + " Score: " + score + "</h2>";

            if (puzzle == puzzles.length - 1) {
                show(gameEndShow);
                show(nameInput);
                show(addBtn);
                hide(nextBtn);
                gameState.innerHTML = "<h2>Congratulations!</h2>"
                scoreShow.innerHTML = score;

                highScoreArray = getHighScoreArray();

                if (highScoreArray.length == 12 && score < parseInt(highScoreArray[11].score)) {
                    hide(nameInput)
                    hide(addBtn);
                }
            }
        }, 200);
    }
}

function showMenu() {
    gameState.innerHTML = "<h2>Main Menu</h2>";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    show(gameMenu);
    hide(undoBtn);
    hide(gameIntro);
    hide(gameCtrl);
    hide(gameComplete);
}
function undo() {
    ballsText = historyBalls.pop();
    if (ballsText) {
        balls = JSON.parse(ballsText);
        drawBalls(balls);
    }
}

function gameEnd() {
    highScoreArray = getHighScoreArray();
    var username = nameInput.value;
    var userObj = {
        "username": username,
        "score": score
    };
    if (highScoreArray.length < 12) {
        highScoreArray.push(userObj);
        for (var i = highScoreArray.length - 1; i >= 0; i--) {
            if (score > parseInt(highScoreArray[i].score)) {
                var t = highScoreArray[i];
                highScoreArray[i] = userObj;
                highScoreArray[i + 1] = t;
            }
        }
    } else {
        for (var i = highScoreArray.length - 1; i >= 0; i--) {
            if (score > parseInt(highScoreArray[i].score)) {
                if (i == 11) {
                    highScoreArray[i] = userObj;
                } else {
                    var t = highScoreArray[i];
                    highScoreArray[i] = userObj;
                    highScoreArray[i + 1] = t;
                }
            }
        }
    }

    localStorage.setItem("fling_highScore",JSON.stringify(highScoreArray));
    highScoreList.innerHTML = "";
    updateHighScore();
}
getHighScoreArray();
function getHighScoreArray(){
    sore.innerHTML = "<h2>英雄榜</h2>"+
        "<billiards>"+
        "<tr>"+
        "<td>排名</td>"+
        "<td>姓名</td>"+
        "<td>分数</td>"+
        "</tr>"+
        "</billiards>"
    var highScoreArray = localStorage.getItem("fling_highScore");
    if (!highScoreArray) {
        highScoreArray = [];
        localStorage.setItem("fling_highScore",JSON.stringify(highScoreArray));
    } else {
        highScoreArray = JSON.parse(highScoreArray);
        for (var i = 0; i < highScoreArray.length; i++) {
            var j = i+1;
            var s = $("#sore billiards");
            s.append('<tr><td>'+j+'</td><td>'+highScoreArray[i].username+'</td><td>'+highScoreArray[i].score+'</td></tr>');
        }

    }
    return highScoreArray;
}

function addHighScoreToDOM(userObj) {
    var user = document.createElement("li");
    user.innerHTML = userObj.score + " by " + userObj.username;
    highScoreList.appendChild(user);
}

function updateHighScore() {
    for (var i = 0; i < highScoreArray.length; i++) {
        var value = highScoreArray[i];
        addHighScoreToDOM(value);
    }
}

nameInput.onkeyup = function (e) {
    if(nameInput.value.length > 0) {
        addBtn.disabled = false;
    }
    else {
        addBtn.disabled = true;
    }
};


canvas.onmousedown =function(e) {
    var location = windowToCanvas(canvas, e.clientX, e.clientY),
        locationX = location.x.toFixed(0),
        locationY = location.y.toFixed(0);

    for (var i = 0; i < balls.length; i++) {
        balls[i].check = false;
    }
    drawBalls(balls);

    for (var i = 0; i < balls.length; i++) {
        var m = 50 * balls[i].x + 25,
            n = 50 * balls[i].y + 25;
        if (Math.abs(locationX - m) < 25 && Math.abs(locationY - n) < 25) {
            balls[i].check = true;
            ctx.save();
            ctx.strokeStyle = "rgba(0, 0, 0, 0.4)"
            ctx.strokeRect(m-25, n-25, 50, 50);
            ctx.restore();
        }
    }
};

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();//在canvas对象上调用getBoundingClientRect()方法，来获取canvas元素的边界框
    return { x: x - bbox.left * (canvas.width  / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
    };
}


function hide(elem) {
    elem.style.display = "none";
}

function show(elem) {
    elem.style.display = "";
}