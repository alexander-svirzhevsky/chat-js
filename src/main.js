const socket = new WebSocket("ws://localhost:8085");
const login = require('./js/login');
const messages = require('./js/messagesList');
const userList = require('./js/userList');
const userArray = require('./js/userList');

// elements login
const loginWindow = document.querySelector('#login');
const mainWindow = document.querySelector('#main');

const loginNameInput = document.querySelector('[data-role=login-name-input]');
const submitButton = document.querySelector('[data-role=login-submit]');
const loginError = document.querySelector('[data-role=login-error]');

// element mainWindow 
const userName = document.querySelector('[data-role=user-name]');


submitButton.addEventListener('click', () => {
  loginError.textContent = '';

  const name = loginNameInput.value;

  if (!name) {
    loginError.textContent = 'Введите ваш ник!'
  } else {
    login.sendHello(name)

    login.hide(loginWindow);
    login.show(mainWindow)
    login.setName(userName, name);
  }
})

socket.addEventListener('message', function (e) {
  const response = JSON.parse(e.data);
  userList.buildDOM()
  console.log(response);

  if (response.type === "hello") {
    const name = response.data.name;
    userArray.add(name)
    messages.addSystemMessage(`${name} вошел в чат`)
  } else if (response.type === 'user-list') {

    for (const item of response.data) {
      userArray.add(item)
    }

  } else if (response.type === 'bye-bye' && response.from) {
    userArray.remove(response.from)
    messages.addSystemMessage(`${response.from} вышел из чата`);

  } else if (response.type === 'text-message') {
    const message = response.data.message;
    messages.add(response.from, message);
  }
});


const messageInput = document.querySelector('[data-role=message-input]');
const messageSendButton = document.querySelector('[data-role=message-send-button]');

messageSendButton.addEventListener('click', () => {
  const message = messageInput.value;
  login.sendTextMessage(message);
  messageInput.value = ''
})

