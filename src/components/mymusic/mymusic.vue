<template>
    <div class="mymusic">
        <type-list name="我的音乐" iconinfo="icon-music" count="28" :playing="true">
            <!--    这里的 :playing="true"  为什么要:绑定数据（猜测是子组件接受的类型为Boolean就必须绑定数据的方式来传递）       -->
        </type-list>
        <type-list name="最近播放" iconinfo="icon-zuijinplay" count="18"></type-list>
        <type-list name="我的电台" iconinfo="icon-diantai" count="2"></type-list>
        <type-list name="我的收藏" iconinfo="icon-collect" count="1"></type-list>
        <!-- 歌单 -->
        <musicsheet v-for="(item,index) in items" :item="item" :index="index" :key="item.id"></musicsheet>
        <!-- 这些数据绑定 组件之间通信  什么时候需要：什么时候不需要？？？？？？？？？？   -->
        <!--底部显示的菜单列表    -->
        <menu-list></menu-list>

    </div>
</template>
<script>
import typelist from '../typelist/typelist.vue'
import menulist from '../menulist/menulist.vue'
import musicsheet from '../musicsheet/musicsheet.vue'
export default {
    computed:{
        items(){
            return this.$store.getters.getMusicAllList.sheets
        }
    },
    created(){
        // console.log(items)
    },
    components:{
        'type-list':typelist,
        'menu-list':menulist,
         musicsheet
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/stylus/global.styl"
	.mymusic
		position:fixed
		background:#fff
		overflow:auto
		top:50px
		bottom:46px
		left:0
		right:0
		z-index:9
		-webkit-overflow-scrolling:touch
</style>

