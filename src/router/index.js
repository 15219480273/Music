import Vue from 'vue'
import Router from 'vue-router'
import Mymusic from '@/components/mymusic/mymusic'
import FindMusic from '@/components/findmusic/findmusic'
import Findrecommend from '@/components/findrecommend/findrecommend'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mymusic'
    },
    {
      //顶部三个按钮的第一个  相当于首页
      path : '/mymusic',
      component : Mymusic
    },
    // ------------------- 疑问：路由的切换 对应显示的组件加载的所在的层级  是同一个层级还是？ -----------------------
    {
      // 顶部三个按钮的第二个
      path : '/findmusic',
      component : FindMusic,
      // 子路由  菜单
      children:[
        {
        //第二页的第一个
        path : '',
        redirect : '/findmusic/findrecommend'
      },{
        //findmusic  第一个
        path : '/findmusic/findrecommend',
        component : Findrecommend
      }
    ]
    }
  ]
})
