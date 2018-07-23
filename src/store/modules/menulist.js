
const SHOW_MENU = true
const HIDE_MENU = false
const menulist = {
    state:{
        isShow:false,
        detail:{
            title:'title:by waiting',
            content:[

            ]
        }
    },
    mutations:{
        showMenu(state,obj){
            state.detail = obj == undefined ? state.detail : obj.amount
            state.isShow = SHOW_MENU
        },
        hideMenu(state){
            state.detail = {}
            state.isShow = HIDE_MENU
        }
    },
    actions:{
        showMenuList({commit},obj){
            commit('showMenu',obj)
        },
        hideMenuList({commit}){
            commit('hideMenu')
        }
    },
    getters:{
        getIsShow   :  state => state.isShow,
        getShowMenuInfo : state => state.detail
    }
}
export default menulist