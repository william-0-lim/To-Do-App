import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ToDoComponent.css';
const api_base = 'http://localhost:3001';

const ToDoComponent = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
		GetTodos();
	}, []);

    const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

    console.log(todos)
    return (
        <div>
            <h1>TO DO</h1>
            {todos.map(todo => (
                <Card key={todo._id} className="card-body">
                    <CardContent>
                        <Typography variant="h5" component="div">
                        {todo.text}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                        </Typography>
                        <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
  };
  
  export default ToDoComponent;