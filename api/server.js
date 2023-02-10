// Handle API
const express = require('express');
// Handle database
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
// Cross over protection
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

// FETCH REQUESTS
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

// CREATE REQUESTS
app.post('/todos/new', async (req,res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

// DELETE REQUESTS
app.delete('/todos/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})


app.put('/todos/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})



app.listen(3001, () => console.log("Server started on port 3001"));