import { shallowMount } from '@vue/test-utils'
import App from './../../src/App.vue'

describe('App.vue', () => {
  it('sets app background color based on pomodoro status', () => {
    const bgClass = 'active-pomodoro'
    const wrapper = shallowMount(App, {
      data() {
        return {
          pomodoroStatus: "active_pomodoro",
        };
      }
    })
    expect(wrapper.classes(bgClass)).toBe(true)
  })
})
