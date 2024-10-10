import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jsCookie from 'js-cookie';
// const { defineStore } = Pinia
jsCookie.set('HelloWorldMsg', 'You did it!');
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const HelloWorldMsg = ref(jsCookie.get('HelloWorldMsg'))
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, HelloWorldMsg, doubleCount, increment };
})
