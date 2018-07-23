<template>
    <div class="musicsheet">
        <div class="title" @click="toggleSheets($event)">
            <i class="toggle icon-down" ref="toggleicon"></i>
            <div class="detail">
                <span class="name">{{data_item.name}}</span>
                <span class="count">({{data_item.count}})</span>
				<!-- 整个歌单的设置按钮 -->
                <i class="setting icon-setting" @click.stop="showSheetMenu(data_item.name)"></i>
            </div>
        </div>
        <div v-show="showSheets" v-for="(list,listindex) in data_item.detail" :key="listindex" @click.stop="showSongSheet(list)">
        <!-- .stop修饰符是用来阻止冒泡事件的发生的。 -->
            <div class="content">
                <img class="sheetimg" :src="list.info[0].img_url" alt="">
                <div class="detail">
                    <p class="name">{{list.name}}</p>
                    <p class="count">{{list.count}}首歌曲</p>
					<!-- 点点点  图标 -->
                    <i class="setting icon-list-circle" @click.stop="showMenu(list.name)"></i>
					<!-- 如果不是最后一个  就显示边框 -->
                    <p v-show="data_item.detail.length != listindex+1" class="border-1px"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from './../../store'
export default {
    props:{
        item:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    data(){
        return {
            showSheets:true,
            data_item:{},
            data_index:{}
        }
    },
    methods:{
		// 收起  展开
        toggleSheets (event){
            this.$refs.toggleicon.style.transform = this.showSheets ? 'rotate(-90deg) translate3d(50%, 0, 0)' : 'rotate(0) translate3d(0, -50%, 0)'
            this.showSheets = !this.showSheets
        },
        /*删除整个歌单 */
        showSheetMenu(name){
			store.dispatch({
				type:'showMenuList',
				amount:{
					title:`${name}`,//为什么用这个格式传
					content:[{
						name:'删除',
						iconinfo:'icon-delete',
						count:'none',
						bgcolor:'#fff'
					}]
				}	
			})
        },
        /*操作歌单下的分类列表（例如 我喜欢的音乐） */
        showMenu(name){
			store.dispatch({
				type:'showMenuList',
				amount:{
					title:`歌单:${name}`,
					content:[
						{
							name:'分享',
							iconinfo:'icon-share',
							count:'none',
							bgcolor:'#fff'
						},
						{
							name:'编辑',
							iconinfo:'icon-edit',
							count:'none',
							bgcolor:'#fff'
						},
						{
							name:'删除',
							iconinfo:'icon-delete',
							count:'none',
							bgcolor:'#fff'
						}
					]
				}
			})
		},
		showSongSheet(data){
			//Action 通过 store.dispatch 方法触发：
			store.dispatch({
				type:'set_MusicSheetList',
				data:data
			})
			//提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
			store.commit({
				type:'setIsShowSongSheet',
				isShow:true
			})
		}
    },
    mounted(){
        this.data_item = this.item
        this.data_index = this.index
        console.log(this.data_item);
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/stylus/border-1px/index.styl"
	@import "./../../common/stylus/global.styl"
	.musicsheet
		height:auto
		width:100%
		background:#f3f3f3
		.title
			display:block
			height:28px
			line-height:28px
			background:#e1e1e1
			position:relative
			.toggle
				position:absolute
				top:50%
				left:10px
				font-size:14px
				color:#666
				transition:all 0.5s;
				transform:translate3d(0,-50%,0)
			.detail
				margin-left:35px
				color:#666
				.name
					display:inline-block
					vertical-align:middle
					font-weight:400
					font-size:12px
				.count
					display:inline-block
					vertical-align:middle
					font-weight:300
					font-size:12px
				.setting
					font-size:16px
					position:absolute
					width: 28px;
					line-height: 28px;
					text-align: center;
					height: 28px;
					top:50%
					right:10px
					transform:translate(0,-50%)
		.content
			height:60px
			width:100%
			box-sizing:border-box
			position:relative
			display:flex
			&:active
				background:$list_active
			.sheetimg
				margin:5px
				width:50px
				height:50px
				flex:0 0 50px
			.detail
				height:60px
				padding-left:5px
				flex:1 1 auto
				box-sizing:border-box
				position:relative
				.name,.count
					width:80%
					text-overflow:ellipsis
					overflow:hidden
					white-space:nowrap
					margin:0
					height:25px
					line-height:25px
				.name
					margin-top:5px
					color:#333
					font-size:14px
				.count
					margin-bottom:5px
					font-weight:400
					font-size:12px
					color:#666;
				.border-1px
					margin:0
					border-1px($border_1px)
				.setting
					position:absolute
					right:5px
					width:36px
					height:36px
					line-height:36px
					text-align:center
					top:50%
					color:$icon_color
					transform:translate3d(0,-50%,0)
					&:active
						background:$list_active
				
</style>
