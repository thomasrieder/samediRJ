var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');
var path = require('path');


server.listen(80);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/user.html'));

})
.get('/adminbadass', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/admin.html'));

})
.get('/display', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/display.html'));

})
.use(function(req, res, next){
    
});


/**
 * STEP:
 * 0 -> welcome
 * 1 -> LIVE
 */

var idDisplay;
var idAdmin =[];
var step = 0;
var winner = [];
var users = [];
var nbVideoLoaded = 0;
var txtIsHide = 0;
var loadVideo = 0;

io.on('connection', function(socket){

    socket.on('newUser', function(){
        
        console.log('new user');
        
        users.push(socket);
        
        socket.emit('welcome', {step: step, loadVideo: loadVideo});
    
        for(var i = 0; i < idAdmin.length; i++){
            
            socket.to(idAdmin[i]).emit('nbUserChange', {nbUser: users.length, nbVid: nbVideoLoaded});
        }

    });

    socket.on('disconnect', function () {
        
        var i = users.indexOf(socket);

        console.log(users.indexOf(socket));
    

        if(users.indexOf(socket) != -1){

            users.splice(i, 1);
        }
    
        for(var i = 0; i < idAdmin.length; i++){
            
            socket.to(idAdmin[i]).emit('nbUserChange', {nbUser: users.length, nbVid: nbVideoLoaded});
        }
    });


    socket.on('newAdmin', function(){
        
        socket.emit('nbUserChange', {nbUser: users.length});

        idAdmin.push(socket.id);
        socket.emit('welcome', step);
    });

    //get the id of the display client 
    socket.on('setDisplay', function(){
        
        idDisplay = socket.id; 
        socket.emit('welcome', step);  
    });

    socket.on('setStep', function(data){
        
        step = data.step;

        if(step == 1){

            loadVideo = 1;
        }

        console.log('step: '+step);
        
        socket.emit('stepSetted', {step: step});
        socket.broadcast.emit('setUserStep', {step: step});
    });

    socket.on('launchVideo', function(){

        socket.broadcast.emit('launchVideo');
    });

    socket.on('updateVideo', function(vTime){

        socket.broadcast.emit('updateVideo', vTime);
    });
});