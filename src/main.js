const socket = new WebSocket("ws://localhost:8085");
const login = require('./js/login');
const messages = require('./js/messageList');
// const send = require('./js/messageSender');

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
  const name = response.data.name;
  const message = response.data.message;

  console.log(response);

  if (response.type === "hello") {
    login.addUser(name)
    login.addSystemMessage(`${name} вошел в чат`)
  } else if (response.type === 'user-list') {

    for (const item of response) {
      login.addUser(item)
      console.log(item);
    }
  }
  // else if (type === 'bye-bye') {
  //   login.addSystemMessage(`${response.data.name} вышел из чата`);
  // } else
  if (response.type === 'text-message') {
    messages.add(name, message);
  }
});


const messageInput = document.querySelector('[data-role=message-input]');
const messageSendButton = document.querySelector('[data-role=message-send-button]');

messageSendButton.addEventListener('click', () => {
  const message = messageInput.value;
  login.sendTextMessage(message);
  messageInput.value = ''
})
