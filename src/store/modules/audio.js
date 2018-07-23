const audioInfo={
    state:{
        //audio元素
        audioelement: '',
        //audio信息
        audio: {
            id: 0,
            name: '',
            singer: '',
            url: '',
            img_url: '',
            type: '',
            lyric: ''
        },
        //是否显示歌单列表
        showSongSheet:false,
        //当前音乐的index索引
        currentIndex: 0,
        //歌词信息 索引
        lyricIndex:-1,
        // 是否正在播放
        playing: false,
        //全部音乐信息 包括歌单等等
        musicAllList:[],
        //音乐播放信息
        musicList: [],
        //音乐歌单信息
        musicSheetList:[],
        // 正在播放的音乐歌单类型，用于区分正在播放的歌曲是存在哪一个歌单的   默认为-1  表示所有
        musicSheetType: '-1',
        //播放类型   1是循环播放  2是单曲循环  3是随机播放
        playType: 1,
        //是否显示音乐播放详情页
        showMusicDetail: false,
        //当前播放的时间
        currentTime: 0,
        //音乐的播放时长
        musicDuration: 0,
        // 音乐是否正在加载
        musicLoadStart: false
    },
    getters:{
        //获取audio元素
        getAudioElement: state => state.audioelement,
        //获取audio信息
        getAudioInfo: state => state.audio,
        //获取当前播放的索引
        getCurrentIndex: state => state.currentIndex,
        //获取音乐全部信息
        getMusicAllList: state => state.musicAllList,
        //获取歌单信息
        getMusicSheetList:state => state.musicSheetList,
        //获取歌单列表的显示状态
        getIsShowSongSheet: state => state.showSongSheet,
        // 获取当前音乐详细信息
        getCurrentMusic: state => state.musicList[state.currentIndex],
        // 获取音乐播放列表信息
        getMusicList: state => state.musicList,
        //获取播放的循环类型
        getMusicPlayType: state => state.playType,
        //获取是否显示音乐播放详情页
        getMusicDetail: state => state.showMusicDetail,
        //获取音乐是否正在播放
        getIsPlaying: state => state.playing,
        // 获取当前的播放进度
        getCurrentTime: state => state.currentTime,
        //获取音乐的播放时长
        getMusicDuration: state => state.musicDuration,
        // 音乐开始加载
        getIsLoadStart: state => state.musicLoadStart,
        //获取音乐歌单的播放类型
        getMusicSheetType: state => state.musicSheetType,
        // 获取音乐歌词当前播放的索引
        getLyricIndex: state => state.lyricIndex,
        // 获取音乐歌单类型
		getMusiSheetType: state => state.musicSheetType,
    },
    mutations:{
        //设置音乐歌单类型
        setMusiSheetType (state, obj) {
            state.musicSheetType = obj.sheettype
        },
        // 播放设置
        play (state) {
            state.playing = true
            state.audioelement.play()
        },
        //控制音乐播放暂停
        togglePlay (state) {
            if(state.playing){
                state.playing = false
                state.audioelement.pause()//自带方法 控制audio的停止
            }else{
                state.playing = true
                state.audioelement.play()//自带方法 控制audio的播放
            }
        },
        //插入所有音乐信息
        setMusicAllList(state,obj){
            state.musicAllList = obj
            state.musicList = obj.all
        },
        // 插入播放列表信息
        setMusicList(state,obj){
            state.musicList = obj.list
        },
        //设置是否显示歌单信息
        setIsShowSongSheet(state,obj){
            state.showSongSheet = obj.isShow
        },
        //设置音乐播放器的歌单列表数据
        setMusicSheetList(state,obj){
            state.musicSheetList = obj.data
        },
        // 获取音乐元素 Dom  储存
        setAudioElement (state, ele){
            state.audioelement = ele
        },
        // 设置歌曲循环方式
        setPlayType (state) {
            if(state.playType === 3){
                state.playType = 1
            } else {
                state.playType ++
            }
        },
        //下一首
        playNext (state){
            // 当前播放的索引+1
            state.currentIndex ++
            const length = state.musicList.length
            if(state.currentIndex >= length){
                // 超出范围回到第一首
                state.currentIndex = 0
            }
            state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
            state.playing = true
            state.audioelement.load()
            state.audioelement.play()
        },
        //上一首
        playPrev (state){
            // 当前播放的索引+1
            state.currentIndex --
            const length = state.musicList.length
            if(state.currentIndex < 0){
                // 超出范围回到第一首
                state.currentIndex = length - 1
            }
            state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
            state.playing = true
            state.audioelement.load()
            state.audioelement.play()
        },
        //设置歌曲播放结束后下一首的播放
        playEnded (state){
            let type = state.playType
            if(type === 1) {
                state.currentIndex ++
                const length = state.musicList.length
                if(state.currentIndex >= length){
                    state.currentIndex = 0
                }
                state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
                state.playing = true
                state.audioelement.load()
                state.audioelement.play()
            }
            if(type === 2) {
                // 把播放进度清0
                state.audioelement.currentTime = 0
                state.playing = true
                state.audioelement.play()
            }
            if(type === 3) {
                const length = state.musicList.length
                state.currentIndex = Math.floor(Math.random() * length)
                sate.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
                state.playing = true
                state.audioelement.load()
                state.audioelement.play()
            }
        },
        //设置当前的播放索引
        playIndex (state, obj){
            state.currentIndex = obj.index
            state.audioelement.setAttribute('src',state.musicList[state.currentIndex].url)
            state.playing = true
            state.audioelement.load()
            state.audioelement.play()
        },
        //设置是否显示播放详情页
        setMusicDetail (state, obj){
            state.showMusicDetail = obj.isShow
        },
        //设置播放进度（时间）
        setCurrentTime (state, obj) {
            state.currentTime = obj.time
        },
        // 设置歌曲的总时长
        setMusicDuration (state, obj) {
            state.musicDuration = obj.duration
        },
        // 设置音乐是否正在加载
        setMusicLoadStart (state, obj){
            state.musicLoadStart = obj.isloadstart
        },
        // 设置音乐歌词当前播放的索引
        setLyricIndex (state, obj){
            state.lyricIndex = obj.index
        }
    },
    actions:{
        set_AudioElement ({commit}, ele){
            commit('setAudioElement', ele)
        },
        set_MusicAllList({commit},obj){
            commit('setMusicAllList',obj)
        },
        set_MusicSheetList({commit},obj){
            commit('setMusicSheetList',obj)
        },
        set_PlayType ({commit}) {
            commit('setPlayType')
        },
        play_Index ({commit}, obj) {
            commit('playIndex', obj)
        },
        //控制是否展示播放音乐详细页
        set_MusicDetail ({commit}, obj) {
            commit('setMusicDetail' , obj)
        },
        set_MusicList ({commmit}, obj) {
            commit('setMusicList', obj)
        },
        // 下一首
        play_Next ({commit}) {
            commit('playNext')
        },
        // 上一首
        play_Prev ({commit}) {
            commit('playPrev')
        },
        //更新播放进度时间
        set_CurrentTime ({commit}, obj){
            commit('setCurrentTime', obj)
        },
        // 设置总时长
        set_MusicDuration ({commit}, obj){
            commit('setMusicDuration', obj)
        },
        // 当前音频播放结束时
        play_Ended ({commit}) {
            commit('playEnded')
        }
    }
}
export default audioInfo