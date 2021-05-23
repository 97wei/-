import {studentList,studentsCount} from '../../utils/request'
const state= {
     studentLists:[],
     page:1,
     size:3,
     count:1,
}
const mutations= {
    StudentListChange(state,arr){
         state.studentLists =arr
    },
    changeCount(state,num){
        state.count=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions={
    StudentListActions(context){
        var form = {
            size:context.state.size,
            page:context.state.page,
        }
        studentList(form).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page - 1;
                context.commit('changePage',p);
                context.dispatch("StudentListActions")
              }
            context.commit('StudentListChange',res.data.list)
        })
    },
    StudentNumActions(context){
        studentsCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    //获取页码数
      pageActions(context,page){
        context.commit('changePage',page)
      }
}
const getters= {
    studentList(state){
     return state.studentLists
    },
    studentsCount(state){
        return state.count
    }
}

export default{
    state,mutations,actions,getters,
    namespaced: true
}