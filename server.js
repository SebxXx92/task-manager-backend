const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; //hax Use the PORT environment variable, or default to 5000

app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(task);
  console.log('New task added:', task); // Log the new task
  res.json(task);
});

// Toggle task completion
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});