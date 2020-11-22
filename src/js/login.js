const socket = new WebSocket("ws://localhost:8085");

const userList = document.querySelector('[data-role=user-list]');
const messageList = document.querySelector('[data-role=messages-list]');

const messageInput = document.querySelector('[data-role=message-input]');

function show(element) {
    element.classList.remove('hidden');
}

function hide(element) {
    element.classList.add('hidden')
}

function setName(element, name) {
    element.textContent = name
}

// входим в чат 

function sendMessage(type, data) {
    socket.send(
        JSON.stringify({
            type,
            data,
        })
    );
}

function sendHello(name) {
    sendMessage('hello', { name });
}

function sendTextMessage(message) {
    sendMessage('text-message', { message })
}


// добавление 

function addUser(name) {
    const element = document.createElement('div');
    element.classList.add('user-list-item');
    element.textContent = name;
    userList.append(element)
}

function addSystemMessage(message) {
    const item = document.createElement('div');

    item.classList.add('message-item', 'message-item-system');
    item.textContent = message;

    messageList.append(item)
}

module.exports = {
    show,
    hide,
    setName,
    sendHello,
    sendTextMessage,
    addUser,
    addSystemMessage
}