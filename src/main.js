import Vue from 'vue'
import App from './App'
// import router from './router'
import "babel-polyfill"
import router from 'router'
import fastclick from "fastclick"
import VueLazyload from "vue-lazyload"
import 'common/stylus/index.styl'

import {SET_PLAYHISTORY,SET_FAVORITELIST} from './store/mutation-types'
import {loadPlay,loadFavorite} from 'common/js/cache'
import {processSongsUrl} from 'common/js/song'


import store from 'store/index'

fastclick.attach(document.body)
Vue.use(VueLazyload,{
    loading:require("common/image/default.png")
})

const historySongs = loadPlay();
processSongsUrl(historySongs).then((songs) => {
	store.commit(SET_PLAYHISTORY,songs)
})
const favoriteSongs = loadFavorite();
processSongsUrl(favoriteSongs).then((songs) => {
	store.commit(SET_FAVORITELIST,songs)
})

/* eslint-disable no-new */
new Vue({
    el:'#app',
    router,
    store,
    render: h => h(App)
})
