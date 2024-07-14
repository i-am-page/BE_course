require("dotenv").config()
const app = require("./src/app");

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.DEV_DB_HOST}:${PORT}`);
})

process.on('SIGINT', () => {
    server.close((err) => {
        if (err) {
            console.error('Error during server shutdown', err);
            process.exit(1); // Exit with error code
        }
        console.log('Server closed');
        // If server hasn't closed within 5 seconds, force shutdown
        setTimeout(() => {
            console.warn('Forcing server shutdown');
            process.exit();
        }, 5000);
    });
});

