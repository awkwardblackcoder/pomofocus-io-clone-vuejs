<template>
    <section class="selected-task-container">
        <div class="pomodoro-count">{{ pomodoroCnt }}</div>
        <div class="selected-task">{{ selectedTask }}</div>
    </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState(['selectedTask']),
        ...mapGetters(['pomodoroCnt'])
    }
}
</script>
<style scoped>
.selected-task-container {
    display: flex;
    text-align: center;
    height: 80px;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
}

.selected-task-container .pomodoro-count {
    color: lightgray;
}

.selected-task-container .selected-task {
    letter-spacing: .5px;
}
</style>