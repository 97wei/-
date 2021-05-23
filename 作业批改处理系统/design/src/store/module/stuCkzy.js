import {ckzyList} from  '../../utils/request'
const state={
    ckzyLists:[]
}
const mutations={
    changeworkList(state,arr){
        state.ckzyLists=arr
    }
}
const actions={
    ckzyListActions(context,Cclass){
        ckzyList({Cclass}).then(res=>{
            context.commit('changeworkList',res.data.list)
        })
    }
}
const getters={
    ckzyLists(state){
        return state.ckzyLists
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}