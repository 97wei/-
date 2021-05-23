<template>
<div>
  <el-container>
  <el-header>
    <img src="../../../assets/images/tubiao.jpg" alt="">
    <h1>网上作业批改处理系统</h1>
<el-row class='exit'>
  <i  class='el-icon-setting' @click="layout"></i>
</el-row>
     <h2>{{admin.ncname}}</h2>
  </el-header>
  <el-container>
    <el-aside width=200px style=" border-right: 1px solid skyblue;">
        <el-col :span='24'>
    <el-menu
      :default-active="show"
      class="el-menu-vertical-demo"
      text-color="black"
      active-text-color="#ffd04b" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adminIndex/modify">个人信息修改</el-menu-item>
          <el-menu-item index="/adminIndex/adminInfo">管理员信息管理</el-menu-item>
          <el-menu-item index="/adminIndex/classInfo">班级信息管理</el-menu-item>
          <el-menu-item index="/adminIndex/courseInfo">课程信息管理</el-menu-item>
          <el-menu-item index="/adminIndex/teaInfo">教师信息管理</el-menu-item>
          <el-menu-item index="/adminIndex/stuInfo">学生信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index='/adminIndex/notice'>
        <i class="el-icon-setting"></i>
        <span slot="title" index='/adminIndex/notice'>公告管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
    </el-aside>

    <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/adminIndex/ad' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item >{{this.$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
          <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import{mapGetters} from  'vuex'
export default {
    data(){
      return{
          show:'',
      }
    },
   components:{
   }, 
   computed: {
     ...mapGetters({
              "admin":"user"
     })
   },
   methods: {
      layout(){
         sessionStorage.removeItem('user')
         this.$router.push('/')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      defaultActive(){
        var str =this.$route.path
        var str1 = str.slice(str.lastIndexOf('/')+1)
        this.show=str1
      }
},
   mounted(){
       this.defaultActive()
}

}
</script>

<style scoped>
 .el-header {
  border-bottom: 1px solid skyblue;
  background-color: rgba(241, 243, 244, 0.8);
    color: skyblue;
    text-align: center;
    height: 10vh;
    line-height: 9vh; 
  }
.el-header img{
  width: 40px;
  height: 40px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
}
  .el-aside {
background-color: white;
  }
.el-menu {
    border-right:0;
}
  .el-main {
  background-color: white;
  }
  .el-submenu,
  .el-menu-item{
    min-width: 199px;

  }
  .exit,h2{
    float: right;
    margin-left: 10px;
  }
  .exit{
    cursor: pointer;
  }
  h1{
    font-size: 20px;
    float: left;
    font-weight: bold;
    letter-spacing: 4px;
    margin-left: 20px;
  }
.el-col>li{
 margin-left: 20px!important;
}
header{
    width:100%;
    height: 200px;
    color: white;
    text-align: center;
    line-height:200px;
    text-shadow:5px 5px 5px black,0px 0px 2px black;
}
header p{
  letter-spacing: 30px;
}
</style>
