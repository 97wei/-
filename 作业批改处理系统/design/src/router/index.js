import Vue from 'vue'
import Router from 'vue-router'
import {warningAlert} from '../utils/alert'
Vue.use(Router)
const login = () => import('../pages/login')
const TeaLogin = () => import('../pages/login/components/teacher.vue')
const StuLogin = () => import('../pages/login/components/students.vue')
const AdminLogin = () => import('../pages/login/components/admin.vue')

// 管理员路由组件
const adminIndex = () => import('../pages/admin/index/index')
const modify=()=>import('../pages/admin/modify-Pas/modify.vue')
const adminInfo=()=>import('../pages/admin/AdminInfo/AdminInfo.vue')
const classInfo=()=>import('../pages/admin/ClassInfo/ClassInfo.vue')
const courseInfo=()=>import('../pages/admin/CourseInfo/CourseInfo.vue')

const teaInfo=()=>import('../pages/admin/TeaInfo/TeaInfo.vue')
const stuInfo=()=>import('../pages/admin/StuInfo/StuInfo.vue')
const notice=()=>import('../pages/admin/notice/notice.vue')
const ad=()=>import('../pages/admin/notice/ad.vue')


// 教师路由组件
const teacherIndex=()=>import('../pages/teacher/index')
const Teamodify=()=>import('../pages/teacher/modify-Pas/modify.vue')
const bzzy=()=>import('../pages/teacher/bzzy/bzzy.vue')
const pgzy=()=>import('../pages/teacher/pgzy/pgzy.vue')
const jxzl=()=>import('../pages/teacher/jxzl/jxzl.vue')
const Teanotice=()=>import('../pages/teacher/notice/notice.vue')
const Teaad=()=>import('../pages/teacher/notice/ad.vue')

//学生路由组件
const studentIndex=()=>import('../pages/student/index')
const stumodify=()=>import('../pages/student/modify-Pas/modify.vue')
const ckzy=()=>import('../pages/student/ckzy/ckzy.vue')
const ckcj=()=>import('../pages/student/ckcj/ckcj.vue')
const stuJxzl=()=>import('../pages/student/jxzl/jxzl.vue')
const Stuad=()=>import('../pages/student/notice/ad.vue')
const Stunotice=()=>import('../pages/student/notice/notice.vue')

const router =  new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component:login,
      redirect:'/student',
      children:[
        {
          path: 'teacher',
          name: '学生登录',
          component:TeaLogin,
        },
        {
          path: 'student',
          name: '教师登录',
          component:StuLogin,
        },
        {
          path: 'admin',
          name: '管理员登录',
          component:AdminLogin,
        },
      ],
    },
    {
      path: '/adminIndex',
      name: '管理员',
      component:adminIndex,
      redirect: '/adminIndex/ad',
      children:[
        {
          path: 'ad',
          name: '公告详情',
          component:ad,
        },
        {
          path: 'modify',
          name: '密码修改',
          component:modify,
        },
        {
          path: 'adminInfo',
          name: '管理员信息',
          component:adminInfo,
        },
        {
          path: 'classInfo',
          name: '班级信息',
          component:classInfo,
        },
        {
          path: 'courseInfo',
          name: '课程信息',
          component:courseInfo,
        },
        {
          path: 'teaInfo',
          name: '教师信息',
          component:teaInfo,
        },
        {
          path: 'stuInfo',
          name: '学生信息',
          component:stuInfo,
        },
        {
          path: 'notice',
          name: '公告栏',
          component:notice,
        }
      ]
    },
    {
      path: '/teacherIndex',
      name: '公告详情',
      component:teacherIndex,
      redirect: '/teacherIndex/Teaad',
      children:[
          {
            path: 'Teaad',
            name: '公告详情',
            component:Teaad,
          },
          {
            path: 'Teamodify',
            name: '密码修改',
            component:Teamodify,
          },
          {
            path: 'bzzy',
            name: '作业布置',
            component:bzzy,
          },
          {
            path: 'pgzy',
            name: '批改作业',
            component:pgzy,
          },
          {
            path: 'jxzl',
            name: '教学资料',
            component:jxzl,
          },
          {
            path: 'Teanotice',
            name: '公告信息',
            component:Teanotice,
          },
      ]
    },
    {
      path: '/studentIndex',
      name: '公告详情',
      component:studentIndex,
      redirect: '/studentIndex/Stuad',
      children:[
          {
            path: 'Stuad',
            name: '公告详情',
            component:Stuad,
          },
          {
            path: 'stumodify',
            name: '修改密码',
            component:stumodify,
          },
          {
            path: 'ckzy',
            name: '查看作业',
            component:ckzy,
          },
          {
            path: 'ckcj',
            name: '查看成绩',
            component:ckcj,
          },
          {
            path: 'stuJxzl',
            name: '教学资料',
            component:stuJxzl,
          },
          {
            path: 'Stunotice',
            name: '公告信息',
            component:Stunotice,
          },
      ]
    },
    {
      path:"*",
      redirect:"/student"
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.path !='/student' && to.path !='/admin'&& to.path !='/teacher'){
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(!user){
      warningAlert('请登录');
       router.push('/')
      return
    }
}
  next();
})
export default router
