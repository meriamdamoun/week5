import TodoList from './todo.js';

const myTodoList = new TodoList();

const task1Id = myTodoList.addTask('Complete project', 'Finish the JavaScript project by Friday');
const task2Id = myTodoList.addTask('Buy groceries', 'Milk, eggs, bread');
const task3Id = myTodoList.addTask('Call mom', 'Don\'t forget her birthday');

myTodoList.completeTask(task1Id);
myTodoList.completeTask(task2Id);

console.log('All tasks:');
console.log(myTodoList.listTasks());

console.log('\nIncomplete tasks:');
console.log(myTodoList.listTasks(false));

console.log('\nTodo List operations completed successfully!');