<template>
  <div class="hello">
    <div class="VideoOutbox">
      <!--  <component :is='"canvasvideo"'></component> -->
      <!-- <component :is='"nodeflv"'></component> -->
      <component :is="'teslflvjs'"></component>
      <!-- <component :is='"testvideo"'></component> -->
      <!--  <img src="{{ url_for('video_feed') }}"> -->
      <!--   <component :is='"trackvideo"'></component> -->
    </div>
    <!-- <div class="legendcomponentsoutbox">
      <component :is="'legendcomponents'"></component>
    </div> -->
  </div>
</template>

<script>
// import testvideo from './video/testvideo.vue'
import teslflvjs from "./video/teslflvjs.vue";
// import nodeflv from './video/nodeflv.vue'
// import flaskdemo from './video/flaskdemo.vue'
// import trackvideo from './trackvideo/index.vue'
//import canvasvideo from './canvasvideo/index'
import legendcomponents from "./legendcomponents.vue";
export default {
  name: "HelloWorld",
  components: {
    // testvideo,

    teslflvjs,
    // nodeflv,
    // flaskdemo,
    // trackvideo,
    // canvasvideo
    legendcomponents,
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  .VideoOutbox {
    width: 480px;
    height: 270px;
  }
  .legendcomponentsoutbox {
    width: 230px;
    margin-top: 60px;
  }
}
</style>
