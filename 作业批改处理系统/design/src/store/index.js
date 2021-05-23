import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {state,mutations,getters} from './mutation'
import actions from './action'
import adminList from './module/adminList'
import classList from './module/classList'
import courseList from './module/courseList'
import teacherList from './module/teacherList'
import studentList from './module/studentList'
import noticeList  from './module/noticeList'
import workList  from './module/workList'
import PgzyList  from './module/PgzyList'
import stuCkzy  from './module/stuCkzy'
import grade  from './module/grade'

const store = new Vuex.Store({
  // 存储数据
  state,
  // 操作状态数据
  mutations,
  // 对接组件中的操作方法
  actions,
  // 获取数据并返回给组件
  getters,
  modules:{
    adminList,
    classList,
    courseList,
    teacherList,
    studentList,
    noticeList,
    workList,
    PgzyList,
    stuCkzy,
    grade
  }
})

export default store
