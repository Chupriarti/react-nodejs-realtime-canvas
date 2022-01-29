const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    try {
         
    } catch (e){
        console.error("post inage error: ", e);
        return res.status(500).json("post inage error");
    }
});

app.get('/image', (req, res) => {
    try {
         
    } catch (e){
        console.error("get inage error: ", e);
        return res.status(500).json("get inage error");
    }
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
