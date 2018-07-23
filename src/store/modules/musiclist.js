const SHOW_MUSIC_LIST = true
const HIDE_MUSIC_LIST = false
const musiclist = {
    state:{
        scrollTop: 0,
        refs: '',
        isShow: false
    },
    mutations: {
        showMusic (state) {
            state.isShow = SHOW_MUSIC_LIST
        },
        hideMusic (state) {
            state.isShow = HIDE_MUSIC_LIST
        },
        //设置距离顶部的滚动距离
        setScrollTop (state, scrollTop){
            setTimeout(function(){
                state.refs.scrollTop = scrollTop
            }, 100)
        },
        // 获取 绑定元素 方便操作
        setRefScrollMusicList (state, ele){
            state.refs = ele
        }
    },
    actions: {
        showMusicList ({commit}) {
            commit('showMusic')
        },
        hideMusicList ({commit}){
            commit('hideMusic')
        },
        set_ScrollTop ({commit}, obj){
            commit('setScrollTop', obj.scrollTop)
        },
        set_RefScrollMusicList ({commit}, obj){
            commit('setRefScrollMusicList',obj.refs)
        }
    },
    getters:{
        // 获取展示状态
        getIsShowMusicList: state => state.isShow,
        // 获取列表的scrolltop
        getScrollTop: state => state.scrollTop
    }
}
export default musiclist