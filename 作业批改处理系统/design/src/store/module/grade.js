import {gradeList} from '../../utils/request'
const state= {
     gradeLists:[],
  
}
const mutations= {
    changegradeList(state,arr){
        state.gradeLists=arr
    }
}
const actions={
    gradeListActions(context,e){
        gradeList({e}).then(res=>{
            context.commit('changegradeList',res.data.list)
        })
    }
}
const getters= {
   gradelist(state){
    // console.log(this.state.gradeLists);
       return  state.gradeLists
   }
}

export default{
    state,mutations,actions,getters,
    namespaced: true
}