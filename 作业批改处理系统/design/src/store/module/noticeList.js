import {getNotice} from '../../utils/request'
const state = {
  noticeList:[],//初始化数据
}

// 操作数据
const mutations = {
    changeNoticeList(state,arr){
    state.noticeList = arr
  }
}

const actions = {
    noticeListActions(context){
    // 发起菜单列表请求
    getNotice().then(res=>{
      context.commit('changeNoticeList',res.data.list);
    })
  }
}
const getters = {
    NoticeList(state){
     return state.noticeList
}
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
