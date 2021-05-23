import axios from 'axios'
import qs from 'qs'
import {errorAlert} from './alert'
import store from '../store/index'
import { Dropdown } from 'element-ui';
//设置基础路径
const baseUrl = "/api";

// 在请求拦截中设置请求头
axios.interceptors.request.use(config=>{
  console.group('本次请求路径为:'+config.url)
  if(config.url !== baseUrl+'/api/adminlogin'){
    // 需要设置请求头
    // config.headers.authorization = store.state.user.token
  }
  console.log(config);
  return config
})


// 设置一个响应拦截
axios.interceptors.response.use(res=>{
  console.group('本次响应路径为:'+res.config.url)
  if(res.data.code !== 200){
    errorAlert(res.data.msg);
    return;
  }
  console.log(res);
  return res;
})
// 管理员相关操作开始--------------------------------------------------------

//管理员登录
export const adminLogin = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/adminlogin',
    data:qs.stringify(data)
  })
}

//管理员修改密码
export const adminXGmm = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/adminxgmm',
    data:qs.stringify(data)
  })
}
//添加管理员
export const adduser =(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/adminUseradd',
    data:qs.stringify(data)
  })
}

//获取管理员列表
export const userList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/userlist',
    params,
  })
}

//获取一条管理员信息
export const oneInfo =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/userinfo',
    params
  })
}

//更新管理员信息
export const updateAdmin = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/useredit',
    data:qs.stringify(data)
  })
}
//管理员删除
export const adminDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/userdelete',
    data:qs.stringify(data)
  })
}
// 管理员相关操作结束--------------------------------------------------------




// 管理员相关操作班级信息管理--------------------------------------------------------


//获取班级总数
export const classCount = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/classcount',
    params,
  })
}

//添加班级
export const classInfoAdd =(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/classinfoadd',
    data:qs.stringify(data)
  })
}

//获取班级列表
export const classList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/classlist',
    params,
  })
}
//获取所有班级列表
export const classListAll = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/classlistall',
    params,
  })
}
//获取一条班级信息
export const getOneClass =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/getoneclass',
    params
  })
}

//更新班级信息
export const updateClass = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/updateclass',
    data:qs.stringify(data)
  })
}
//班级删除
export const classDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/classdelete',
    data:qs.stringify(data)
  })
}

// 管理员相关操作课程信息管理结束--------------------------------------------------------



// 管理员相关操作课程信息管理开始--------------------------------------------------------


//获取课程总数
export const courseCount = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/coursecount',
    params,
  })
}

//添加课程
export const courseInfoAdd =(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/courseinfoadd',
    data:qs.stringify(data)
  })
}

//获取当前页面课程列表
export const courseList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/courselist',
    params,
  })
}
//获取所有课程列表
export const courseListAll = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/courselistall',
    params,
  })
}
//获取一条课程信息
export const getOneCourse =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/getonecourse',
    params
  })
}

//更新课程信息
export const updatecourse = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/updatecourse',
    data:qs.stringify(data)
  })
}
//课程删除
export const courseDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/coursedelete',
    data:qs.stringify(data)
  })
}

// 管理员相关操作课程信息管理结束--------------------------------------------------------

// 管理员之教师信息相关操作开始--------------------------------------------------------
//添加教师
export const teacherAdd =(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/teacheradd',
    data:qs.stringify(data)
  })
}

//获取教师列表
export const teacherList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/teacherlist',
    params,
  })
}

//获取一条教师信息
export const oneteacherInfo =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/oneteacherInfo',
    params
  })
}

//更新教师信息
export const updateTeacher = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/updateteacher',
    data:qs.stringify(data)
  })
}
//删除教师
export const teacherDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/teacherdelete',
    data:qs.stringify(data)
  })
}


// 管理员之教师信息相关操作结束--------------------------------------------------------


// 管理员之学生信息相关操作开始--------------------------------------------------------
//添加学生
export const studentAdd =(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/studentadd',
    data:qs.stringify(data)
  })
}
//获取学生总数
export const  studentsCount =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/studentcount',
   params
  })
}

//获取学生列表
export const studentList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/studentlist',
    params,
  })
}

//获取一条学生信息
export const onestudentInfo =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/onestudentInfo',
    params
  })
}

//更新学生信息
export const updateStudent = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/updatestudent',
    data:qs.stringify(data)
  })
}
//删除学生
export const studentrDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/studentdelete',
    data:qs.stringify(data)
  })
}

// 管理员之学生信息相关操作结束--------------------------------------------------------



// 管理员之公告信息相关操作开始--------------------------------------------------------
// 添加公告
export const addNotice = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/noticeadd',
    data:qs.stringify(data)
  })
}

// 公告列表
export const getNotice = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/noticelist',
    params,
  })
}


// 获取一条公告信息
export const onenotice = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/onenotice',
    params,
  })
}


// 修改公告
export const updateNotice = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/noticeedit',
    data:qs.stringify(data)
  })
}


// 删除公告
export const delNotice = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/noticedelete',
    data:qs.stringify(data)
  })
}


// 管理员之公告信息相关操作结束--------------------------------------------------------

// ------------------------------------管理员全部操作结束—-------------------------------------------------


//--------------------------------------教师相关操作开始------------------------------------------------------


// 教师之登录操作及布置作业--------------------------------------------------------
//教师登录
export const teacherLogin = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/teacherlogin',
    data:qs.stringify(data)
  })
}
//教师修改密码
export const teacherXgmm = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/teacherxgmm',
    data:qs.stringify(data)
  })
}
// 布置作业
export const workAdd = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    method:'post',
    url:baseUrl+'/api/workadd',
    data:form
  })
}

//获取作业列表
export const workList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/worklist',
    params,
  })
}

// 获取一条作业信息
export const workInfo = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/workinfo',
    params,
  })
}

// 删除作业信息
export const delWork = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/delWork',
    data:qs.stringify(data)
  })
}
 // 教师之登录操作及布置作业结束--------------------------------------------------------


  // 教师之登录操作及批改作业开始--------------------------------------------------------

//搜索作业
export const pgzySearch = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/pgzysearch',
    data:qs.stringify(data)
  })
}

//获取已交作业列表
export const pgzyList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/pgzylist',
    params,
  })
}
//获取已交作业总数
export const  pgzyListCount =(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/pgzylistcount',
   params
  })
}
// 获取一条作业信息
export const pgzyOne = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/pgzyone',
    params,
  })
}
///删除已交作业
export const delcheck = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/delcheck',
    data:qs.stringify(data)
  })
}
//添加批阅结果
export const checkResult = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }

  return axios({
    method:'post',
    url:baseUrl+'/api/checkresult',
    data:form
  })
}
  // 教师之登录操作及批改作业结束--------------------------------------------------------


//学生登录操作-------------------------------------------------------------------------------------
//学生登录
export const studentLogin = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/studentlogin',
    data:qs.stringify(data)
  })
}
//学生修改密码
export const studentXgmm = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/studentxgmm',
    data:qs.stringify(data)
  })
}
//查看作业列表
export const ckzyList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/ckzylist',
    params,
  })
}
//提交作业
export const tjzyAdd = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    method:'post',
    url:baseUrl+'/api/tjzyadd',
    data:form
  })
}

//更新是否交作业状态
export const updateStatus = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/updatestatus',
    params,
  })
}

//查看成绩
export const gradeList = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/gradelist',
    params,
  })
}
//查看某一个批改作业
export const gradeOne = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/gradeone',
    params,
  })
}
