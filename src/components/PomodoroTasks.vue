<template>
  <section class="pomodoro-tasks-container">
    <section class="pomodoro-tasks-header">
      <h1>Tasks</h1>
      <button class="menu-btn">
        <i class="material-icons">more_vert</i>
      </button>
    </section>

    <section class="pomodoro-tasks-list">
      <div v-for="(task, key) in taskList" :key="key">
        <article v-if="task.editMode" class="add-edit-task-section">
          <section class="input-section">
            <input type="text" name="task-title-textbox" class="task-title" v-model="newTask['title']"
              placeholder="What are you working on?" autofocus>
          </section>
          <section class="pomodoro-input-section">
            <label for="pomodoros-textbox">Act / Est Pomodoros</label>
            <section class="pomo-input">
              <input type="number" min="0" step="1" name="act-pomodoros-textbox" id="act-pomodoros-textbox"
                v-model="newTask['act_pomodoros']">
              <span class="divider">/</span>
              <input type="number" min="0" step="1" name="est-pomodoros-textbox" id="est-pomodoros-textbox"
                v-model="newTask['est_pomodoros']">
              <button class="increase-pomos" @click="increase_pomodoros">
                <i class="material-icons">arrow_drop_up</i>
              </button>
              <button class="decrease-pomos" @click="decrease_pomodoros">
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
          <section class="add-edit-task-section-footer">
            <button class="delete" @click="deleteTask(key)">Delete</button>
            <span>
              <button class="cancel" @click="cancelTaskEdit(key)">Cancel</button>
              <button class="save" @click="saveTaskChanges(key)">Save</button>
            </span>
          </section>
        </article>
        <article v-else :class="['todo-item', { 'selected': selectedTaskId == key }]" @click="selectTask(key)">
          <span class="task-checkmark">
            <i :class="['material-icons', { 'checked': task.isDone == true }]" @click="markTaskComplete(key)">
              check_circle
            </i>
          </span>
          <span :class="['todo-label', { 'completed': task.isDone }]">{{ task.title }}</span>
          <span class="num-of-pomodoros">
            <span class="completed-pomodoros">{{ task.act_pomodoros }}</span> / <span class="est-pomodoros">{{
              task.est_pomodoros }}</span>
          </span>
          <button class="todo-menu-btn" @click="editTask(key)">
            <i class="material-icons">more_vert</i>
          </button>
        </article>
      </div>
    </section>
    <section v-if="addTaskMode" class="add-edit-task-section">
      <section class="input-section">
        <input type="text" name="task-title-textbox" class="task-title" v-model="newTask['title']"
          placeholder="What are you working on?">
      </section>
      <section class="pomodoro-input-section">
        <label for="pomodoros-textbox">Est Pomodoros</label>
        <section class="pomo-input">
          <input type="number" min="0" step="1" name="est-pomodoros-textbox" id="est-pomodoros-textbox"
            v-model="newTask['est_pomodoros']">
          <button class="increase-pomos" @click="increase_pomodoros">
            <i class="material-icons">arrow_drop_up</i>
          </button>
          <button class="decrease-pomos" @click="decrease_pomodoros">
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
      <section class="add-edit-task-section-footer">
        <button class="cancel" @click="resetNewTask()">Cancel</button>
        <button class="save" @click="addTasktoList(newTask)">Save</button>
      </section>
    </section>
    <section>
      <button class="add-task-btn" v-if="!addTaskMode" @click="openNewTaskbox()">
        <i class="material-icons-round">add_circle</i>
        <span>Add Task</span>
      </button>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "PomodoroTasks",
  data() {
    return {
      selectedTaskId: null,
      addTaskMode: false,
      newTask: {
        est_pomodoros: 1,
        act_pomodoros: 0,
        title: ""
      },
      taskList: [{
        title: "Brush Teeth",
        est_pomodoros: 1,
        act_pomodoros: 0,
        isDone: true,
        editMode: false
      }]
    };
  },

  methods: {
    ...mapActions(['setSelectedTask']),
    markTaskComplete(index) {
      event.stopPropagation(); // Prevent event from propagating to the parent
      let task = this.taskList[index];
      task.isDone = !task.isDone;
    },

    selectTask(id) {
      this.selectedTaskId = id;
      let taskName = this.taskList[id].title;
      this.setSelectedTask(taskName);
    },

    openNewTaskbox() {
      if (this.taskList.length > 0) {
        this.taskList.every((task) => {
          if (task.editMode) {
            this.$confirm('The change will be lost. Are you sure you want to close it?', 'pomofocus.io says').then(() => {
              task.editMode = false;
              this.resetNewTask();
              this.addTaskMode = true;
            }).catch(() => {
              //no action will be taken
            })
          } else {
            this.addTaskMode = true;
          }
        })
      } else this.addTaskMode = true;
    },

    addTasktoList(newPomodoroTask) {
      let newTask = {
        title: newPomodoroTask.title,
        est_pomodoros: newPomodoroTask['est_pomodoros'],
        act_pomodoros: 0,
        isDone: false
      }
      this.taskList.push(newTask);
      this.resetNewTask();
    },

    editTask(id) {
      if (this.addTaskMode) {
        this.addTaskMode = false;
        this.resetNewTask();
      }

      this.taskList.forEach((task) => {
        task.editMode = false;
      })

      let task = this.taskList[id];
      task.editMode = true;
      this.newTask = task;
    },

    cancelTaskEdit(id) {
      let task = this.taskList[id];
      task.editMode = false;
      this.resetNewTask();
    },

    resetNewTask() {
      this.newTask = {
        est_pomodoros: 1,
        act_pomodoros: 0,
        title: "",
      }

      if (this.addTaskMode) {
        this.addTaskMode = false;
      }
    },

    saveTaskChanges(id) {
      let task = this.taskList[id];
      if (task != this.newTask) {
        task = this.newTask;
        this.resetNewTask();
      }
      task.editMode = false;
    },

    deleteTask(id) {
      this.taskList.splice(id, 1);
      if (this.selectedTaskId == id) {
        this.setSelectedTask('Time to focus!');
        this.selectedTaskId = null;
      }
      this.resetNewTask();
    },

    increase_pomodoros() {
      let estPomodoros = this.newTask['est_pomodoros'];
      if (estPomodoros < 1) {
        estPomodoros += 0.10;
      } else estPomodoros++;
      this.newTask['est_pomodoros'] = Math.floor(estPomodoros) !== estPomodoros ? estPomodoros.toFixed(1) : estPomodoros;
    },

    decrease_pomodoros() {
      let estPomodoros = this.newTask['est_pomodoros'];
      if (estPomodoros <= .10) {
        estPomodoros = 0;
      }
      else if (estPomodoros <= 1) {
        estPomodoros -= 0.10;
      } else { estPomodoros--; }

      this.newTask['est_pomodoros'] = Math.floor(estPomodoros) !== estPomodoros ? estPomodoros.toFixed(1) : estPomodoros;
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
  border-left: 6px solid white;
  width: calc(100% - 18px);
  padding: 15px 0 15px 12px;
  cursor: pointer;
  height: auto;
}

.todo-item:hover {
  border-color: #dfdfdf;
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
  border: none;
  background: none;
}

.todo-item .todo-menu-btn i {
  border: 1px solid #dfdfdf;
  color: #999999;
  padding: 2px 1px;
  border-radius: 4px;
  font-size: 27px;
}

.todo-item .todo-menu-btn i:hover {
  background-color: #dfdfdf;
  cursor: pointer;
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

/** Add Edit Task Section */

.add-edit-task-section {
  background-color: white;
  color: #555555;
  margin: -2px 0 10px;
  padding-top: 25px;
  height: auto;
  width: 100%;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.add-edit-task-section .input-section,
.add-edit-task-section .pomodoro-input-section,
.add-edit-task-section .settings {
  padding-left: 20px;

}

.add-edit-task-section .task-title {
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 18px;
  width: calc(100% - 30px);
  height: 28px;
  margin-bottom: 20px;
  letter-spacing: -0.2px;
  color: #555555;

}

.add-edit-task-section .task-title::placeholder {
  color: #dfdfdf;
  font-style: italic;
}

.pomodoro-input-section label {
  font-weight: bold;
  font-size: 16px;
}

.pomo-input {
  display: flex;
  margin-top: 15px;
  align-items: center;
}

.pomo-input .divider {
  margin-right: 5px;
}

.pomodoro-input-section .pomo-input input {
  background-color: #efefef;
  border: none;
  outline: none;
  border-radius: 5px;
  height: 16px;
  width: 45px;
  margin-right: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #555555;
}

.pomodoro-input-section .pomo-input #act-pomodoros-textbox {
  color: rgb(187, 187, 187)
}

.pomodoro-input-section {
  margin-right: 5px;
}

.pomodoro-input-section .pomo-input button {
  background-color: white;
  color: #555555;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  height: 30px;
  width: 30px;
  margin: 0px 2px;
  padding: 2px 6px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pomodoro-input-section .pomo-input button i {
  font-size: 24px;
}

.add-edit-task-section .settings {
  display: flex;
  list-style: none;

}

.add-edit-task-section .settings li {
  text-decoration: none;
  display: flex;
  align-items: flex-end;
  letter-spacing: .02em;
}

.add-edit-task-section .settings li a {
  color: #0006;
  font-weight: 500;
  text-decoration: underline;
  margin-right: 10px;
  font-size: 14px;
}

.add-edit-task-section .settings i {
  font-size: 18px;
}

.add-edit-task-section .settings a i {
  font-weight: bold;
  text-decoration: underline;
  font-size: 14px;
}

.add-edit-task-section .add-edit-task-section-footer {
  background-color: gray;
  width: calc(100% - 45px);
  height: auto;
  background-color: #efefef;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-edit-task-section .add-edit-task-section-footer button {
  border: none;
  color: #888;
  font-weight: bold;
  font-size: 14px;
  min-width: 70px;
  padding: 8px 12px;
  margin-right: 10px;
  border-radius: 4px;
  opacity: .9;
}

.add-edit-task-section-footer button.save {
  background-color: #222;
  color: white;
  border: 2px solid #222;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px;
}

.add-edit-task-section-footer button:hover {
  cursor: pointer;
}

.add-edit-task-section-footer .save:hover {
  opacity: 1;
}

.pomodoro-tasks-list .add-edit-task-section {
  margin-top: 10px !important;
}

/** End Add Edit Task Section */
</style>
