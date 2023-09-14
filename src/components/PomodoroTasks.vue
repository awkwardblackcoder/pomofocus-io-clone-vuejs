<template>
  <section class="pomodoro-tasks-container">
    <section class="pomodoro-tasks-header">
      <h1>Tasks</h1>
      <button class="menu-btn">
        <i class="material-icons">more_vert</i>
      </button>
    </section>
    
      <section class="pomodoro-tasks-list">
        <div v-for="(task, index) in taskList" :key="task.id">
        <div :class="['todo-item', { 'selected': selectedTaskId == task.id }]" @click="selectTask(task.id)">
          <span class="task-checkmark">
            <i :class="['material-icons', { 'checked': task.isDone == true }]" @click="markTaskComplete(index)">
              check_circle
            </i>
          </span>
          <span :class="['todo-label', { 'completed': task.isDone }]">{{ task.title }}</span>
          <span class="num-of-pomodoros">
            <span class="completed-pomodoros">{{ task.completed_pomodoros }}</span> / <span class="est-pomodoros">{{
              task.est_pomodoros }}</span>
          </span>
          <span class="todo-menu-btn">
            <i class="material-icons">more_vert</i>
          </span>
        </div>
        </div>
      </section>
    <section>
      <button class="add-task-btn">
        <i class="material-icons-round">add_circle</i>
        <span>Add Task</span>
      </button>
    </section>
  </section>
</template>

<script>


export default {
  name: "PomodoroTasks",
  data() {
    return {
      selectedTaskId: null,
      newTask: {
        id: 6,
        
      },
      taskList: [{
        id: 1,
        title: "Brush Teeth",
        est_pomodoros: 1,
        completed_pomodoros: 1,
        isDone: true
      },
      {
        id: 2,
        title: "Make Breakfast",
        est_pomodoros: 1,
        completed_pomodoros: 0,
        isDone: false
      },
      {
        id: 3,
        title: "Drink Green Tea",
        est_pomodoros: 1,
        completed_pomodoros: 0,
        isDone: false
      },
      {
        id: 4,
        title: "Code",
        est_pomodoros: 1,
        completed_pomodoros: 1,
        isDone: true
      }
      ]
    };
  },
  methods: {
    markTaskComplete(index) {
      event.stopPropagation(); // Prevent event from propagating to the parent
      let task = this.taskList[index];
      task.isDone = !task.isDone;
    },
    selectTask(id) {
      this.selectedTaskId = id;
    },
    onUpdate(event) {
      console.info('event::', event)
      console.info('taskList::', this.taskList)
    }
  }
};
</script>

<style scoped>
.pomodoro-tasks-header {
  border-bottom: 1px solid;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 35px;
  align-items: center;
}

.pomodoro-tasks-header h1 {
  font-size: 20px;
}

.pomodoro-tasks-header .menu-btn {
  background-color: rgba(234, 221, 221, 0.18);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 2px;
  height: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.pomodoro-tasks-list {
  margin: 15px 0;
}
/** ToDo Item CSS Start*/
.todo-item,
.add-task-btn {
  height: 64px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
}

.todo-item {
  background-color: white;
  color: #555555;
  display: grid;
  grid-gap: 10px;
  margin-top: 6px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  grid-template-columns: 1fr 9fr 1fr 1fr;
  width: calc(100% - 12px);
  padding: 15px 0 15px 12px;
  cursor: pointer;
  height: auto;
}

.todo-item:hover {
  border-left: 6px solid #dfdfdf;
  width: calc(100% - 18px);
}

.todo-item.selected {
  margin-top: 8px;
  border-left: 6px solid black;
  width: calc(100% - 18px);
  box-shadow: none;
}

.todo-item span {
  display: flex;
  align-items: center;
  line-height: 1.5;
}

.todo-item .task-checkmark .material-icons {
  /* padding-left: 12px; */
  color: #DFDFDF;
  font-size: 30px;
}

.todo-item .task-checkmark .material-icons:hover {
  opacity: 0.6;
}

.todo-item .task-checkmark .material-icons.checked {
  color: #BA4949;
}

.todo-item .todo-label {
  color: #555555;
  max-width: 284px;
  padding-right: 10px;
}

.todo-item .todo-label.completed {
  text-decoration: line-through;
  color: #bbbbbb;
}

.todo-item .num-of-pomodoros {
  color: #bbbbbb;
  font-size: 12px;
  display: flex;
  align-items: baseline;
}

.todo-item .completed-pomodoros {
  font-size: 18px;
  margin-right: 2px;
}

.todo-item .est-pomodoros {
  margin-left: 3px;
}

.todo-item .todo-menu-btn {
  padding-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-item .todo-menu-btn i {
  border: 1px solid #dfdfdf;
  color: #999999;
  padding: 2px 1px;
  border-radius: 4px;
  font-size: 27px;
}

/** TODO Item CSS End */

/** Start Add Task CSS */
.add-task-btn {
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  opacity: 0.8;
  border: 2px dashed rgba(255, 255, 255, 0.4);
}

.add-task-btn .material-icons-round {
  margin-right: 5px;
}

.add-task-btn:hover {
  cursor: pointer;
  opacity: 1;
}

/** End Add Task CSS */
</style>
