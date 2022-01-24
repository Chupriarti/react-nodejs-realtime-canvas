const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
    console.log("Connection is complete");
    ws.send("You have connected");
    ws.on("message", (msg) => {
        switch(msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
        }
    })
});

app.listen(PORT, () => {console.log(`server started on PORT ${PORT}`)});

const connectionHandler = (ws, msg) => {
    msg = JSON.parse(msg);
    ws.id = msg.id;
}
