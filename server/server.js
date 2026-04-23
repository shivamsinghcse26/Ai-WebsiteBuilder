import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",(req, res) => {
    res.send("Hello World");
}
);

const PORT = process.env.PORT || 3000;

const startServer=async()=>{
    try {
        await connectDB(); // Connect to MongoDB before starting the server

        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
