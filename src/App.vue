<template>
  <div :class="['container', backgroundColor]">
    <div>
      <header class="header">
        <h1 class="title">
          <i class="material-icons"> check_circle </i><span>Pomofocus</span>
        </h1>
        <div class="btn-list">
          <button>
            <i class="material-icons">insert_chart</i><span>Report</span>
          </button>
          <button>
            <i class="material-icons">settings</i><span>Setting</span>
          </button>
          <button>
            <i class="material-icons">account_circle</i><span>Login</span>
          </button>
        </div>
      </header>
      <main class="pomofocus-main">
        <section class="pomodoro-timer-section">
          <pomodoro-timer
            @switch-pomodoro-status="switchPomodoroStatus"
          ></pomodoro-timer>
        </section>
        <section class="current-task-section">
          <!-- TODO: Add current task and pomodoro interval number here -->
        </section>
        <section class="pomodoro-tasks-section">
          <pomodoro-tasks></pomodoro-tasks>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import PomodoroTimer from "./components/PomodoroTimer.vue";
import PomodoroTasks from "./components/PomodoroTasks.vue";

Vue.component("pomodoro-timer", PomodoroTimer);
Vue.component("pomodoro-tasks", PomodoroTasks);
export default {
  name: "App",
  components: {
    PomodoroTimer,
    PomodoroTasks,
  },
  data() {
    return {
      pomodoroStatus: "active_pomodoro",
    };
  },
  methods: {
    switchPomodoroStatus(event) {
      this.pomodoroStatus = event;
    },
  },
  computed: {
    //bind to this computed property using v-bind:class, which will return an object that will be used to dynamically toggle the background color of the container div based on the value of pomodoroStatus.
    backgroundColor() {
      return {
        "active-pomodoro": this.pomodoroStatus == "active_pomodoro",
        "short-break": this.pomodoroStatus == "short_break",
        "long-break": this.pomodoroStatus == "long_break",
      };
    },
  },
};
</script>
<style scoped>
</style>