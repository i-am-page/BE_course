require("dotenv").config()
const app = require("./src/app");

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.DEV_DB_HOST}:${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        // notify.send(ping..)
    })
})

