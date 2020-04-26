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

const name = prompt('name: ');
draw('Hi, ' + name + '. Press \'m\' to type.', loc, 'white');
socket.emit('init', name);

function keyRespond(evt){
    if (evt.keyCode === 77){
        msg = prompt('type something: ');
        socket.emit('message', {'msg': msg, 'name': name});
}
    
}
window.addEventListener('keydown', keyRespond);
loc += 30;

socket.on('message', function(data) {
    let msg = data['name'] + ': ' + data['msg'];
    if (data['name'] != name) {draw(msg, loc, 'green'); loc += 30;};
    if (data['name'] === name) {draw(msg, loc, 'pink'); loc += 30;};

});

