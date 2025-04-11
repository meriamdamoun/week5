class TodoList{
    constructor(){
        this.tasks = [];
    }

    addTask(title, description = '') {
        const task = {
          id: Date.now(),
          title,
          description,
          completed: false,
          createdAt: new Date()
        };
        
        this.tasks.push(task);
        return this.tasks.length - 1;
    }

    completeTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
          return false;
        }
        
        this.tasks[taskIndex].completed = true;
        return true;
    }

    listTasks(showCompleted = true) {
        if (showCompleted) {
          return [...this.tasks];
        } else {
          return this.tasks.filter(task => !task.completed);
        }
    }
}

export default TodoList;