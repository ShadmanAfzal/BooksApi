import mongoose from 'mongoose';

const bookScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
            default: ""
        }
    }
});

const bookModel = mongoose.model("BooksDB", bookScheme);

export default bookModel;