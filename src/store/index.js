import Vue from 'vue'
import Vuex from 'vuex'
import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      allInfo: []
    },
    getters:{
        // 获取所有歌曲信息
        getAllInfo: state => state.allInfo
        //获取推荐歌单信息
        // getFindMusic: state => state.musocAllList.findmusic
    },
    mutations:{
        setAllInfo (state, obj) {
            state.allInfo = obj
        }
    },
    actions:{
        set_AllInfo ({commit},obj) {
            commit('setAllInfo',obj)
        }
    },
    modules: {
        sideBar: Sidebar,
        audioInfo:AudioInfo,
        menuList:MenuList,
        musicList:MusicList
    }    
})    
export default store