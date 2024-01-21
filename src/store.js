import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedTask: "Time to focus!",
    pomodoroCnt: 1,
    pomodoroStatus: "active_pomodoro",
  },
  getters: {
    pomodoroCnt(state) {
      return `#${state.pomodoroCnt}`;
    },
  },
  mutations: {
    setSelectedTask(state, task) {
      if (state.selectedTask != task) {
        state.selectedTask = task;
      }
    },
    incrementPomodoroCnt(state) {
      state.pomodoroCnt++;
    },
  },
  actions: {
    setSelectedTask(context, task) {
      context.commit("setSelectedTask", task);
    },
    incrementPomodoroCnt(context) {
      context.commit("incrementPomodoroCnt");
    },
  },
});
