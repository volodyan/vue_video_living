import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.prototype.$axios = Axios

import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer,
    /* {
  options: global default options,
  events: global videojs events
} */
)

import videojs from 'video.js'

// videojs plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
    // something...
}
videojs.registerPlugin('examplePlugin', ExamplePlugin)

// videojs language
videojs.addLanguage('es', {
    Pause: '暂停',
    // something...
})

// more videojs api...

// vue component...

Vue.config.productionTip = false

window.addEventListener("message", (e) => {

    if (e.source != window.parent) return;

    console.log("我是子组件，我接收到父级数据-------PostMessage", e.data);
    if (!!e) {
        // window.removeEventListener("message", () => {
        // });
    }
    // window.parent.postMessage("我是子组件，我接收到父级数据", "*");
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')