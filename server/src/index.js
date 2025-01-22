import app from './app.js';
import connectDB from './db/dbconfig.js';

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

const PORT = process.env.PORT || 5000; 

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Error establishing the database connection: ${error}`);
    });
