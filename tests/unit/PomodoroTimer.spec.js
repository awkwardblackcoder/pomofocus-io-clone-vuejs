import { mount } from '@vue/test-utils'
import PomodoroTimer from '@/components/PomodoroTimer.vue'

describe('set initial Pomodoro Status on load', () => {
  it('should set initial pomodoro status to "active_pomodoro"', () => {
    const pomodoroStatus = 'active_pomodoro'
    const wrapper = mount(PomodoroTimer);
    expect(wrapper.vm.pomodoroStatus).toBe(pomodoroStatus);
  })
});