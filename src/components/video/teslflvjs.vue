<template>
  <div>
    <video
      id="videoElement"
      controls
      autoplay
      muted
      width="300px"
      height="200px"
      ref="player"
      @dblclick="fullScreen"
    ></video>
    <button @click="play">播放</button>
  </div>
</template>
<script>
import flvjs from "flv.js";
export default {
  data() {
    return {
      flvPlayer: null,
    };
  },
  mounted() {
    this.Axiosfun();
    //this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
  },
  methods: {
    Axiosfun() {
      this.$axios.get("data/video.json").then((res) => {
        console.log("Axiosfun", res, window.location.host);
        let host = window.location.host;
         //this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
       this.InitPalyFun(`http://${host}res.data.VideoSrc`);
      });
    },
    InitPalyFun(VideoSrc) {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url: VideoSrc, // "http://1011.hlsplay.aodianyun.com/demo/game.flv", //"http://20.20.0.16:8080/live?port=1935&app=myapp&stream=shenhua"//
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },
    play() {
      this.flvPlayer.play();
    },
    fullScreen() {
      if (this.$refs.player.requestFullScreen) {
        this.$refs.player.requestFullScreen();
      } else if (this.$refs.player.mozRequestFullScreen) {
        this.$refs.player.mozRequestFullScreen();
      } else if (this.$refs.player.webkitRequestFullScreen) {
        this.$refs.player.webkitRequestFullScreen();
      }
    },
  },
};
</script>
<style lang="scss">
video::-webkit-media-controls-fullscreen-button {
  // display: none;
}
//播放按钮
video::-webkit-media-controls-play-button {
  display: none;
}
//进度条
video::-webkit-media-controls-timeline {
  display: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display {
  display: none;
}
//剩余时间
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
//音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
//音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none;
}
//所有控件
video::-webkit-media-controls-enclosure {
  // display: none;
}
</style>