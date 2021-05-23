<template>
                    <form action="http://127.0.0.1:3000/student" method="get">
                      <div class="username">
                          <input type="username" placeholder="请输入账号" v-model="user.username" >
                          <span class="iconfont icon-xinfeng xinfeng "></span>
                      </div>
                      <div class="password">
                          <input type="password" placeholder="请输入密码" v-model="user.password">
                          <span class="iconfont icon-suo xinfeng "></span>
                      </div>
                  </form>
</template>

<script>
export default {
    data () {
        return {
            user:{
                username:'',
                password:'',
            }
        }
    }
}
</script>

<style>

</style>
