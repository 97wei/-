import {pgzyListCount,pgzyList,pgzySearch} from '../../utils/request'
const state= {
     pgzylists:[],
     page:1,
     size:5,
     count:1,
}
const mutations= {
    PgzyListChange(state,arr){
         state.pgzylists =arr
    },
    changeCount(state,num){
        state.count=num
    },
    changePage(state,page){
        state.page=page
    },
    SearchListChange(state,arr){
        state.pgzylists =arr,
        state.count = 1
   },
}
const actions={
    PgzylistActions(context,Cclass){
        var form = {
            size:context.state.size,
            page:context.state.page,
            Cclass:Cclass
        }
        console.log(form);
        pgzyList(form).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page - 1;
                context.commit('changePage',p);
                context.dispatch("PgzylistActions")
              }
            context.commit('PgzyListChange',res.data.list)
        })
    },
    SearchListActions(context,e){
        console.log(e);
        pgzySearch({e}).then(res=>{
            console.log(res.data.list);
            context.commit('SearchListChange',res.data.list)
        })
    },
    PgzyCountActions(context,Cclass){
        pgzyListCount({Cclass}).then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    //获取页码数
    PgzyCurrentPagetActions(context,page){
        context.commit('changePage',page)
      }
}
const getters= {
    pgzyList(state){
     return state.pgzylists
    },
    pgzyCount(state){
        return state.count
    }
}

export default{
    state,mutations,actions,getters,
    namespaced: true
}