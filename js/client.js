const socket = io('http://localhost:8000');

const form = document.getElementById("form");
const btn = document.getElementById("send-box");
const messageInput = document.getElementById("text_box");
const messageContainer = document.querySelector(".container");


const append = (message, position) => {
    const mymessage = document.createElement('div');
    mymessage.innerText = message;
    mymessage.classList.add('message');
    mymessage.classList.add(position);
    messageContainer.append(mymessage);
}
form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent to reload the page
    const text = messageInput.value;
    append(`you: ${text}`, 'right');
    socket.emit('send', text);
    messageInput.value = '';
})


const name = prompt("Enter your name to join ");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} is joined the chat`, 'right');
})

socket.on('new-message', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', data => {
    append(`${data} is left the chat`, 'left');
})