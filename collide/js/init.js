function init(){
    //�ؿ�����
    puzzles = [
        [{x: 3, y: 1}, {x: 3, y: 5}, {x: 7, y: 4}],
        [{x: 1, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}],
        [{x: 1, y: 2}, {x: 4, y: 2}, {x: 4, y: 4}, {x: 5, y: 2}],
        [{x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 0}, {x: 4, y: 6}],
        [{x: 0, y: 5}, {x: 1, y: 2}, {x: 6, y: 5}, {x: 7, y: 3}],
        [{x: 1, y: 1}, {x: 1, y: 6}, {x: 5, y: 6}, {x: 6, y: 2}],
        [{x: 1, y: 3}, {x: 5, y: 0}, {x: 5, y: 2}, {x: 5, y: 4}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 2, y: 4}, {x: 6, y: 0}, {x: 7, y: 0}],
        [{x: 1, y: 3}, {x: 2, y: 3}, {x: 2, y: 5}, {x: 4, y: 2}, {x: 4, y: 4}],
        [{x: 0, y: 1}, {x: 3, y: 0}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 6, y: 0}],
        [{x: 1, y: 0}, {x: 2, y: 5}, {x: 4, y: 0}, {x: 4, y: 6}, {x: 5, y: 1}],
        [{x: 3, y: 0}, {x: 3, y: 3}, {x: 4, y: 0}, {x: 5, y: 2}, {x: 7, y: 0}],
        [{x: 1, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 0}, {x: 6, y: 1}, {x: 6, y: 5}],
        [{x: 1, y: 2}, {x: 2, y: 2}, {x: 6, y: 1}, {x: 6, y: 4}, {x: 6, y: 6}],
        [{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 5}, {x: 6, y: 0}, {x: 7, y: 2}],
        [{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 3, y: 2}, {x: 5, y: 4}],
        [{"x":1,"y":5,"color":7},{"x":5,"y":1,"color":6},{"x":5,"y":5,"color":3},{"x":6,y:"5","color":4},{"x":7,"y":5,"color":1}],
        [{"x":0,"y":4,"color":5},{"x":3,"y":1,"color":8},{"x":4,"y":0,"color":7},{"x":4,"y":5,"color":9},{"x":7,"y":3,"color":6},{"x":7,"y":6,"color":0}],
        [{"x":2,"y":3,"color":5},{"x":3,"y":2,"color":5},{"x":3,"y":6,"color":3},{"x":4,"y":4,"color":4},{"x":6,"y":1,"color":5},{"x":6,"y":3,"color":6}],
        [{"x":2,"y":3,"color":3},{"x":3,"y":0,"color":5},{"x":3,"y":5,"color":4},{"x":4,"y":2,"color":3},{"x":4,"y":3,"color":7},{"x":6,"y":4,"color":4}],
        [{"x":0,"y":3,"color":6},{"x":1,"y":1,"color":3},{"x":1,"y":3,"color":7},{"x":2,"y":0,"color":1},{"x":5,"y":1,"color":3},{"x":6,"y":3,"color":2}],
        [{"x":0,"y":3,"color":6},{"x":1,"y":5,"color":0},{"x":2,"y":2,"color":6},{"x":3,"y":6,"color":4},{"x":5,"y":2,"color":7},{"x":7,"y":2,"color":4}],
        [{"x":3,"y":2,"color":4},{"x":3,"y":4,"color":0},{"x":5,"y":6,"color":1},{"x":6,"y":2,"color":2},{"x":7,"y":2,"color":0},{"x":7,"y":6,"color":4}],
        [{"x":2,"y":0,"color":6},{"x":2,"y":5,"color":1},{"x":5,"y":1,"color":5},{"x":5,"y":6,"color":3},{"x":6,"y":4,"color":1},{"x":7,"y":5,"color":1}],
        [{"x":0,"y":4,"color":2},{"x":0,"y":6,"color":1},{"x":1,"y":3,"color":5},{"x":4,"y":0,"color":1},{"x":5,"y":1,"color":1},{"x":6,"y":3,"color":6},{"x":7,"y":6,"color":6}],
        [{"x":0,"y":1,"color":6},{"x":3,"y":6,"color":6},{"x":4,"y":0,"color":0},{"x":5,"y":4,"color":0},{"x":6,"y":1,"color":1},{"x":6,"y":6,"color":3}],
        [{"x":1,"y":0,"color":7},{"x":1,"y":3,"color":7},{"x":1,"y":6,"color":0},{"x":3,"y":2,"color":1},{"x":4,"y":5,"color":1},{"x":6,"y":6,"color":2}],
        [{"x":0,"y":3,"color":7},{"x":1,"y":5,"color":6},{"x":2,"y":2,"color":5},{"x":3,"y":6,"color":6},{"x":6,"y":2,"color":0},{"x":7,"y":3,"color":1}],
        [{"x":0,"y":5,"color":0},{"x":1,"y":1,"color":5},{"x":3,"y":2,"color":5},{"x":3,"y":5,"color":6},{"x":4,"y":3,"color":0},{"x":6,"y":4,"color":6},{"x":7,"y":2,"color":7}],
        [{"x":0,"y":3,"color":2},{"x":1,"y":1,"color":3},{"x":2,"y":6,"color":0},{"x":3,"y":1,"color":4},{"x":3,"y":6,"color":6},{"x":5,"y":1,"color":4},{"x":6,"y":5,"color":7}],
        [{"x":0,"y":0,"color":2},{"x":0,"y":5,"color":5},{"x":1,"y":4,"color":2},{"x":2,"y":1,"color":6},{"x":2,"y":6,"color":5},{"x":5,"y":5,"color":5},{"x":7,"y":3,"color":0}],
        [{"x":0,"y":4,"color":0},{"x":1,"y":0,"color":5},{"x":2,"y":5,"color":0},{"x":4,"y":1,"color":3},{"x":4,"y":2,"color":6},{"x":5,"y":6,"color":6},{"x":7,"y":1,"color":2},{"x":7,"y":6,"color":0}],
        [{"x":1,"y":1,"color":7},{"x":1,"y":5,"color":7},{"x":3,"y":4,"color":4},{"x":4,"y":0,"color":7},{"x":4,"y":1,"color":4},{"x":6,"y":5,"color":7},{"x":7,"y":2,"color":7}],
        [{"x":0,"y":2,"color":6},{"x":1,"y":4,"color":2},{"x":1,"y":5,"color":3},{"x":1,"y":6,"color":6},{"x":4,"y":3,"color":5},{"x":5,"y":0,"color":2},{"x":7,"y":2,"color":3},{"x":7,"y":3,"color":2}],
        [{"x":0,"y":4,"color":1},{"x":2,"y":3,"color":5},{"x":3,"y":1,"color":6},{"x":3,"y":4,"color":4},{"x":4,"y":0,"color":2},{"x":5,"y":5,"color":2},{"x":6,"y":3,"color":3}],
        [{"x":1,"y":0,"color":2},{"x":1,"y":1,"color":5},{"x":1,"y":4,"color":0},{"x":1,"y":6,"color":8},{"x":2,"y":1,"color":4},{"x":4,"y":0,"color":3},{"x":6,"y":5,"color":3}],
        [{"x":0,"y":0,"color":4},{"x":3,"y":2,"color":1},{"x":5,"y":0,"color":4},{"x":5,"y":3,"color":7},{"x":6,"y":0,"color":7},{"x":7,"y":0,"color":9},{"x":7,"y":5,"color":5}],
        [{"x":0,"y":0,"color":7},{"x":1,"y":0,"color":6},{"x":2,"y":5,"color":4},{"x":2,"y":6,"color":0},{"x":4,"y":0,"color":1},{"x":4,"y":3,"color":7},{"x":5,"y":4,"color":6},{"x":5,"y":5,"color":7}],
        [{"x":2,"y":1,"color":3},{"x":2,"y":3,"color":6},{"x":3,"y":5,"color":2},{"x":3,"y":6,"color":1},{"x":4,"y":1,"color":3},{"x":5,"y":1,"color":5},{"x":5,"y":5,"color":1}],
        [{"x":0,"y":5,"color":7},{"x":2,"y":4,"color":5},{"x":3,"y":4,"color":3},{"x":4,"y":3,"color":7},{"x":6,"y":5,"color":6},{"x":7,"y":2,"color":3},{"x":7,"y":5,"color":1},{"x":7,"y":6,"color":4}],
        [{"x":0,"y":2,"color":2},{"x":2,"y":0,"color":8},{"x":2,"y":1,"color":0},{"x":2,"y":6,"color":7},{"x":3,"y":6,"color":9},{"x":4,"y":1,"color":4},{"x":4,"y":5,"color":1},{"x":5,"y":5,"color":3}],
        [{"x":3,"y":0,"color":4},{"x":3,"y":4,"color":0},{"x":3,"y":5,"color":9},{"x":5,"y":1,"color":6},{"x":5,"y":3,"color":9},{"x":6,"y":4,"color":0},{"x":6,"y":5,"color":4}],
        [{"x":0,"y":4,"color":7},{"x":1,"y":2,"color":7},{"x":1,"y":5,"color":3},{"x":2,"y":2,"color":1},{"x":3,"y":4,"color":5},{"x":3,"y":6,"color":9},{"x":7,"y":4,"color":0}],
        [{"x":0,"y":2,"color":4},{"x":1,"y":6,"color":4},{"x":2,"y":2,"color":3},{"x":2,"y":6,"color":4},{"x":3,"y":0,"color":4},{"x":4,"y":5,"color":9},{"x":5,"y":4,"color":6},{"x":7,"y":2,"color":8}],
        [{"x":0,"y":6,"color":5},{"x":2,"y":2,"color":7},{"x":2,"y":3,"color":9},{"x":3,"y":0,"color":5},{"x":3,"y":6,"color":5},{"x":4,"y":0,"color":7},{"x":4,"y":1,"color":6},{"x":4,"y":2,"color":5},{"x":6,"y":5,"color":9},{"x":7,"y":5,"color":7}],
        [{"x":0,"y":1,"color":7},{"x":1,"y":0,"color":2},{"x":2,"y":0,"color":7},{"x":2,"y":3,"color":7},{"x":3,"y":0,"color":0},{"x":3,"y":3,"color":7},{"x":4,"y":1,"color":5}],
        [{"x":0,"y":6,"color":4},{"x":1,"y":4,"color":4},{"x":2,"y":0,"color":2},{"x":3,"y":6,"color":6},{"x":4,"y":1,"color":0},{"x":5,"y":1,"color":5},{"x":6,"y":2,"color":8},{"x":6,"y":6,"color":6},{"x":7,"y":3,"color":1}],
        [{"x":0,"y":6,"color":7},{"x":1,"y":0,"color":5},{"x":1,"y":5,"color":3},{"x":3,"y":0,"color":7},{"x":4,"y":1,"color":6},{"x":5,"y":5,"color":4},{"x":7,"y":6,"color":9}],
        [{"x":1,"y":6,"color":2},{"x":2,"y":2,"color":5},{"x":3,"y":0,"color":5},{"x":4,"y":2,"color":7},{"x":5,"y":4,"color":7},{"x":7,"y":2,"color":2},{"x":7,"y":6,"color":2}],
        [{"x":1,"y":2,"color":3},{"x":1,"y":6,"color":0},{"x":2,"y":6,"color":8},{"x":4,"y":1,"color":6},{"x":4,"y":2,"color":8},{"x":6,"y":0,"color":5},{"x":6,"y":6,"color":5},{"x":7,"y":4,"color":5}],
        [{"x":0,"y":2,"color":6},{"x":0,"y":5,"color":9},{"x":0,"y":6,"color":0},{"x":5,"y":1,"color":4},{"x":6,"y":0,"color":7},{"x":6,"y":3,"color":5},{"x":6,"y":4,"color":2},{"x":7,"y":2,"color":6}],
        [{"x":0,"y":0,"color":2},{"x":2,"y":4,"color":1},{"x":3,"y":0,"color":3},{"x":3,"y":1,"color":6},{"x":4,"y":3,"color":4},{"x":5,"y":3,"color":6},{"x":6,"y":2,"color":3},{"x":6,"y":4,"color":5},{"x":7,"y":2,"color":6}],
        [{"x":0,"y":1,"color":6},{"x":0,"y":4,"color":8},{"x":3,"y":3,"color":4},{"x":4,"y":3,"color":9},{"x":6,"y":6,"color":1},{"x":7,"y":1,"color":2},{"x":7,"y":2,"color":3},{"x":7,"y":3,"color":8}],
        [{"x":0,"y":5,"color":5},{"x":1,"y":3,"color":3},{"x":3,"y":2,"color":1},{"x":3,"y":6,"color":7},{"x":4,"y":6,"color":6},{"x":5,"y":1,"color":7},{"x":6,"y":0,"color":0},{"x":6,"y":6,"color":5}],
        [{"x":2,"y":1,"color":5},{"x":3,"y":5,"color":5},{"x":5,"y":3,"color":5},{"x":5,"y":6,"color":8},{"x":6,"y":1,"color":5},{"x":6,"y":3,"color":6},{"x":6,"y":4,"color":7},{"x":6,"y":5,"color":4}],
        [{"x":0,"y":5,"color":0},{"x":1,"y":5,"color":4},{"x":2,"y":0,"color":5},{"x":3,"y":3,"color":7},{"x":5,"y":5,"color":5},{"x":6,"y":5,"color":6},{"x":7,"y":0,"color":9}],
        [{"x":0,"y":2,"color":4},{"x":1,"y":3,"color":9},{"x":1,"y":4,"color":2},{"x":1,"y":5,"color":5},{"x":1,"y":6,"color":9},{"x":2,"y":1,"color":4},{"x":2,"y":5,"color":1},{"x":3,"y":2,"color":3},{"x":4,"y":6,"color":2}],
        [{"x":2,"y":3,"color":6},{"x":3,"y":0,"color":6},{"x":4,"y":1,"color":8},{"x":4,"y":3,"color":5},{"x":5,"y":3,"color":2},{"x":6,"y":3,"color":4},{"x":7,"y":1,"color":6},{"x":7,"y":3,"color":2}],
        [{"x":0,"y":4,"color":8},{"x":1,"y":0,"color":6},{"x":1,"y":1,"color":9},{"x":1,"y":2,"color":0},{"x":1,"y":5,"color":1},{"x":5,"y":0,"color":4},{"x":6,"y":1,"color":7},{"x":7,"y":5,"color":0}],
        [{"x":1,"y":1,"color":9},{"x":1,"y":6,"color":6},{"x":2,"y":0,"color":0},{"x":3,"y":2,"color":3},{"x":3,"y":6,"color":3},{"x":4,"y":2,"color":3},{"x":5,"y":4,"color":7},{"x":6,"y":3,"color":0},{"x":7,"y":6,"color":9}],
        [{"x":0,"y":0,"color":2},{"x":0,"y":3,"color":7},{"x":0,"y":6,"color":6},{"x":1,"y":5,"color":1},{"x":2,"y":3,"color":4},{"x":3,"y":4,"color":5},{"x":3,"y":6,"color":7},{"x":6,"y":2,"color":3}],
        [{"x":0,"y":0,"color":8},{"x":0,"y":1,"color":5},{"x":0,"y":5,"color":3},{"x":4,"y":5,"color":1},{"x":5,"y":5,"color":5},{"x":5,"y":6,"color":6},{"x":6,"y":1,"color":9},{"x":6,"y":3,"color":1}],
        [{"x":1,"y":1,"color":2},{"x":1,"y":3,"color":5},{"x":2,"y":2,"color":9},{"x":3,"y":1,"color":0},{"x":4,"y":6,"color":0},{"x":5,"y":1,"color":8},{"x":6,"y":0,"color":8},{"x":7,"y":2,"color":2}],
        [{"x":0,"y":1,"color":1},{"x":1,"y":4,"color":6},{"x":1,"y":5,"color":8},{"x":2,"y":4,"color":3},{"x":3,"y":0,"color":4},{"x":3,"y":5,"color":4},{"x":4,"y":0,"color":6},{"x":7,"y":5,"color":8}]
    ];

    puzzle = (function(){
        var flingPuzzle = parseFloat(localStorage.getItem("fling_puzzle"));
        if(!flingPuzzle){
            flingPuzzle = 0;
            localStorage.setItem("fling_puzzle",flingPuzzle);
        }
        return flingPuzzle;
    })();
    score = (function(){
        var flingScore = parseFloat(localStorage.getItem("fling_score"));
        if(!flingScore){
            flingScore = 0;
            localStorage.setItem("fling_score",flingScore);
        }
        return flingScore;
    })();
    highScoreArray = getHighScoreArray();
    updateHighScore();
}
