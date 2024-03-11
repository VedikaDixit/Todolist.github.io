const all_todos_query = `select * from todos ORDER BY timstamp desc LIMIT ? OFFSET ?`

const get_total_count_query = `select count(task_id) count from todos`

const insert_todo_query = `insert into todos values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`

const update_status_query =  `update todos set status = ? where task_id = ?`

const update_todo_query  = `update todos set title = ?, task = ?, due_date = ?, from_time = ?, to_time = ? where task_id = ?`

const delete_one_todo_query = `delete from todos where task_id = ?`

const delete_todo_category_query = `delete from todos where status = ?`

const delete_all_todo_query = `delete from todos`

module.exports = {
    all_todos_query,
    insert_todo_query,
    update_status_query,
    update_todo_query,
    delete_one_todo_query,
    delete_all_todo_query,
    get_total_count_query,
    delete_todo_category_query
}