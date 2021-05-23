import {courseList,courseCount,courseListAll} from '../../utils/request'
const state= {
    courseLists:[],
     page:1,
     size:5,
     count:1,
}
const mutations= {
    CourseListChange(state,arr){
         state.courseLists =arr
    },
    changeCount(state,num){
        state.count=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions={
    CourseListActions(context,pageall){
        if(pageall==1){
            courseListAll().then(res=>{
                context.commit('CourseListChange',res.data.list)
            })
        }else{
            var form = {
                size:context.state.size,
                page:context.state.page,
            }
            courseList(form).then(res=>{
                if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                    var p = context.state.page - 1;
                    context.commit('changePage',p);
                    context.dispatch("CourseListActions")
                  }
                context.commit('CourseListChange',res.data.list)
            })
        } 
    },
    CourseNumActions(context){
        courseCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    //获取页码数
      pageActions(context,page){
        context.commit('changePage',page)
      }
}
const getters= {
    courseLists(state){
     return state.courseLists
    },
    courseCount(state){
        return state.count
    }
}

export default{
    state,mutations,actions,getters,
    namespaced: true
}