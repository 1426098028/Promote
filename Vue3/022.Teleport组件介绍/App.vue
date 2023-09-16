<template>
  <div>Teleport组件介绍</div>
  <Modal />
</template>
<script lang="ts">
import { defineComponent, } from 'vue'
import Modal from './Modal.vue'
export default defineComponent({
  name: 'AppName',
  components: {
    Modal
  }
})
</script>