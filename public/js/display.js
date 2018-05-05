var ip = location.host;
var socket = io.connect(ip);

$(document).ready(function(){
    
    socket.emit('setDisplay');
});

//update the interface to the current step
socket.on('welcome', function(currentStep){
    
});

$('.play-button').click(function(){

    socket.emit('launchVideo');
    launchVideo();
});

$('.page-video').click(function(){
    
    console.log($('#song').get(0).currentTime);
});

function launchVideo(){

    $('.play-button').css({
        'display': 'none'
    });
    
    $('#vid').css({
        'display': 'none'
    });

    $('#vid').get(0).play();
    $('#song').get(0).play();
    loopVideo();
}


var vTime = 0;

function loopVideo(){

    vTime = $('#song').get(0).currentTime;

    socket.emit('updateVideo', vTime);

    setTimeout(function(){
        loopVideo();
    }, 100);
}


