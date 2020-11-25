const http = require('http');
const Index = require('ws');

const server = http.createServer(async (req, res) => {
    res.end('ok');
});
const wss = new Index.Server({ server });
const connections = new Map();

wss.on('connection', (socket) => {
    connections.set(socket, {});

    socket.on('message', (messageData) => {
        const message = JSON.parse(messageData);
        let excludeItself = false;

        if (message.type === 'hello') {
            excludeItself = true;
            connections.get(socket).userName = message.data.name;
            const userListMessage = {
                type: 'user-list',
                data: [...connections.values()].map((item) => item.userName).filter(Boolean),
            }

            sendMessageFrom(connections, userListMessage, socket, excludeItself);
        }


        sendMessageFrom(connections, message, socket, excludeItself);
    });

    socket.on('close', () => {
        sendMessageFrom(connections, { type: 'bye-bye' }, socket);
        connections.delete(socket);
    });
});


function sendMessageFrom(connections, message, from, excludeSelf) {
    const socketData = connections.get(from);

    if (!socketData) {
        return;
    }

    message.from = socketData.userName;

    for (const connection of connections.keys()) {
        if (connection === from && excludeSelf) {
            continue;
        }

        connection.send(JSON.stringify(message));
    }
}

server.listen(8085);

