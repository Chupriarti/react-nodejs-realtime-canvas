const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors());

app.ws('/', (ws, req) => {
    console.log("Connection is complete");
    ws.send("You have connected");
    ws.on("message", (msg) => {
        msg = JSON.parse(msg);
        switch(msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
            case "draw":
                broadcastConnection(ws, msg);
                break;
        }
    })
});

app.post('/image', (req, res) => {

});

app.get('/image', (req, res) => {

});

app.listen(PORT, () => {console.log(`server started on PORT ${PORT}`)});

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    })
}
