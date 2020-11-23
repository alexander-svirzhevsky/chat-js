const socket = new WebSocket("ws://localhost:8085");

function show(element) {
    element.classList.remove('hidden');
}

function hide(element) {
    element.classList.add('hidden')
}

function setName(element, name) {
    element.textContent = name
}

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


module.exports = {
    show,
    hide,
    setName,
    sendHello,
    sendTextMessage,
}



// добавление 

// function addUser(name) {

//     const element = document.createElement('div');
//     element.classList.add('user-list-item');

//     element.dataset.name = name;
//     element.textContent = name;
//     userList.append(element)
// }

// function removeUser(name) {
//     userList.remove(name)
// }