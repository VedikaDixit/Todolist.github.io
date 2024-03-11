const express = require('express')
const { getTodos, createTodo, updateStatus, updateTodo, deleteTodo } = require('../controllers/todoControllers')

const todoRoutes = express()

todoRoutes.route("/todo")
.get(getTodos)
.post(createTodo)
.patch(updateStatus)
.put(updateTodo)
.delete(deleteTodo)

module.exports = todoRoutes