import Vue from 'vue'
import Vuex from 'vuex'
import Bus from "@/utils/bus.js";

Vue.use(Vuex)

export default new Vuex.Store({
    getters: {
        GetWindowParentPostMessage: state => state.WindowParentPostMessage
    },
    state: {
        WindowParentPostMessage: 22222
    },
    mutations: {
        set_WindowParentPostMessage: (state, data) => state.WindowParentPostMessage = data,
    },
    actions: {
        async WindowParentPostMessageFun({ commit }, data) {
            await commit("set_WindowParentPostMessage", data)
            await Bus.$emit("WindowParentPostMessageTo", data)
        }
    },
    modules: {}
})