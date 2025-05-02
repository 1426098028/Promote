<template>
  <main>

    <div class='Complete'>
      <Complete />
    </div>
    <div class='AOther'>
      <A />
    </div>
    <div class='BOther'>
      <B />
    </div>
    <div class='COther'>
      <C />
    </div>
  </main>
</template>
<script setup lang="ts">
import Complete from '@/components/Complete/index.vue';
import A from '@/components/A/index.vue';
import B from '@/components/B/index.vue';
import C from '@/components/C/index.vue';
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-weight: normal;
}

main {
  width: 100vw;
  height: 100vh;
  background-color: red;
  display: grid;
  grid-template-areas:
    "Complete Complete Complete"
    "A B C";
  grid-template-rows: 1fr 2fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.Complete {
  grid-area: Complete;
  background: rgb(255, 255, 255);
  position: relative;
}

.AOther {
  grid-area: A;
  background: rgb(255, 255, 255);
  position: relative;

}

.BOther {
  grid-area: B;
  background: rgb(255, 255, 255);
  position: relative;

}

.COther {
  grid-area: C;
  background: rgb(255, 255, 255);
  position: relative;

}
</style>
