// Handle API
const express = require('express');
// Handle database
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

// Cross over protection
app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb+srv://willlim7:sapsucks@tododatabase.eegc0zv.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

// FETCH REQUESTS
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.log(error)
    }
})

// CREATE REQUESTS
app.post('/todos/new', async (req,res) => {
    const todo = new Todo({
        text: req.body.text,
        description: req.body.description
    });

    todo.save();

    res.json(todo);
})

// DELETE REQUESTS
app.delete('/todos/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})


// UPDATE TASK
app.put('/todos/update/:id', async (req, res) => {
    const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    updatedTask.save();

    res.json(updatedTask);
  });
  


// PUTTING TASKS INTO DONE SECTION
app.put('/todos/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})



app.listen(3001, () => console.log("Server started on port 3001"));