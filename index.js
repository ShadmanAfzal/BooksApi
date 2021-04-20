import express from 'express'
import booksRoute from './Routes/books.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/BooksApi", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected");
});

app.use('/api', booksRoute);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (username != process.env.USER_NAME || password != process.env.PASSWORD)
        res.send({
            "status": "Invalid Credentails"
        });
    else {
        const user = {
            username: username,
            password: password
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m"
        });
        res.send({
            "accessToken": accessToken
        });
    }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));