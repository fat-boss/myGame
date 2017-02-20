//画网格
function drawGrid(ctx,color,stepx,stepy){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;

    for (var i=stepx+0.5;i<ctx.canvas.width;i+=stepx) {
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,ctx.canvas.height);
        ctx.stroke();
        ctx.closePath();
    }
    for (var i = 0; i < ctx.canvas.height; i+=stepy) {
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(ctx.canvas.width,i);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}
//画小球
function contextStyle(i){
    var m=50*balls[i].x +25,
        n=50*balls[i].y +25;
    ctx.fillStyle = "#c03";
    ctx.fillStyle = colors[balls[i].color];
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(m,n,23,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

function keyAction(event){
    var keyCode;
    if(event == null){
        keyCode = window.event.keyCode;
    }else{
        keyCode = event.keyCode;
    }
    switch (keyCode){
        case 37:
        case 65:
            leftArrow();
            break;
        case 38:
        case 87:
            upArrow();
            break;
        case 39:
        case 68:
            rightArrow();
            break;
        case 40:
        case 83:
            downArrow();
            break;
        case 82:
            undo();
            break;
    }
}
function upArrow(){//??
    findCheckBall();
    if(checkBall == null){//?
        drawBalls(balls);

    }else{
        checkBall.vy = -0.2;
        var count = 0;
        var nextRight = false;

        //判断是否相邻
        for (var i= balls.length-1; i>=0;i--) {
            if(checkBall.x == balls[i].x &&checkBall.y-balls[i].y>1){
                count++;
            }else if(checkBall.x == balls[i].x&&checkBall.y-balls[i].y==1){
                nextRight = true;
            }
        }
        if(count == 0|| nextRight == true){
            drawBalls(balls);
        }else{
            ballsText = JSON.stringify(balls);
            historyBalls.push(ballsText);
            ballsLength = balls.length;
            //requestAnimationFrame  等同于setTimeout  间隔根据计算机而定
            requestAnimationFrame(rightAnimation);
        }
    }
}

function downArrow(){
    findCheckBall();
    if(checkBall == null){
        drawBalls(balls);
    }else{
        checkBall.vy = 0.2;

        var count = 0;
        var nextRight = false;
        for (var i = balls.length-1; i >=0; i--) {
            if(checkBall.x == balls[i].x && balls[i].y-checkBall.y>1){
                count++;
            }else if(checkBall.x == balls[i].x&&balls[i].y-checkBall.y == 1){
                nextRight = true;
            }
        }
        if (count == 0 || nextRight == true) {
            drawBalls(balls);
        } else {
            ballsText = JSON.stringify(balls);
            historyBalls.push(ballsText);

            ballsLength = balls.length;
            requestAnimationFrame(rightAnimation);
        }
    }
}

function leftArrow() {
    findCheckBall();
    if (checkBall == null) {
        drawBalls(balls);
    } else {
        checkBall.vx = -0.2;

        var count = 0;
        var nextRight = false;

        for (var i =  balls.length - 1; i >= 0; i--) {
            if (checkBall.y == balls[i].y && checkBall.x - balls[i].x > 1) {
                count++;
            } else if (checkBall.y == balls[i].y && checkBall.x - balls[i].x == 1) {
                nextRight = true;
            }
        }

        if (count == 0 || nextRight == true) {
            drawBalls(balls);
        } else {
            ballsText = JSON.stringify(balls);
            historyBalls.push(ballsText);

            ballsLength = balls.length;
            requestAnimationFrame(rightAnimation);
        }
    }
}

function rightArrow() {
    findCheckBall();
    if (checkBall == null) {
        drawBalls(balls);
    } else {
        checkBall.vx = 0.2;

        var count = 0;
        var nextRight = false;

        for (var i =  balls.length - 1; i >= 0; i--) {
            if (checkBall.y == balls[i].y && balls[i].x - checkBall.x > 1) {
                count++;
            } else if (checkBall.y == balls[i].y && balls[i].x - checkBall.x == 1) {
                nextRight = true;
            }
        }

        if (count == 0 || nextRight == true) {
            drawBalls(balls);
        } else {
            ballsText = JSON.stringify(balls);
            historyBalls.push(ballsText);

            ballsLength = balls.length;
            requestAnimationFrame(rightAnimation);
        }
    }
}

function findCheckBall() {
    removeEvent();
    show(gameComplete);
    checkBall = null;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].check == true) {
            balls[i].check = false;
            checkBall = balls[i];
        }
    }
}
function removeEvent() {
    window.removeEventListener("keydown", keyAction, false);
    upBtn.onclick = null;
    downBtn.onclick = null;
    leftBtn.onclick = null;
    rightBtn.onclick = null;
    undoBtn.onclick = null;
    menuBtn.onclick = null;
}

function rightAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, "lightgrey", 50, 50);

    ctx.save();

    //判断是否相撞并交换速度
    for (var i = 0; i < balls.length; i++) {
        var ballA = balls[i];

        //内循环的索引必须大于外循环索引
        for (var j = i+1; j < balls.length; j++) {
            var ballB = balls[j];
            //在x轴方向相撞则交换x方向速度
            if (ballA.y == ballB.y && Math.abs(ballB.x - ballA.x) < 0.99) {
                var temp = ballA.vx;
                ballA.vx = ballB.vx;
                ballB.vx = temp;
            }
            //在y轴方向相撞则交换y方向速度
            if (ballA.x == ballB.x && Math.abs(ballA.y - ballB.y) < 1) {
                var temp = ballA.vy;
                ballA.vy = ballB.vy;
                ballB.vy = temp;
            }
        }


        //小球运动
        ballA.x = ballA.x + ballA.vx;
        ballA.y = ballA.y + ballA.vy;

        contextStyle(i);

        if (balls[i].x > 8 || balls[i].x < -1 || balls[i].y > 8 || balls[i].y < -1) {
            balls.splice(i, 1);
        }
    }

    ctx.restore();

    if (balls.length == ballsLength) {
        requestAnimationFrame(rightAnimation);
    } else {
        drawBalls(balls);
        pan();
    }
}
