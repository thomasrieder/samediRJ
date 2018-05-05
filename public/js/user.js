var ip = location.host;
var socket = io.connect(ip);

//update the interface to the current step
socket.on('welcome', function(data){

    currentStep = data.step;


});

$(document).ready(function(){

    if(browserIsOk()){

        socket.emit('newUser');
    }else{

        socket.disconnect();
        changeBrowser();
    }

    //disable scroll refresh
    $('.page').on('touchmove', function(e){

        e.preventDefault();
    }
  );

  setInterface();

});

function setInterface(){

    setSquare();
}

function setSquare(){

    var sWidth = $('.live').width() / 3;
    var sHeight = $('.live').height() / 5;

    $('.square').css({
        'position': 'absolute',
        'width': sWidth,
        'height': sHeight,
        'background-color': 'black'
    });

    var left = 0;
    var top = 0;
    var nSquare = 0;

    $('.square').each(function(i){

        if(i % 3 == 0 && i != 0){

            left = 0;
            top += sHeight;
        }

        $(this).css({
            'left': left,
            'top': top
        });

        left += sWidth;
    });
}

var started = 0;

socket.on('launchVideo', function(){

    changePage();

    startLive();
});

function changePage(){

    $('.page-welcome').css('display', 'none');
    $('.page-live').css('display', 'block');
}

socket.on('updateVideo', function(vTime){

    if(started == 0){

        startLive();
    }
    timeManger(vTime);
});

var color = "yellow";
var speed = 500;
var randColor = ['#fdcb6e', '#ff7675', '#00b894', '#0984e3'];
var actionTime = [20.93, 36.53, 60, 65, 112.95, 114.25, 115.55, 116.86, 118.16, 119.47, 120.77, 122.07, 249];
var canPlay = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var step = 0;

/**
 * FLASH -> do a flash
 *  20.93
 *  36.53
 *  60
 * toggleRandomBlink -> start/stop color blink
 * setGame -> users have to change color
 * timeAnim square
 * 0.6521739130434783
 */

function startLive(){

    started = 1;
    changePage();
}

var actioned = 0;

function timeManger(aTime){

    if(aTime >= actionTime[0] && canPlay[0]){

        flash(5000);
        setSquare();
        canPlay[0] = 0;
    }
    if(aTime >= actionTime[1] && canPlay[1]){

        flash(5000);
        canPlay[1] = 0;
    }
    if(aTime >= actionTime[2] && canPlay[2]){

        flash(500);
        canPlay[2] = 0;
    }
    if(aTime >= actionTime[3] && canPlay[3]){

        $('.live').stop();
        isCrossBlink = 0;
        isCrossBlink = 0;
        
        $('.cross').animate({
            'opacity': '0'
        }, 200, function(){
            $('.cross').css('display', 'none')
        });
        
        $('.live').css('display', 'none')
        $('.square').css('display', 'block')
        isSquareAnim = 1;
        squareAnim('white');
        canPlay[3] = 0;
    }
    if(aTime >= actionTime[4] && canPlay[4]){

        $('.live').css('display', 'block')
        $('.square').css('display', 'none')
        isSquareAnim = 0;
        setGame();
        gameExample(randColor[0])
        canPlay[4] = 0;
    }
    if(aTime >= actionTime[5] && canPlay[5]){

        gameExample(randColor[1])
        canPlay[5] = 0;
    }
    if(aTime >= actionTime[6] && canPlay[6]){

        gameExample(randColor[2])
        canPlay[6] = 0;
    }
    if(aTime >= actionTime[7] && canPlay[7]){

        gameExample(randColor[3])
        canPlay[7] = 0;
    }
    if(aTime >= actionTime[8] && canPlay[8]){

        gameExample(randColor[0])
        canPlay[8] = 0;
    }
    if(aTime >= actionTime[9] && canPlay[9]){

        gameExample(randColor[1])
        canPlay[9] = 0;
    }
    if(aTime >= actionTime[10] && canPlay[10]){

        gameExample(randColor[2])
        canPlay[10] = 0;
    }
    if(aTime >= actionTime[11] && canPlay[11]){

        gameExample(randColor[3])
        
        $('.live').click(function(){
            changeColor();
        });
        canPlay[11] = 0;
    }
    if(aTime >= actionTime[12] && canPlay[12]){
        
        $('.live').off();
        toggleRandomBlink();
        setDance();
        canPlay[12] = 0;
    }
}

