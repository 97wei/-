import {teacherList} from '../../utils/request'
const state = {
  teacherList:[],//初始化数据
}

// 操作数据
const mutations = {
    changeteacherList(state,arr){
    state.teacherList = arr
  }
}

const actions = {
    teacherListActions(context){
    // 发起菜单列表请求
    teacherList().then(res=>{
      context.commit('changeteacherList',res.data.list);
    })
  }
}
const getters = {
  teacherList(state){
     return state.teacherList
}
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
