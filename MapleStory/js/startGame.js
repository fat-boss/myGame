/**
 * Created by Administrator on 2016/9/9 0009.
 */
window.onload = function() {

    $('.img2').hover(function(){
        $(this).attr('src','image/startOver.gif');
    },function(){
        $(this).attr('src','image/start.gif');
    }).bind('click',function(){
        $('.start').eq(0).css('display','none');
        $(this).attr('src','image/startClick.gif');
        $(startGame());
    });

    $('.confirm').hover(function(){
        $(this).attr('src','image/tipYC.gif');
    },function(){
        $(this).attr('src','image/tipYO.gif');
    }).bind('click',function(){
        $(this).attr('src','image/tipYO.gif');
        $('.start').eq(0).css('display','block');
        $('.scoreCounted').eq(0).css('display','none');
    })
};