function setDance(){

    $('.live').css({
        'background-image': 'url(../img/dance.gif)'
    });
}

function flash(timeStay){

    console.log('FLASH');

    $('.live').stop()

    $('.live').css({
        'opacity': '0',
        'background-color': 'white'
    });

    $('.live').animate({
        'opacity': '1'
    }, 100, function(){

    });

    setTimeout(function(){

        $('.live').animate({
            'opacity': '0'
        }, 5000, function(){

            if(canPlay[0] == 0 && canPlay[1] == 1){

                $('.cross').css('display', 'block');
                isCrossBlink = 1;
                animCross();
            }
            if(canPlay[1] == 0 && canPlay[2] == 1){

                $('.cross').css('display', 'block');
                isCrossBlink = 1;
                animCross();
            }
        });

    }, timeStay);
}

var opCross = 0;
var isCrossBlink = 0;
function animCross(){

    opCross = Math.random() * 0.5;

    $('.cross').css('opacity', opCross);

    setTimeout(function(){

        if(isCrossBlink){

            animCross();
        }
    }, 100);
}

var isRandomBlink = 0;
var isColored = 0;
var rArrayColor = 0;

function toggleRandomBlink(){

    $('.live').stop();

    $('.live').css({
        'opacity': '1',
        'transition': 'background-color 400ms'
    });

    if(isRandomBlink == 0){

        isRandomBlink = 1;
        rArrayColor = Math.floor((Math.random() * randColor.length));
        randomBlink();
    }else{
        isRandomBlink = 0;
    }
}


function randomBlink(){

    if(isColored){
        $('.live').css('background-color', 'black');
        isColored = 0;
    }else{
        $('.live').css('background-color', randColor[rArrayColor]);
        isColored = 1;
    }

    setTimeout(function(){

        if(isRandomBlink){

            randomBlink();
        }
    },100);

}

function setGame(){

    $('.live').stop()   

    $('.live').css({
        'opacity': '1'
    });  
}

function gameExample(exColor){

    $('.live').stop();

    $('.live').css({
        'background-color': exColor
    });
}

var curColor = 0;
function changeColor(){

    $('.live').css('background-color', randColor[curColor]);

    if(curColor < randColor.length-1){

        curColor++;
    }else{

        curColor = 0;
    }
}


function colorScreen(sColor){

    $('.live').off();
    $('.live').css('background-color', sColor)
}

var x = 0;
var y = 0;
var noS = 0;
var isSquareAnim = 0;
var squareIsBlack = 0;
function squareAnim(squareColor){

    x = 0;
    y = 0;
    noS = 0;

    doSquareAnim(squareColor);
}

function doSquareAnim(squareColor){

    console.log(squareColor);

    if(x % 3 == 0 && x != 0){
        y++;
        x = 0;
    }

    $('#'+y+'-'+x).css('background-color', squareColor);

    x++;

    noS++;

    setTimeout(function(){

        if(noS < 15){

            if(isSquareAnim){

                doSquareAnim(squareColor);
            }
        }else{
            if(isSquareAnim){

                if(squareColor == "black"){
                    
                    squareAnim("white");
                }else{
                    
                    squareAnim('black');
                }
            }
            
        }
    }, 43.47);
}


$('.fs-button').click(function(){
    
    toggleFullScreen(document.body);
    
    $(this).css({
        'background-color': 'yellow'
    });
    
    $(this).animate({
        'opacity': '0'
    }, 600, function(){
        
        $(this).remove();
    });
});



function changeBrowser(){

    $('body').html('<h1>:(</h1><br><h2>L\'expérience ne va pas marcher sur ce navigateur...</h2><br><h3>Avez-vous Google Chrome ?</h3><br><h3><a class="link-chrome" href="googlechrome://navigate?url='+ip+'">ouvrir dans Google Chrome</a></h3>');
}

function toggleFullScreen(elem) {

    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
 * GET BROWSER
 */
function browserIsOk(){

    if(navigator.userAgent.indexOf('Samsung') == -1){

        return true;
    }else{

        return false;
    }
}