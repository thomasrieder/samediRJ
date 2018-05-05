var ip = location.host;
var socket = io.connect(ip);

socket.on('welcome', function(step){

    $('.admin-content').css('opacity', '1')
    $('.wait').remove();
    setColorButton(step);
});

socket.on('nbUserChange',function(data){
    

    $('.info').html(data.nbVid+'/'+data.nbUser);
})


$(document).ready(function(){
    
    $('.wait').css({
        top: ($(document).height()/2) - ($('.wait').height() / 2)
    });

    socket.emit('newAdmin');
});

$('.step-button').click(function(){
    
    setStep($(this).attr('step'));
    
    if($(this).attr('step') == 1){
        
        //updateTime();
    }

    setColorButton($(this).attr('step'));
});

function updateTime(){
    
    setTimeout(function(){
        
        updateTime();
    }, 500);
}

function setStep(newStep){

    socket.emit('setStep', {step: newStep});
}

function setColorButton(step){

    $('.step-button').css('background-color', 'lightGrey');
    $('button[step="'+step+'"]').css('background-color', 'green');
}
