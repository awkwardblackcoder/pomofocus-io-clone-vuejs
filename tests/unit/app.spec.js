import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('set initial Pomodoro Status on load', () => {
  it('should set initial pomodoro status to "active_pomodoro"', () => {
    const pomodoroStatus = 'active_pomodoro'
    const wrapper = mount(App);
    expect(wrapper.vm.pomodoroStatus).toBe(pomodoroStatus);
  })
  it('should set app background color based on pomodoro status', () => {
    const bgClass = 'active-pomodoro'
    const wrapper = mount(App);
    const container = wrapper.find('.container');
    expect(container.classes()).toContain(bgClass);
  })
});