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
      <canvas ref="canvasRef" class="canvasStyle"
        >你的浏览器不支持 canvas，请升级你的浏览器。</canvas
      >
    </div>
  </div>
</template>

<script>
import Bus from "@/utils/bus.js";
import flvjs from "flv.js";
import { mapGetters } from "vuex";
export default {
  name: "canvasvideo",
  data() {
    return {
      websock: null,
      flvPlayer: null,
      WebsocketUrl: "",
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      GetWindowParentPostMessage: "GetWindowParentPostMessage",
    }),
  },
  // beforeDestroy() {
  //  window.removeEventListener("message", this.ListenerFun);
  // },
  // watch: {
  //   GetWindowParentPostMessage: {
  //     handler(newName, oldName) {
  //      console.log("newName, oldName", newName, oldName,GetWindowParentPostMessage);
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  mounted() {
    // window.onload = () => {
    //   window.addEventListener("message", this.ListenerFun);
    // };
    Bus.$on("WindowParentPostMessageTo", (e) => {
      alert(123456)
      console.log("WindowParentPostMessageTo", e);
    });
    this.Axiosfun();
    // this.InitPalyFun("http://1011.hlsplay.aodianyun.com/demo/game.flv");
    //this.InitPalyFun("http://192.168.1.130:9090/live?port=1935&app=myapp&stream=shiyuan");
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    // ListenerFun(e) {
    //   if (e.source != window.parent) return;
    //   if (e.data.IsShowWaterworksIndex) {
    //     console.log("我是子组件，我接收到父级数据-------PostMessage", e);
    //     window.parent.postMessage(
    //       { Name: "我是子组件，我接收到父级数据", Status: true },
    //       "*"
    //     );

    //     // Bus.$emit("WindowParentPostMessageTo", e.data.WaterworksIndex);
    //     // store.dispatch("WindowParentPostMessageFun", e.data.WaterworksIndex);
    //   }
    // },
    // flv
    Axiosfun() {
      this.$axios.get("data/video.json").then((res) => {
        console.log(
          "Axiosfun33333",
          res,
          window.location.host,
          this.GetWindowParentPostMessage
        );
        this.WebsocketUrl = res.data.WebsocketUrl;
        let host = window.location.host;
        this.InitPalyFun(res.data.VideoSrc);
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
        this.initWebSocket();

        // this.DrawCavas([
        //   { x1: 0.323, y1: 0.432, x2: 0.364, y2: 0.622 },
        //   { x1: 0.211, y1: 0.278, x2: 0.249, y2: 0.451 },
        //   { x1: 0.762, y1: 0.393, x2: 0.819, y2: 0.639 },
        //   { x1: 0.128, y1: 0.559, x2: 0.184, y2: 0.811 },
        //   { x1: 0.724, y1: 0.805, x2: 0.799, y2: 0.996 },
        //   { x1: 0.848, y1: 0.615, x2: 0.907, y2: 0.866 },
        //   { x1: 0.18, y1: 0.563, x2: 0.236, y2: 0.828 },
        //   { x1: 0.612, y1: 0.069, x2: 0.645, y2: 0.199 },
        //   { x1: 0.376, y1: 0.119, x2: 0.404, y2: 0.23 },
        //   { x1: 0.332, y1: 0.158, x2: 0.367, y2: 0.269 },
        //   { x1: 0.553, y1: 0.005, x2: 0.576, y2: 0.112 },
        //   { x1: 0.776, y1: 0.13, x2: 0.815, y2: 0.255 },
        //   { x1: 0.062, y1: 0.293, x2: 0.094, y2: 0.465 },
        // ]);
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
    DrawCavas(bodydata) {
      let contentboxrefSize = this.$refs.contentboxref;
      console.log("contentboxrefSize", contentboxrefSize);
      var canvas = this.$refs.canvasRef;
      canvas.width = contentboxrefSize.getBoundingClientRect().width;
      canvas.height = contentboxrefSize.getBoundingClientRect().height;
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!bodydata) return;
      console.log("bodydata", bodydata);
      bodydata.forEach((rect) => {
        context.strokeStyle = "#a64ceb";
        context.strokeWidth = "2px";
        context.strokeRect(
          canvas.width * rect.x1,
          canvas.height * rect.y1,
          canvas.width * rect.x2 - canvas.width * rect.x1,
          canvas.height * rect.y2 - canvas.height * rect.y1
        );

        // context.font = "11px Helvetica";
        //context.fillStyle = "red";
        //context.textBaseline = "hanging";
        // context.fillText(`x1:${rect.x1},x2:${rect.x2},y1:${rect.y1},y2:${rect.y2}`, canvas.width * rect.x1+(canvas.width * rect.x2 - canvas.width * rect.x1)/2, canvas.width * rect.y1+(canvas.height * rect.y2 - canvas.height * rect.y1)/2);
        //context.fillText(`x1:${(canvas.width * rect.x1).toFixed(2)},y1:${(canvas.height * rect.y1).toFixed(2)},x2:${(canvas.width * rect.x2).toFixed(2)},y2:${(canvas.height * rect.y2).toFixed(2)}`, canvas.width * rect.x1+(canvas.width * rect.x2 - canvas.width * rect.x1)/2, canvas.height * rect.y1+(canvas.height * rect.y2 - canvas.height * rect.y1)/2);

        // context.fillText(`x1:${rect.x1},x2:${rect.x2},y1:${rect.y1},y2:${rect.y2}`);
        // context.fillText(
        //  `width:${canvas.width * rect.x2 - canvas.width * rect.x1},height:${canvas.height * rect.y2 - canvas.height * rect.y1}`
        // );
      });
    },
    ClearCanvas() {
      var canvas = this.$refs.canvasRef;
      let contentboxrefSize = this.$refs.contentboxref;
      canvas.width = contentboxrefSize.getBoundingClientRect().width;
      canvas.height = contentboxrefSize.getBoundingClientRect().height;
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    ////websocket

    initWebSocket() {
      //初始化weosocket
      const wsuri = this.WebsocketUrl;
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
      if (e.data !== "None") {
        console.log("JSON.parse(e.data)", JSON.parse(e.data));
        const redata = JSON.parse(e.data);

        this.DrawCavas(redata);
      } else {
        this.ClearCanvas();
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
      this.ClearCanvas();
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
  height: 560px;
  .ShowVideoDiv {
    width: 480px;
    height: 270px;
    object-fit: cover;
    //background: rgba(150, 102, 69, 0.2);
    position: relative;
    video {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    #canvasElement {
      position: absolute;
      top: 0;
      left: 0;
    }
    .canvasStyle {
      position: absolute;
      top: 0;
      left: 0;
      // background: #333;
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
