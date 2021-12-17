<template>
  <div>
    <div class="MytrackvideoElementoutbox">
      <video
        id="trackvideoElement"
        controls
        autoplay
        muted
        width="600px"
        height="400px"
        ref="player"
        @dblclick="fullScreen"
      ></video>
      <canvas id="canvas" width="600" height="400"></canvas>
    </div>
    <button @click="play">播放</button>
  </div>
</template>
<script>
import flvjs from "flv.js";
import * as dat from "dat.gui";

// const gui = new dat.GUI();
export default {
  data() {
    return {
      flvPlayer: null,
    };
  },
  mounted() {
    // this.Axiosfun();
    this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
  },
  methods: {
    Axiosfun() {
      this.$axios.get("data/video.json").then((res) => {
        console.log("Axiosfun", res, window.location.host);
        let host = window.location.host;
        //this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
        // this.InitPalyFun(`http://${host}res.data.VideoSrc`);
      });
    },
    InitPalyFun(VideoSrc) {
      if (flvjs.isSupported()) {
        var trackvideoElement = document.getElementById("trackvideoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url: VideoSrc, // "http://1011.hlsplay.aodianyun.com/demo/game.flv", //"http://20.20.0.16:8080/live?port=1935&app=myapp&stream=shenhua"//
        });
        this.flvPlayer.attachMediaElement(trackvideoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
        this.TrackFaceFun();
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
    TrackFaceFun() {
      var video = document.getElementById("trackvideoElement");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      var tracker = new tracking.LandmarksTracker();
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track("#trackvideoElement", tracker);

      tracker.on("track", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (!event.data) return;
        console.log("event.data", event.data);
        event.data.faces.forEach(function (rect) {
          context.strokeStyle = "#a64ceb";
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = "11px Helvetica";
          context.fillStyle = "#fff";
          context.fillText(
            "x: " + rect.x + "px",
            rect.x + rect.width + 5,
            rect.y + 11
          );
          context.fillText(
            "y: " + rect.y + "px",
            rect.x + rect.width + 5,
            rect.y + 22
          );
        });

        event.data.landmarks.forEach(function (landmarks) {
          for (var l in landmarks) {
            context.beginPath();
            context.fillStyle = "#fff";
            context.arc(landmarks[l][0], landmarks[l][1], 1, 0, 2 * Math.PI);
            context.fill();
          }
        });
      });

      var gui = new dat.GUI();
      gui.add(tracker, "edgesDensity", 0.1, 0.5).step(0.01).listen();
      gui.add(tracker, "initialScale", 1.0, 10.0).step(0.1).listen();
      gui.add(tracker, "stepSize", 1, 5).step(0.1).listen();
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
.MytrackvideoElementoutbox {
  position: relative;
  width: 600px;
  height: 400px;
}
.trackvideoElement {
  position: absolute;
  top: 0;
  left: 0;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  //background: #333;
}
</style>