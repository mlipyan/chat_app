const canvas  = document.getElementById("stars");
const context = canvas.getContext("2d");
const canvas_size=600;
var socket = io();
var msg = '';
var loc = 0;

context.fillStyle = "black";
context.fillRect(0, 0, canvas_size, canvas_size);

function draw(msg, loc, color){
    context.font = "20px Arial";
    context.fillStyle = color;    
    context.fillText(msg, 50, 50 + loc);
}

function update_loc(){
    if (loc < canvas_size - 80) {loc +=30}
    else {loc = 10;
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas_size, canvas_size);}
}

const name = prompt('name: ');
const lan = prompt('language: ');

draw('Hi, ' + name + '. Press \'m\' to type.', loc, 'white');
socket.emit('init', name);

function keyRespond(evt){
    if (evt.keyCode === 77){
        msg = prompt('type something: ');
        socket.emit('message', {'msg': msg, 'name': name, 'lan': lan});
}
    
}
window.addEventListener('keydown', keyRespond);

socket.on('message', function(data) {
    let msg = data['name'] + ': ' + data['msg'];
    update_loc();
    if (data['name'] != name) {draw(msg, loc, 'green')}
    else {draw(msg, loc, 'pink')};

});

