// Handle API
const express = require('express');
// Handle database
const mongoose = require('mongoose');
const cors = require('cors');

// Handle Email sending
const nodemailer = require('nodemailer');
const cron = require('node-cron');

require('dotenv').config();
const app = express();

// Cross over protection
app.use(cors({
    origin: '*'
}));

app.use(express.json());
mongoose.set('strictQuery', false);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@personaldatabase.w8h9r3l.mongodb.net/?authSource=personalDatabase&authMechanism=SCRAM-SHA-1`, {
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
        description: req.body.description,
        dueDate: req.body.dueDate
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
    const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, 
    {
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

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
});

// A function call to send an email
const sendEmail = (task) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: 'Task Due Soon',
        text: `Task "${task.name}" is due on ${task.dueDate}. ${task.description}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Scheduled task to check for due tasks every day at 9 AM
cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const dueTasks = await Todo.find({ dueDate: { $lte: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) } });
  
    dueTasks.forEach((task) => {
      sendEmail(task);
    });
});

app.listen(3001, () => console.log("Server started on port 3001"));