import {classList,classCount,classListAll} from '../../utils/request'
const state= {
    classLists:[],
     page:1,
     size:5,
     count:1,
}
const mutations= {
    ClassListChange(state,arr){
         state.classLists =arr
    },
    changeCount(state,num){
        state.count=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions={
    classListActions(context,pageall){
        if(pageall==1){
            console.log(pageall);
            classListAll().then(res=>{
            context.commit('ClassListChange',res.data.list)
          })
        }else{
            var form = {
                size:context.state.size,
                page:context.state.page,
            }
            classList(form).then(res=>{
                if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                    var p = context.state.page - 1;
                    context.commit('changePage',p);
                    context.dispatch("classListActions")
                  }
                context.commit('ClassListChange',res.data.list)
            })
        }
    },
    ClassNumActions(context){
        classCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    //获取页码数
      pageActions(context,page){
        context.commit('changePage',page)
      }
}
const getters= {
    classLists(state){
     return state.classLists
    },
    classCount(state){
        return state.count
    }
}

export default{
    state,mutations,actions,getters,
    namespaced: true
}