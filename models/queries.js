const { db } = require("./db")
const { all_todos_query, insert_todo_query, update_status_query, update_todo_query, delete_one_todo_query, delete_all_todo_query, get_total_count_query } = require("./strings")
function get_tasks(page, items) {
    console.log(page,items);
    return new Promise((resolve, reject) => {
        db.query(all_todos_query,[parseInt(items), parseInt(page)],(err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

function get_count(){
    return new Promise((resolve, reject) => {
        db.query(get_total_count_query,(err,res)=>{
            err?reject(err):resolve(res)
        })
    })
}

function insert_todo(todo) {
    return new Promise((resolve, reject) => {
        db.query(insert_todo_query, [todo.task_id, todo.title, todo.task, todo.due_date, todo.from_time, todo.to_time, todo.status], (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

function update_todo(update_status,update_task){
    return new Promise((resolve, reject) => {
        if(update_status){
            db.query(update_status_query,[update_status.status, update_status.task_id],(err,data)=>{
                err?reject(err):resolve(data)
            })
        } if(update_task){
            db.query(update_todo_query,[update_task.title,update_task.task,update_task.due_date,update_task.from_time,update_task.to_time, update_task.task_id],(err,data)=>{
                err?reject(err):resolve(data)
            })
        }
    })
}

function delete_todo(one,all){
    return new Promise((resolve, reject) => {
        if(one){
            db.query(delete_one_todo_query,[one],(err,res)=>{
                err?reject(err):resolve(res)
            })
        } else {
            db.query(delete_all_todo_query,(err,res)=>{
                err?reject(err):resolve(res)
            })
        }
    })
}


module.exports = {
    get_tasks,
    insert_todo,
    update_todo,
    delete_todo,
    get_count
}