<template>
    <div class="header">
        <div class="header-warpper">
            <i class="menu icon-menu" @click="showMueu"></i>
            <div class="centermenu" @click="hideMenu">
                <router-link tag="i" to="/mymusic">
                    <i class="music icon-music" :class= "selectIndex===0?'active':''"></i><!-- 这里的:class= "selectIndex===0?'active':''"不知道拿来干嘛的 -->
                </router-link><!-- 这个当前页的变暗样式显示好像会自动根据路由变化而变化 -->
                <router-link tag="i" to="/findmusic">
                    <i class="find icon-wangyi"></i>
                </router-link>
                <router-link tag="i" to="/community">
                    <i class="community icon-community"></i>
                </router-link>
            </div>
            <i class="search icon-search"></i>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import store from '../../store'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props:{
      index:{
          type:Number,
          default:0
      },
      showMenu:{
          type:Boolean,
          default: false
      }
  },
  data(){
      return{
        selectIndex: this.index,
        isShowMenu: this.showMenu
      }
  },
  methods:{
    showMueu(){
        store.dispatch({//修改侧边栏的显示隐藏
            type:'showSideBar'//执行vuex 的store里面的（引入的sidebar）里面action下的showSideBar方法
        })
    },
    hideMenu(){
        store.dispatch({//执行vuex hideSideBar
            type:'hideSideBar'
        })
    },
    ...mapMutations({
		// adds: 'increment'
	}),
    ...mapActions({}),
  },
  components:{

  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.header
		position:fixed
		top:0
		left:0
		right:0
		height:50px
		z-index:10
		background:$primarycolor
		.header-warpper
			height:100%
			background:$primarycolor
			display:flex
			align-items:center
			justify-content:space-between
			.icon-menu,.icon-search
				color:#fff
				font-size:26px
				padding:10px 15px
			.centermenu
				font-size:24px
				i
					margin:0 5px
					color:#eee
					&.router-link-active
						i
							color:$link_active
					&.active
						color:#4AE0A8

					&.music
						font-size:22px
			.counter
				position:absolute
				background:green
				width:600px
				height:150px
				color:#fff
				font-size:20px
				top:0
				left:120px
				p
					height:30px
					line-height:30px

</style>
