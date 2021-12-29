<template>
  <div class="home">
    <div class="VideoOutbox">
      <component :is="'canvasvideo'"></component>
    </div>
  </div>
</template>

<script>
import canvasvideo from "./canvasvideo/index";
export default {
  name: "Home",
  components: {
    canvasvideo,
  },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  .VideoOutbox {
    width: 100%;
    height: 100%;
  }
}
</style>

