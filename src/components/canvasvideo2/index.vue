<template>
  <div class="CanvasvideoOutbox">
    <div class="ShowVideoDiv" ref="contentboxref">
      <video
        id="canvasElement"
        controls
        autoplay
        muted
        width="100%"
        height="100%"
        ref="player"
        @dblclick="fullScreen"
      ></video>
      <canvas ref="drawimg4" class="drawimg4Style" @dblclick="CanvasfullScreen"
        >你的浏览器不支持 canvas，请升级你的浏览器。</canvas
      >
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  name: "canvasvideo",
  data() {
    return {
      websock: null,
      flvPlayer: null,
      canvas: {
        width: 1920,
        height: 969,
      },
      timer: null,
    };
  },
  created() {
    //   this.initWebSocket();
  },
  mounted() {
    // this.Axiosfun();

    this.$nextTick(() => {
      this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
      this.resizefun();
    });
    window.onresize = () => {
      this.$nextTick(() => {
        this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
        this.resizefun();
      });
    };
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    resizefun() {
      let ele = this.$refs.contentboxref;
      let sizedata = {
        width: ele.getBoundingClientRect().width,
        height: ele.getBoundingClientRect().height,
      };
      console.log("this.sizedata", sizedata);
      this.drawcanvas(sizedata);
    },

    drawcanvas(e) {
      let canvas = this.$refs.drawimg4;
      let ctx = canvas.getContext("2d");
      let videoref = document.getElementById("canvasElement");
      let width = e.width;
      let height = e.height;
      // let width = document.documentElement.clientWidth;
      // let height = document.documentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
      // ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      let [x0, y0] = [0, 0];
      ctx.clearRect(0, 0, canvas.width, canvas.height); //清除画布
      window.clearInterval(this.timer);
      this.timer = null;
      this.drawpic(ctx, videoref, canvas.width, canvas.height);
    },

    drawpic(ctx, videoref, width, height) {
      ctx.save();
      videoref.play().catch((value) => {});
      this.timer = setInterval(() => {
        // if (videoref.currentTime >= 3.8) {
        //   //视频时间在3.8s时停止
        //   videoref.pause();
        //   clearInterval(timer);
        // }
        ctx.drawImage(videoref, 0, 0, width, height); //绘制视频
      }, 1);
    },
    /////////
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://127.0.0.1:8080";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },

    // flv
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
        var canvasElement = document.getElementById("canvasElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url: VideoSrc, // "http://1011.hlsplay.aodianyun.com/demo/game.flv", //"http://20.20.0.16:8080/live?port=1935&app=myapp&stream=shenhua"//
        });
        this.flvPlayer.attachMediaElement(canvasElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
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
     CanvasfullScreen() {
      if (this.$refs.drawimg4.requestFullScreen) {
        this.$refs.drawimg4.requestFullScreen();
      } else if (this.$refs.drawimg4.mozRequestFullScreen) {
        this.$refs.drawimg4.mozRequestFullScreen();
      } else if (this.$refs.drawimg4.webkitRequestFullScreen) {
        this.$refs.drawimg4.webkitRequestFullScreen();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.CanvasvideoOutbox {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1360px;
  .ShowVideoDiv {
    width: 60%;
    height: 540px;
    object-fit: cover;
    background: rgba(150, 102, 69,.2);
    video {
      //   width: 100%;
      //   height: auto;
      //   object-fit: cover;
      display: none;
    }
    .drawimg4Style {
      border: 1px red solid;
    }
  }
}
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
