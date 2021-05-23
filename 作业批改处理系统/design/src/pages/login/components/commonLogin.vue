<template>
  <div class="container">
  <header>
            <p>作业批改处理系统</p>
         </header>
         <article>
           <div class="article-img">
               <img src="../../../assets/images/index-tu.jpg" alt="">
           </div>
          <ul class="login-list-option">
            <li v-for='(item,index) in list' :key=index @click='change(index)' :class="{active:index===num}"><span :class='item.icon'></span><p>{{item.text}}</p></li>
          </ul>
          <router-view></router-view>
           </article>
         <div class="login-register-bottom">
            <p>Copyright © 2010-2016 作业批改系统 版权所有 保留一切权利
            </p>
            <p>
                京ICP备10218183号 京ICP证161188号 京公网安备 11010802020593号 出版物经营许可证新出发京批字第直130052号
            </p>
        </div>
  </div>
</template>

<script>

export default {
     data(){
        return{
          num:0,
          list:[
            {
            path:'student',
            icon:"iconfont icon-xuesheng",
            text:'学生登录'
          },
            {
            path:'teacher',
            icon:"iconfont icon-laoshi",
            text:'教师登录'
          },
            {
            path:'admin',
            icon:"iconfont icon-guanliyuan",
            text:'管理员登录'
          }
          ]

        }
     },
     methods:{
       change(index){
          this.num=index;
          this.$router.push({path:'/'+this.list[index].path})
        console.log(this.list[index].path);
       }
     }
}
</script>

<style scoped>
header{
    width:100%;
    height: 200px;
    font-size:40px;
    text-shadow:5px 5px 5px black,0px 0px 2px black;
    color: white;
    text-align: center;
    line-height:200px
}
header p{
  letter-spacing: 30px;
}
</style>
