// routes/tasks.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Get all tasks for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Server error: Unable to fetch tasks' });
  }
});

// Add a new task
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ msg: 'Task text is required' });
    }

    const newTask = new Task({
      userId: req.user.id,
      text,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ error: 'Server error: Unable to add task' });
  }
});

// Update an existing task
router.put('/:id', auth, async (req, res) => {
  try {
    const { text, isCompleted } = req.body;

    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Only update the fields that are provided
    if (text !== undefined) task.text = text;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ error: 'Server error: Unable to update task' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(200).json({ msg: 'Task successfully deleted' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Server error: Unable to delete task' });
  }
});

module.exports = router;
