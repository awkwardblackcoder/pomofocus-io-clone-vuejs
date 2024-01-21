<template>
  <section class="pomodoro-timer-container">
    <div class="btn-list">
      <span v-for="btn in pomodoroTimerButtons" :key="btn.id">
        <button :class="[{ selected: pomodoroStatus == btn.type }]" @click="switchPomodoroStatus(btn.type)">
          <span>{{ btn.label }}</span>
        </button>
      </span>
    </div>
    <div class="timer">
      <b>{{ remainingTime | formatTime }}</b>
    </div>
    <div :class="['action-btns', { 'active-timer': timerActive == true }]">
      <button class="timer-btn" v-if="!timerActive" @click="
        timerActive = !timerActive;
      startTimer();
      ">
        <b>START</b>
      </button>
      <button class="timer-btn pause" v-else-if="timerActive" @click.prevent="
        timerActive = !timerActive;
      pauseTimer();
      ">
        <b>PAUSE</b>
      </button>
      <button v-if="timerActive" class="next" @click.prevent="resetTimer">
        <i class="material-icons">skip_next</i>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "PomodoroTimer",
  data() {
    return {
      pomodoroStatus: "active_pomodoro",
      pomodoroTimerButtons: [
        {
          label: "Pomodoro",
          type: "active_pomodoro",
        },
        {
          label: "Short Break",
          type: "short_break",
        },
        {
          label: "Long Break",
          type: "long_break",
        },
      ],
      timeSpan: 25,
      countdownTimer: null,
      remainingTime: null,
      timerActive: false,
      timerPaused: false,
    };
  },
  filters: {
    formatTime: function (value) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;

      var minutes = Math.floor((value % hour) / minute);
      var seconds = Math.floor((value % minute) / second);

      let formattedTimeValue = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      //console.info(formattedTimeValue);
      return formattedTimeValue;
    },
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    /** TODO: Add to Notes:
     *
     * const second = 1000;
     * const minute = second * 60;
     * const hour = minute * 60;
     * const day = hour * 24;
     *
     * everySecond = setInterval(countDownFn, second)
     * everyMinute = setInterval(countDownFn, minute)
     * everyHour = setInterval(countDownFn, hour)
     *
     * https://stackabuse.com/how-to-build-a-date-countdown-with-vanilla-javascript/
     *
     * https://stackoverflow.com/questions/18889548/javascript-change-gethours-to-2-digit
     */
    ...mapActions(['incrementPomodoroCnt', 'setSelectedActivity']),
    getEndTime() {
      let date = new Date();
      let minutes = date.getMinutes();
      let endTime = date.setMinutes(minutes + this.timeSpan);
      //console.info("end_time::", endTime);
      return endTime;
    },

    setTimer() {
      let endTime = this.getEndTime();
      this.getRemainingTime(endTime);
    },

    startTimer() {
      let endTime;
      if (this.timerPaused) {
        this.timerPaused = false;
        let date = new Date();
        endTime = date.setTime(date.getTime() + this.remainingTime);
      } else {
        endTime = this.getEndTime();
      }
      this.countdownTimer = setInterval(() => {
        this.getRemainingTime(endTime);
        if (this.remainingTime <= 0) {
          this.resetTimer();
        }
      }, 1000);
    },

    pauseTimer() {
      this.timerPaused = true;
      clearInterval(this.countdownTimer);
      this.timerActive = false;
    },

    getRemainingTime(end_time) {
      let currentTime = new Date().getTime();
      this.remainingTime = end_time - currentTime;
      //console.info("remainingTime::", this.remainingTime);
    },

    resetTimer() {
      clearInterval(this.countdownTimer);
      this.timerActive = false;
      this.setPomodoroStatus();
      this.setTimer();
    },

    setPomodoroStatus() {
      if (this.pomodoroStatus == "active_pomodoro") {
        if (this.pomodoroCnt % 4 == 0) {
          this.switchPomodoroStatus("long_break");
        } else this.switchPomodoroStatus("short_break");
      } else {
        this.switchPomodoroStatus("active_pomodoro");
        this.incrementPomodoroCnt();
      }
    },

    setTimeSpan() {
      if (this.pomodoroStatus == "short_break") {
        this.timeSpan = 5;
      } else if (this.pomodoroStatus == "long_break") {
        this.timeSpan = 15;
      } else this.timeSpan = 25;

      let endTime = this.getEndTime();
      this.getRemainingTime(endTime);
    },

    switchPomodoroStatus(status) {
      if (this.countdownTimer != null) {
        clearInterval(this.countdownTimer);
        this.timerActive = false;
      }
      if (this.pomodoroStatus != status) {
        this.pomodoroStatus = status;
        this.setTimeSpan();
        //kebab-case is best practice for custom events due to case-insensitivity
        this.$emit("switch-pomodoro-status", status);
      }
    },
  },
  computed: {
    ...mapState(['pomodoroCnt']),
  }
};
</script>

<style scoped>
.pomodoro-timer-container {
  background-color: rgba(234, 221, 221, 0.18);
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: 5px;
  padding: 20px 0;
}

.pomodoro-timer-container .btn-list {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.pomodoro-timer-container .btn-list button {
  color: white;
  background-color: unset;
  border: none;
  padding: 5px;
  font-size: 16px;
  width: 110px;
}

.pomodoro-timer-container .btn-list button:hover {
  cursor: pointer;
}

.pomodoro-timer-container .btn-list button.selected {
  background-color: rgb(37 35 35 / 18%);
  font-weight: bold;
  border-radius: 5px;
}

.pomodoro-timer-container .timer {
  padding: 20px 0;
  font-size: 100px;
  text-align: center;
}

.pomodoro-timer-container .action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
}

.pomodoro-timer-container .action-btns.active-timer {
  margin-top: 6px;
  margin-left: 10px;
}

.pomodoro-timer-container .action-btns .timer-btn {
  color: #ba4949;
  width: 200px;
  font-size: 22px;
  padding: 15px;
  border-radius: 4px;
  border: none;
  border-bottom: 6px solid lightgray;
  cursor: pointer;
}

.pomodoro-timer-container .action-btns .pause {
  margin-left: 50px;
  border-bottom: none;
  margin-top: -6px;
}

.pomodoro-timer-container .action-btns .next {
  border: none;
  color: white;
  background-color: transparent;
  margin-left: 5px;
  cursor: pointer;
}

.pomodoro-timer-container .action-btns .next i.material-icons {
  font-size: 50px;
}
</style>
