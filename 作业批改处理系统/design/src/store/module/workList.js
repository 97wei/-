import {workList} from  '../../utils/request'
const state={
    workLists:[]
}
const mutations={
    changeworkList(state,arr){
        state.workLists=arr
    }
}
const actions={
    workListActions(context,sktea){
        workList({sktea}).then(res=>{
            context.commit('changeworkList',res.data.list)
        })
    }
}
const getters={
    workLists(state){
        return state.workLists
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}