<script lang="ts" setup>
import { ref } from "vue";
import { vInterSectionObserver } from "./directives/vIntersectionObserver";

const playing = ref(true);
const handleIO = ([self]: IntersectionObserverEntry[]) => {
  console.log(self);
  playing.value = self.isIntersecting ?? false;
};
const showBox = ref(true);
</script>

<template>
  <button class="toggle" @click="showBox = !showBox">toggle</button>
  <div class="block">
    <div
      v-inter-section-observer="handleIO"
      v-if="showBox"
      :class="[
        'box',
        {
          playing,
        },
      ]"
    ></div>
  </div>
</template>

<style scoped>
.toggle {
  position: fixed;
  top: 30px;
}
.block {
  height: 200vw;
}
@keyframes box-anim {
  to {
    width: 500px;
  }
}
.box {
  width: 200px;
  height: 200px;
  background-color: red;
  margin-top: calc(100vw + 220px);
}
.box.playing {
  animation: box-anim 1s 0.6s linear 1 forwards;
}
</style>
