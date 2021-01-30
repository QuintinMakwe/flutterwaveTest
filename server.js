const express = require('express');

async function startServer() {
    const port = 5000
    const app = express();

    await require('./loader/express')(app)
    
    app.listen(port, () => {
        console.log("Server up on port ", port)
    })

}

startServer();