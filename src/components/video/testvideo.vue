<template>
  <div>
        <div class="item">
        <div class="player">
          <video-player class="vjs-custom-skin" :options="playerOptions">
          </video-player>
        </div>
      </div>
  </div>
</template>

<script>
  import 'videojs-flash'
  export default {
    data() {
      return {
        playerOptions: {
          height: '360',
          
          sources: [{
            type: "rtmp/mp4",
            src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov"
          }],
          techOrder: ['flash'],
          autoplay: false,
          controls: true,
          //poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg"
        }
      }
    }
  }
</script>

