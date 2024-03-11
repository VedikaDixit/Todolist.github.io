const { get_tasks, insert_todo, update_todo, delete_todo, get_count } = require("../models/queries");
const {v4:uuid} = require("uuid")

async function getTodos(req,res){
    try {
        const page = req.query.page
        const items = req.query.items
        const todos = await get_tasks(items*(page-1),items)
        const count = await get_count()
        res.status(200).json({todos, count:count[0].count})
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

async function createTodo(req,res){
    try {
        const todo = {
            task_id:uuid(),
            ...req.body,
            status:'0'
        }
        console.log(todo);
        const result = await insert_todo(todo)
        if(result.affectedRows>0)
            res.status(200).json({'msg':'success','todo':todo})
        else    
            res.status(304).json({'msg':'not modified'})
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

async function updateStatus(req,res){
    try {
        const result = await update_todo(req.body,null)
        console.log(req.body);
        console.log(result);
        if(result.changedRows>0){
            res.status(200).json({'msg':'success'})
        } else{
            res.status(304).json({'msg':'not modified'})
        }
    } catch (error) {
        res.status(500).json({'err':error})
    }
}

async function updateTodo(req,res){
    try {
        const result = await update_todo(null,req.body)
        console.log(result);
        if(result.changedRows>0){
            res.status(200).json({'msg':'success'})
        } else {
            res.status(304).json({'msg':'unmodified'})
        }
    } catch (error) {
        console.log("update todo error->",error);
        res.status(500).json({'err':error})
    }
}

async function deleteTodo(req,res){
    try {
        const result = await delete_todo(req.query.todo)
        if(result.affectedRows>0){
            res.status(200).json({'msg':'success'})
        } else {
            res.status(304).json({'msg':'unmodified'})
        }
    } catch (error) {
        console.log("deleting error->",error);
        res.status(500).json({'err':error})
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateStatus,
    updateTodo,
    deleteTodo
}