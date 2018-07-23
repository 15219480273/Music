<template>
    <div class="findrecommend" v-if="reconmmend && reconmmend.findmusic">
        <swiper :options="swiperOption" ref="mySwiper" style="overflow:hidden">
            <!-- 要渲染的内容 -->
            <!-- JSON.stringify返回包含 JSON 文本的字符串。 -->
            <swiper-slide  v-for="item in reconmmend.findmusic.reconmmend.recommendImageList" :key="item.id" :songlist="JSON.stringify(item.songList)" style="float:left;position:relative">
                <img class="image" :src="item.src" alt="">
                <span class="type" :style="{backgroundColor:item.color}">{{item.type}}</span>
            </swiper-slide>  
            <!-- 这是轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination"></div>  
        </swiper>
        <div class="recommend-type">
            <div class="div-type">
                <i class="icon-type icon-fm"></i>
                <p class="title">私人FM</p>
            </div>
            <div class="div-type">
                <i class="icon-type icon-date"></i>
                <p class="title">每日听歌推荐</p>
            </div>
            <div class="div-type">
                <i class="icon-type icon-rank-list"></i>
                <p class="title">云音乐热歌榜</p>
            </div>
        </div>
        <findsheettitle></findsheettitle>
        <div class="recommend-list">
            <findsheetlist v-if="reconmmend" v-for="(sheet,sheetindex) in reconmmend.findmusic.reconmmend.recommendMinSheets" :key="sheetindex" :imagesrc="sheet.info[0].img_url" :showtoprighttips="sheet.showtoptips" :listpadding="sheet.padding" :toprighticonclass="sheet.toptipsclass" :toprighttitle="sheet.listencount" :showbottomtips="sheet.showbottomtips" :bottomtips="sheet.bottomtips" :showbottomtitle="sheet.showbottomtitle" :bottomtitle="sheet.bottomtitle" :listwidth="sheet.listwidth">

            </findsheetlist>
        </div>
    </div>
</template>
<script>
import store from '../../store'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import findsheettitle from './../findsheettitle/findsheettitle'
import findsheetlist from './../findsheetlist/findsheetlist'
export default {
    data(){
        return{
            swiperOption:{
               //这些属性是什么  需要了解
                // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true 
				autoplay: 1113000,
				grabCursor: true,
				setWrapperSize: true,
				autoHeight: true,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				mousewheelControl: true,
				autoplayDisableOnInteraction: false,
				observeParents: true,
				loop: true,
				onSlideChangeEnd: swiper => {
					// 这个位置放swiper的回调方法
					this.page = swiper.realIndex + 1
					this.index = swiper.realIndex
				},
                // onClick: swiper =>{
                //     const index = swiper.activeIndex
                // }
            }
        }
    },
    computed:{
        reconmmend(){
            return store.getters.getAllInfo
        },
        swiper(){//轮播插件自带用法
            return this.$refs.mySwiper.swiper
        }
    },
    methods:{

    },
    mounted(){

    },
    components: {
        swiper,
        swiperSlide,
        findsheettitle,
        findsheetlist
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.findrecommend
		position:fixed
		background:#fff
		overflow:auto
		top:86px
		bottom:46px
		left:0
		right:0
		z-index:11
		background:#fff
		-webkit-overflow-scrolling:touch
		a
			color:#666
			text-decoration:none
		.swiper-container
			position:relative
			.swiper-wrapper
				.swiper-slide
					.image
						width:100%
					.type
						position:absolute
						right:0
						bottom:20px
						padding:0 12px
						height:24px
						line-height:24px
						color:#fff
						font-size:14px
						font-weight:400
						border-radius:12px 0 0 12px
			.swiper-pagination
				position:absolute
				bottom:10px
				left:50%
				transform:translate(-50%, 0)
				
				.swiper-pagination-bullet
					margin:0 4px
					width:8px
					height:8px
					display:inline-block
					background:#aaa
					border-radius: 4px
					&.swiper-pagination-bullet-active
						width:14px
						background:$primarycolor!important
		.recommend-type
			width:100%
			height:90px
			display:flex
			align-items:center
			.div-type
				flex:1
				height:100%
				width:33.333333%
				font-size:0
				display:flex
				flex-direction: column
				justify-content: center
				align-items: center
				padding:0 10px
				.icon-type
					display:inline-block
					color:$primarycolor
					font-size:32px
					width:50px
					height:50px
					line-height:50px
					text-align:center
					border:1px solid $primarycolor
					border-radius:50%
				.title
					font-size:12px
					font-weight:400
					margin:0
					margin-top:8px
					text-overflow:ellipsis
					overflow:hidden
					white-space:nowrap
					width:100%
					text-align:center
		.recommend-list
			font-size:0
			// display:flex
</style>
