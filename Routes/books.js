import express from 'express';
import Book from '../Books/book.js';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
const router = express.Router();

router.get('/books', async(req, res) => {
    const result = await Book.find();
    res.send(result);
});

router.post('/books', authenticateToken, async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author_firstName = req.body.author.firstName;
    const author_lastName = req.body.author.lastName;

    const book = new Book({
        title: title,
        description: description,
        author: {
            firstName: author_firstName,
            lastName: author_lastName
        }
    });
    try {
        var result = await book.save();
        res.send(result);
    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

router.post('/books/edit/', authenticateToken, async(req, res) => {
    try {
        const { id, title, description, author } = req.body;
        const booksResult = await Book.findById(id);
        await Book.findByIdAndUpdate(id, {
            title: title ? title : booksResult['title'],
            description: description ? description : booksResult['description'],
            author: {
                firstName: author && author['firstName'] ? author['firstName'] : booksResult['author']['firstName'],
                lastName: author && author['lastName'] ? author['lastName'] : booksResult['author']['lastName'],
            }
        });
        res.send(await Book.findById(id));
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

router.post('/books/delete', authenticateToken, async(req, res) => {
    try {
        const { id } = req.body;
        const result = await Book.findByIdAndDelete(id);
        res.send({
            "status": "Deleted Successfully"
        });
    } catch (e) {
        res.send({
            "status": "Failed"
        });
    }

});

function authenticateToken(req, res, next) {
    const requestHeader = req.headers.authorization;
    const token = requestHeader && requestHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export default router;