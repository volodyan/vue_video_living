<template>
  <div class="hello">
    <!-- <component :is='"nodeflv"'></component> -->
   <component :is='"teslflvjs"'></component>
    <!-- <component :is='"testvideo"'></component> -->
    <!--  <img src="{{ url_for('video_feed') }}"> -->
    <component :is='"flaskdemo"'></component>
  </div>
</template>

<script>
import testvideo from './video/testvideo.vue'
import teslflvjs from './video/teslflvjs.vue'
import nodeflv from './video/nodeflv.vue'
import flaskdemo from './video/flaskdemo.vue'
export default {
  name: 'HelloWorld',
components:{
  testvideo,
  teslflvjs,
  nodeflv,
  flaskdemo
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
