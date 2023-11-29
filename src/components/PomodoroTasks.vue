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
     <section v-if="addTaskMode" class="add-task-section">
      <section class="input-section">
        <input type="text" name="new-task-title-textbox" id="new-task-title" v-model="newTask['title']" placeholder="What are you working on?">
      </section>
      <section class="est-pomodoros-section">
        <label for="est-pomodoros-textbox">Est Pomodoros</label>
        <section class="est-pomo-input">
          <input type="text" name="est-pomodoros-textbox" id="est-pomodoros-textbox" v-model="newTask['est_pomodoros']">
          <button class="increase-pomos">
            <i class="material-icons">arrow_drop_up</i>
          </button>
          <button class="decrease-pomos">
            <i class="material-icons">arrow_drop_down</i>
          </button>
        </section>
    </section>
      <section>
        <ul class="settings">
            <li><a href="#"><i class="material-icons">add</i>Add Note</a></li>
            <li><a href="#"><i class="material-icons">add</i>Add Project</a><i class="material-icons">lock</i></li>
          </ul>
      </section>
      <section class="add-task-section-footer">
          <button class="cancel" @click="addTaskMode = false">Cancel</button>
          <button class="save" @click="addTasktoList(newTask)">Save</button>
        </section>
    </section>
    <section>
      <button class="add-task-btn" v-if="!addTaskMode" @click="addTaskMode = true">
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
      addTaskMode: false,
      newTask: {
        id: 5,
        est_pomodoros: 1,
        completed_pomodoros: 0,
        title: "",
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
    addTasktoList(newPomodoroTask) {
      let newTask = newPomodoroTask;
      this.taskList.push(newTask);
      console.info(this.taskList);
      this.newTask = {
        id: 6,
        est_pomodoros: 1,
        completed_pomodoros: 0,
        title: ""
      }
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

/** Start Add Task Btn CSS */
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

/** End Add Task Btn CSS */

/** Add Task Section */

.add-task-section {
  background-color: white;
  color: #555555;
  margin: -2px 0 10px;
  padding-top: 25px;
  height: auto;
  width: 100%;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.add-task-section .input-section,.add-task-section .est-pomodoros-section, .add-task-section .settings {
  padding-left: 20px;

}

.add-task-section #new-task-title {
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 22px;
  width: calc(100% - 30px);
  height: 28px;
  margin-bottom: 20px;
  letter-spacing: -0.2px;
  color: #555555;
  
}

.add-task-section #new-task-title::placeholder {
  color: #dfdfdf;
  font-style: italic;
}

.est-pomodoros-section label {
  font-weight: bold;
  font-size: 18px;
}

.est-pomo-input {
  display: flex;
  margin-top: 15px;
}

.est-pomodoros-section .est-pomo-input input {
  background-color: #efefef;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 25px;
  width: 75px;
  margin-right: 10px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #555555;
}

.est-pomodoros-section .est-pomo-input button {
  background-color: white;
  color: #555555;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  height: 40px;
  margin: 0px 2px;
  padding: 2px 6px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px;
  cursor: pointer;
}

.est-pomodoros-section .est-pomo-input button i {
  font-size: 30px;
}

.add-task-section .settings {
  display: flex;
  list-style: none;
  
}

.add-task-section .settings li {
    text-decoration: none;
    display: flex;
    align-items: flex-end;
    letter-spacing: .02em;
}

.add-task-section .settings li a {
  color: #0006;
  font-weight: 500;
  text-decoration: underline;
  margin-right: 10px;
  font-size: 16px;
}

.add-task-section .settings i {
  font-size: 18px;
}
.add-task-section .settings a i {
font-weight: bold;
text-decoration: underline;
font-size: 14px;
}

.add-task-section .add-task-section-footer {
  background-color: gray;
  width: calc(100% - 45px);
  height: auto;
  background-color: #efefef;
  padding: 15px 20px;
  display: flex;
}

.add-task-section .add-task-section-footer button {
  border: none;
  color: #888;
  font-weight: bold;
  font-size: 14px;
  min-width: 70px;
  padding: 8px 12px;
  border-radius: 4px;
  opacity: .9;
}

.add-task-section .add-task-section-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.add-task-section-footer button {
  margin-left: 10px;
}

.add-task-section-footer button.save {
  background-color: #222;
  color: white;
  border: 2px solid #222;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px;
}

.add-task-section-footer button:hover {
  cursor: pointer;
}
.add-task-section-footer .save:hover {
opacity: 1;
}
/** End Add Task Section */


</style>
